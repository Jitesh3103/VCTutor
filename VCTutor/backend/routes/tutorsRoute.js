import express from "express";
import {
  loginTutor,
  tutorList,
  changeAvailability,
  registerTutor,
  sessionsTutor,
  tutorDashboard,
  tutorProfile,
  updateTutorProfile,
  completeSession,
  cancelSession
} from "../controllers/tutorController.js";
import authTutor from "../middlewares/authTutor.js";

const tutorRouter = express.Router();

tutorRouter.get("/list", tutorList);
tutorRouter.post("/login", loginTutor);
tutorRouter.post("/register", registerTutor);

tutorRouter.get("/sessions", authTutor, sessionsTutor);
tutorRouter.get("/dashboard", authTutor, tutorDashboard);
tutorRouter.post("/complete-session", authTutor, completeSession);
tutorRouter.post("/cancel-session", authTutor, cancelSession);
tutorRouter.get("/profile", authTutor, tutorProfile);
tutorRouter.post("/update-profile", authTutor, updateTutorProfile);
tutorRouter.post("/change-availability", authTutor, changeAvailability);

export default tutorRouter;
