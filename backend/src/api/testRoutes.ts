import express from "express";
import path from "path";

const testRoutes = express.Router();

// RETRIEVE AN IMAGE
const imagesFolder = path.join(__dirname, "../../images");

testRoutes.get("/images/:filename", async (req, res) => {
  const filename = req.params.filename;

  console.log(filename);
  const imagePath = path.join(imagesFolder, filename);

  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send("Image not found");
    }
  });
});

export default testRoutes;
