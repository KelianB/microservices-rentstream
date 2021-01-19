import mongoose from "mongoose";

type DatabaseConfig = {
    host: string;
    port: string;
    database: string;
};

const DB_OPTIONS = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
};

export async function connectToDatabase({host, port, database}: DatabaseConfig): Promise<void> {
    const uri = `mongodb://${host}:${port}/${database}`;

    try {
        await mongoose.connect(uri, DB_OPTIONS);
        console.log("Connected to database");
    } catch (err) {
        console.error("Database connection failed: ", String(err));
    }
}
