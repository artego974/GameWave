import multer from "multer";
import path from "path";
import fs from "fs";

// Define pasta de destino
const uploadDir = path.resolve(__dirname, "upload");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Configuração do multer
export const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
        console.error("Tipo de arquivo não permitido");
        
        //configurar CALLBACK depois
        //cb(new Error("Tipo de arquivo não permitido"), false);
    }
  },
});
