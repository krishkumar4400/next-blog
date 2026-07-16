import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment varible");
}


async function connectToDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to mongo db");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectToDB;