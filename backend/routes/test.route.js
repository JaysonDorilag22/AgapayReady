import express from 'express';
import { test } from '../controllers/test.controller.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 


router.get('/test', upload.array('imageUrl'), test);



export default router;
