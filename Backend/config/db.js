import mongoose from "mongoose";

const connectDB = async () => {
	const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_ATLAS_URI || process.env.MONGO_URI;

	if (!mongoUri) {
		throw new Error("Missing Mongo URI. Set MONGO_URI (or MONGODB_URI / MONGODB_ATLAS_URI) in environment variables");
	}

	await mongoose.connect(mongoUri, {
		// Keep startup failure fast and explicit if DB is unreachable.
		serverSelectionTimeoutMS: 10000,
	});

	console.log("MongoDB connected successfully");
};

export default connectDB;
