import  jwt  from 'jsonwebtoken';

const isUser = (req, res, next) => {
	try {
		let token = req?.headers?.authorization?.split(" ")[1];
		const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
		if (token) {
			req["user"] = data
			next();
		} else {
			return res.json({ error: true, message: "Unauthorized access" });
		}
	} catch (err) {
		return res.json({ error: true, message: "ok" })
	}
}

export default isUser