import multer from "multer"
import { PostModel } from "../model/postModel.js"


export const createPost = async (req, res) => {
	try {
		const { title, summary, content, image } = req.body
		const postDoc = await PostModel.create({ title, summary, content, image, userId: req.user.id })

		res.status(200).json({ success: true, message: "Post Submitted Successfully", postDoc })

	} catch (error) {
		console.log(error);
		return res.status(500).json(error)
	}
}

export const updatePost = async (req, res) => {
	try {
		const { title, summary, content, image, id } = req.body
		const updateDoc = await PostModel.findById(id)
		if (!updateDoc) {
			return res.status(404).json({ success: false, message: "Post not found" })
		}

		await updateDoc.updateOne({title,summary,content,image})
		res.status(200).json({ success: true, message: "Post Updated Successfully", updateDoc })

	} catch (error) {
		console.log(error);
		return res.status(500).json(error)
	}
}

export const readPost = async (req, res) => {
	const posts = await
		PostModel.find().sort({ createdAt: -1 }).limit(20).populate({ path: 'userId', select: 'username' })
	res.json(posts)
}

export const readid = async (req, res) => {
	try {
		const { id } = req.params
		const Post = await PostModel.findById(id).populate({ path: 'userId', select: 'username' })
		res.status(200).json(Post)


	} catch (error) {
		console.log(error);
		return res.status(500).json(error)
	}
}


export const myBlog = async (req, res) => {

	try {
		const myPost = await PostModel.find({ userId: req.user.id }).populate({ path: 'userId', select: 'username' })
		res.status(200).json(myPost)
	} catch (error) {
		console.log(error);
		return res.status(500).json(error)
	}

}

export const deleteMyblog = async (req, res) => {
	try {
		const { id } = req.params
		await PostModel.findByIdAndDelete(id)
		res.status(200).json({ success: true, message: "Post deleted Successfully" })
	} catch (error) {
		console.log(error);
		return res.status(500).json(error)
	}
}