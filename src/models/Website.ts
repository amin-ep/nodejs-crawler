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
    stars: {
      type: Number,
      min: 1,
      max: 5,
    },
    expirationDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Website", websiteSchema);
