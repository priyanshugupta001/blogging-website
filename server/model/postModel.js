import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
	title: String,
	summary: String,
	content: String,
	image: String,
	userId:{
		type: mongoose.SchemaTypes.ObjectId,
		ref: "User"
	},
},{
	timestamps:true,
}
)



export const PostModel = mongoose.model('Post', postSchema)