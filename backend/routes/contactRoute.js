import express from 'express';
import { postMail } from '../controllers/contactController.js';

const router = express.Router();

router.route("/").post(postMail);

export default router
