import path from "path";
import express, { Request, Response } from "express";
import upload from "../utils/fileUpload";
import { saveImagePathInDb } from "../utils/fileUpload";
import { verifyToken } from "../utils/tokenHelpers";
import { checkIfUserExist } from "../utils/userHelpers";
import { checkIfPropertyExists } from "../utils/propertyHelpers";

const imageRoutes = express.Router();
const imagesFolder = path.join(__dirname, "../../images");

/**
 * Route to fetch a single image
 **/
imageRoutes.get("/:filename", async (req, res) => {
  const filename = req.params.filename;

  const imagePath = path.join(imagesFolder, filename);

  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send("Image not found");
    }
  });
});

// TODO Make it more secure
imageRoutes.post(
  "/pictures",
  upload.array("pictures", 5),
  verifyToken,
  async (req: Request, res: Response) => {
    const files = req.files;
    const propertyId = req.body.property_id;
    const publicAddress = req.body.publicAddress;

    const user = await checkIfUserExist(publicAddress);

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User does not exist",
      });
    }

    const property = await checkIfPropertyExists(propertyId);

    if (!property) {
      return res.status(400).send({
        success: false,
        message: "Property does not exist",
      });
    }

    if (!files) {
      res.status(400).send({
        success: false,
        message: "No files uploaded.",
      });
      return;
    }

    const saveFileInDb = await saveImagePathInDb(
      propertyId,
      files as Express.Multer.File[]
    );

    if (!saveFileInDb.success) {
      return res.status(400).send({
        success: false,
        message: "Error saving file in database",
      });
    }

    return res.status(200).send({
      success: true,
      message: "File uploaded successfully",
    });
  }
);

export default imageRoutes;
