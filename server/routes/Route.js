import express from "express";
import { loginuser, logout, signupUser } from "../controllers/userController.js";
import { createPost, deleteMyblog, myBlog, readPost, readid, updatePost } from "../controllers/postController.js";
import isUser from "../middleware/manageToken.js";
// import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router()



router.post("/register", signupUser)
router.post("/login", loginuser)
router.get("/logout", logout)



//post
router.post("/createpost", isUser, createPost)
router.patch("/createpost", isUser, updatePost)
router.get("/readpost", isUser, readPost)
router.get("/readpost/:id", readid)
router.get("/myBlog", isUser, myBlog)
router.delete("/myBlog/:id", isUser, deleteMyblog)


export default router;