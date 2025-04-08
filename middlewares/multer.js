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
  filename: (req, file, cb) => {
    const newFileName = `${Date.now()}${path.extname(file.originalname)}`;
    
    // Sobrescribe el campo 'img' del formData con el nuevo nombre
    if (!req.body) req.body = {};
    req.body.img = newFileName;

    cb(null, newFileName);
  }
});

const upload = multer({ storage });

module.exports = upload;
