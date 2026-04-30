import express from "express";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

// ✅ FIX: correct controller file + correct imports
import { addTutor, loginAdmin, sessionCancel, adminDashboard, allTutors, sessionAdmin } from "../controllers/adminController.js";
import { changeAvailability } from "../controllers/tutorController.js";

const adminRouter = express.Router();

adminRouter.post('/add-tutor', authAdmin, upload.single('image'), addTutor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-tutors', authAdmin, allTutors);
adminRouter.post('/change-availability', authAdmin, changeAvailability);

adminRouter.get('/sessions', authAdmin, sessionAdmin);
adminRouter.post('/cancel-session', authAdmin, sessionCancel);
adminRouter.get('/cancel-sessions', authAdmin, sessionCancel);
adminRouter.get('/dashboard', authAdmin, adminDashboard);

export default adminRouter; 
