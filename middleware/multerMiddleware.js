// import multer from 'multer';
// import path from 'path';

// // Define where to store uploaded files and how to name them
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Store files in the 'uploads' folder
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     // Generate a unique file name
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// // Create the multer instance with the storage configuration
// const upload = multer({ storage: storage });

// export default upload;


// middleware/multer.js
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(extname)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;