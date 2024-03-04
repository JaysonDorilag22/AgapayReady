import express from 'express';
import multer from 'multer';
import { createContacts, deleteContactById, getAllContacts, getContactById, getContactsByCategory, updateContactById } from '../../controllers/contacts/contacts.controller.js';
import { isAdmin } from '../../middleware/isAdmin.js';
import { verifyToken } from '../../middleware/verify.js';



const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/contacts', upload.single('image'), verifyToken, isAdmin, createContacts);
router.get('/contacts', getAllContacts);
router.get('/contacts/:id', getContactById);
router.get('/category/contacts/:categoryId', getContactsByCategory);
router.put('/contacts/:id', upload.single('image'), verifyToken, isAdmin, updateContactById);
router.delete('/contacts/:id', verifyToken, isAdmin, deleteContactById);

export default router;
