import express from 'express';
import { Server } from 'socket.io';
import { handleTestEvent, sendMessage, test } from '../controllers/test.controller.js';

const router = express.Router();
const io = new Server(); // Instantiate Socket.IO server

router.get('/test', test);
router.get('/socket', handleTestEvent(io)); // Pass the io object to the controller
router.post('/send', sendMessage(io)); // Pass the io object to the controller


export default router;
