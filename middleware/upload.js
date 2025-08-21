import multer from 'multer';
import path from 'path';

// Set storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // upload folder
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Optional: file filter for .glb or images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.glb', '.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .glb, .jpg, .jpeg, .png files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });
export default upload;
