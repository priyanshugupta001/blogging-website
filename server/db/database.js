import mongoose from "mongoose";

export const connectDb = () => {
	mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
    	useUnifiedTopology: true,
	}).then(() => {
		console.log("Database Connected");
	}).catch((e) => {
		console.log(e);
	})
}