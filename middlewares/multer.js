const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const uploadPath = path.join(__dirname, '../storage/');
      await fs.mkdir(uploadPath, { recursive: true }); // Crea la carpeta si no existe
      cb(null, uploadPath);
    } catch (error) {
      cb(error, null);
    }
  },
  filename: async (req, file, cb) => {
    try {
      const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    } catch (error) {
      cb(error, null);
    }
  }
});

const upload = multer({ storage });

module.exports = upload;
