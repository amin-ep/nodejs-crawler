import app from "./app";
import { config } from "dotenv";
import mongoose from "mongoose";

config({ path: ".env" });
const port = process.env.PORT;
const DB = process.env.DB_URL;

mongoose.connect(DB).then(() => console.log('connected successfully')).catch(err => console.log(err))

app.listen(port, () => {
  console.log(`App is running on port:${port}`);
});
