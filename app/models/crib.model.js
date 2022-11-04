import mongoose from "mongoose";

const cribSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    img: { type: String },
    location: { type: String, trim: true },
    is_active: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

const Crib = mongoose.model("crib", cribSchema);

export default Crib;