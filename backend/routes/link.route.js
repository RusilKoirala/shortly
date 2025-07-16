import express from 'express';
import { createLink, deleteLink , getInfoAboutLink } from '../controllers/link.controller.js';
import { authenticateUser } from '../middlewares/auth.js';

const router = express.Router();

router.get('/info/:id', authenticateUser, getInfoAboutLink);
router.post('/links', authenticateUser, createLink);
router.delete('/links/:id', authenticateUser, deleteLink);

export default router;
