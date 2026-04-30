
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import tutorModel from "../models/tutorModel.js";
import sessionModel from "../models/sessionModel.js";


// =========================
// REGISTER TUTOR
// =========================
const registerTutor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      subject,
      experience,
      fees,
      address
    } = req.body;

    // validations
    if (
      !name ||
      !email ||
      !password ||
      !subject ||
      !experience ||
      !fees ||
      !address
    ) {
      return res.json({
        success: false,
        message: "Missing Details"
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Enter valid email"
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters"
      });
    }

    // check tutor exists
    const tutorExists = await tutorModel.findOne({ email });

    if (tutorExists) {
      return res.json({
        success: false,
        message: "Tutor already exists"
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const tutorData = {
      name,
      email,
      password: hashedPassword,
      subject,
      experience,
      fees,
      address,
      available: true,
      date: Date.now()
    };

    const newTutor = new tutorModel(tutorData);
    await newTutor.save();

    res.json({
      success: true,
      message: "Tutor Added Successfully"
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};


// =========================
// TUTOR LOGIN
// =========================
const loginTutor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const tutor = await tutorModel.findOne({ email });

    if (!tutor) {
      return res.json({
        success: false,
        message: "Invalid Credentials"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      tutor.password
    );

    if (isMatch) {
      const token = jwt.sign(
        { id: tutor._id },
        process.env.JWT_SECRET
      );

      res.json({
        success: true,
        token
      });
    }
    else {
      res.json({
        success: false,
        message: "Invalid Credentials"
      });
    }

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};


// =========================
// ALL TUTORS LIST
// =========================
const tutorList = async (req, res) => {
  try {
    const tutors = await tutorModel
      .find({})
      .select('-password');

    res.json({
      success: true,
      tutors
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};


// =========================
// CHANGE AVAILABILITY
// =========================
const changeAvailability = async (req, res) => {
  try {
    const { tutorId } = req.body;

    const tutorData = await tutorModel.findById(
      tutorId
    );

    await tutorModel.findByIdAndUpdate(
      tutorId,
      {
        available: !tutorData.available
      }
    );

    res.json({
      success: true,
      message: "Availability Changed"
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};


// =========================
// GET TUTOR PROFILE
// =========================
const tutorProfile = async (req, res) => {
  try {
    const tutId = req.tutId;

    const profileData = await tutorModel
      .findById(tutId)
      .select('-password');

    res.json({
      success: true,
      profileData
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};


// =========================
// UPDATE TUTOR PROFILE
// =========================
const updateTutorProfile = async (req, res) => {
  try {
    const tutId = req.tutId;

    const { fees, address, available } = req.body;

    await tutorModel.findByIdAndUpdate(tutId,{
      fees,
      address,
      available
    });

    res.json({
      success:true,
      message:"Profile Updated"
    });

  } catch(error){
    console.log(error);
    res.json({
      success:false,
      message:error.message
    });
  }
};   // <-- don't miss this semicolon
const sessionsTutor = async (req,res) => {
  try{
    const tutId = req.tutId;
    const sessions = await sessionModel.find({ tutId });

    res.json({
      success:true,
      sessions
    });

  }catch(error){
    console.log(error);
    res.json({
      success:false,
      message:error.message
    });
  }
};

const tutorDashboard = async (req,res) => {
  try{
    const tutId = req.tutId;
    const sessions = await sessionModel.find({ tutId });
    const earnings = sessions.reduce((total, session) => {
      if (session.payment || session.isCompleted) {
        return total + Number(session.amount || 0);
      }
      return total;
    }, 0);
    const clients = new Set(sessions.map((session) => session.userId)).size;

    res.json({
      success:true,
      dashData:{
        earnings,
        clients,
        sessions: sessions.length,
        latestSessions: sessions.reverse().slice(0, 5)
      }
    });

  }catch(error){
    console.log(error);

    res.json({
      success:false,
      message:error.message
    });
  }
};

const completeSession = async (req, res) => {
  try {
    const tutId = req.tutId;
    const { sessionId } = req.body;
    const sessionData = await sessionModel.findById(sessionId);

    if (!sessionData || sessionData.tutId !== tutId) {
      return res.json({ success: false, message: "Session not found" });
    }

    await sessionModel.findByIdAndUpdate(sessionId, { isCompleted: true });
    res.json({ success: true, message: "Session Completed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const cancelSession = async (req, res) => {
  try {
    const tutId = req.tutId;
    const { sessionId } = req.body;
    const sessionData = await sessionModel.findById(sessionId);

    if (!sessionData || sessionData.tutId !== tutId) {
      return res.json({ success: false, message: "Session not found" });
    }

    await sessionModel.findByIdAndUpdate(sessionId, { cancelled: true });

    const { slotDate, slotTime } = sessionData;
    const tutorData = await tutorModel.findById(tutId);
    const slots_booked = tutorData.slots_booked || {};

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter((time) => time !== slotTime);
      await tutorModel.findByIdAndUpdate(tutId, { slots_booked });
    }

    res.json({ success: true, message: "Session Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerTutor,
  loginTutor,
  tutorList,
  changeAvailability,
  tutorProfile,
  updateTutorProfile,
  sessionsTutor,
  tutorDashboard,
  completeSession,
  cancelSession
};
