import express from 'express';
import multer from 'multer';
import { createContacts, deleteContactById, getAllContacts, getContactById, updateContactById } from '../../controllers/contacts/contacts.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';
import { isAdmin } from '../../middleware/isAdmin.js';


const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/contacts', upload.single('image'), createContacts);
router.get('/contacts', getAllContacts);
router.get('/contacts/:id', getContactById);
router.put('/contacts/:id', upload.single('image'), updateContactById);
router.delete('/contacts/:id', deleteContactById);

export default router;
