import mongoose from "mongoose";

const { Schema } = mongoose;

const websiteSchema = new Schema(
  {
    name: {
      type: String,
    },
    domain: {
      type: String,
    },
    province: {
      type: String,
    },
    stars: {
      type: Number,
    },
    expirationDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Website", websiteSchema);
