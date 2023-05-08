import express from "express";
import path from "path";
import upload from "../utils/fileUpload";
import { verifyToken } from "../utils/tokenHelpers";

const imagesFolder = path.join(__dirname, "../../images");
const imageRoutes = express.Router();

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

/**
 * Route to post an avatar
 * TODO add saving to database
 **/
imageRoutes.post(
  "/avatar",
  verifyToken,
  upload.single("avatar"),
  async (req, res) => {
    const file = req.file;
    const userId = req.body.id;
    if (!file) {
      res.status(400).send({
        success: false,
        message: "No file uploaded",
      });
      return;
    }

    return res.status(200).send({
      success: true,
      message: "File uploaded successfully",
      filename: file.filename,
    });
  }
);

imageRoutes.post(
  "/pictures",
  verifyToken,
  upload.array("pictures", 5),
  async (req, res) => {
    const files = req.files;

    if (!files) {
      res.status(400).send({
        success: false,
        message: "No files uploaded.",
      });
      return;
    }

    console.log(files);

    return res.status(200).send({
      success: true,
      message: "File uploaded successfully",
    });
  }
);

export default imageRoutes;
