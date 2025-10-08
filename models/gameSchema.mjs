//Imports
import mongoose from "mongoose";
//create Schema
const gameSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      validate: {
        validator: async function (userId) {
          const user = await mongoose.models.User.findById({ _id: userId });
          return !!user; // if user exists continue, else throw error
        },
        message: (props) =>
          `This user with ${props.path}:${props.value} does not exist`,
      },
      index: true, //Simple single key index
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      validate: {
        validator: async function (categoryId) {
          const category = await mongoose.models.Category.findById({
            _id: categoryId,
          });
          return !!category; //will change it from falsey value to pure boolean type
        },
        message: (props) =>
          `This category with ${props.path}:${props.value} does not exist`,
      },
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

gameSchema.index({ category: 1, score: -1 }); // Componound

export default mongoose.model("Game", gameSchema);
