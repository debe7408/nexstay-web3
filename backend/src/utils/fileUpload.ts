import multer from "multer";
import path from "path";
import queryDb from "../databaseConnection";

const upload = multer({
  storage: multer.diskStorage({
    destination: "images",
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = file.mimetype.split("/")[1];

      cb(null, file.fieldname + "-" + uniqueSuffix + `.${extension}`);
    },
  }),
  fileFilter: function (req, file, callback) {
    const extension = path.extname(file.originalname);
    if (
      extension !== ".png" &&
      extension !== ".jpg" &&
      extension !== ".gif" &&
      extension !== ".jpeg"
    ) {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
});

export const saveImagePathInDb = async (
  property_id: number,
  files: Express.Multer.File[]
) => {
  const sql =
    "INSERT INTO property_pictures (property_id, picture_path) VALUES (?, ?)";

  files.forEach(async (file) => {
    await queryDb(sql, [property_id, file.filename]).catch((err) => {
      return {
        success: false,
        message: "Failed to save image path in database",
      };
    });
  });

  return {
    success: true,
    message: "Successfully saved image path in database",
  };
};

export const saveAvatarPathInDb = async (
  user_id: number,
  file: Express.Multer.File
) => {
  const sql = "INSERT INTO user_avatars (user_id, avatar_path) VALUES (?, ?)";

  await queryDb(sql, [user_id, file.filename]).catch((err) => {
    console.log(err);
    return {
      success: false,
      message: "Failed to save image path in database",
    };
  });

  return {
    success: true,
    message: "Successfully saved image path in database",
  };
};

export default upload;
