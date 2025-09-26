import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
      unique: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
      },
    ],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    // difficulty: {
    //   type: String,
    //   enum: ["easy", "medium", "hard"],
    // },
    // points: {
    //   type: Number,
    //   default: 1,
    // },
    // genre: {
    //   type: String,
    //   enum: ["Fantasy", "Sci-Fi", "Comics", "Horror", "Video Games"],
    // },
  },
  { timestamps: true }
);
// questionSchema.index({ genre: 1 });

export default mongoose.model("Question", questionSchema);
