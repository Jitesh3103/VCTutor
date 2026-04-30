import express from "express"
import upload from "../middlewares/multer.js"
import authUser from "../middlewares/authUser.js"

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookSession,
  listSessions,
  cancelSession,
  paymentStripe,
  verifyStripe   // ✅ FIXED (capital S)
} from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.get('/get-profile', authUser, getProfile)

userRouter.post(
  '/update-profile',
  upload.single('image'),
  authUser,
  updateProfile
)

userRouter.post('/book-session', authUser, bookSession)

userRouter.get('/sessions', authUser, listSessions)

userRouter.post('/cancel-session', authUser, cancelSession)

userRouter.post('/payment-stripe', authUser, paymentStripe)

userRouter.get('/verify-stripe', authUser, verifyStripe)

export default userRouter