import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/categorySchema.mjs";
import Question from "../models/questionSchema.mjs";

import categories from "./categoriesData.mjs";
import questions from "./questionData.mjs";

dotenv.config();

const connectionStr = process.env.mongoURI || "";

async function seedDatabase() {
  console.log(`✅ Seeding Script Run`);
  try {
    await mongoose.connect(connectionStr);
    console.log(`✅ Connected to DB...`);

    await Category.deleteMany();
    console.log(`✅ Cleared DB of prev categories`);

    await Category.create(categories);
    console.log(`✅ Seeded DB with new categories`);

    let cats = await Category.find({});
    console.log(`✅ Retrieved New CAtegory Id's from the DB`);

    for (let q of questions) {
      for (let c of cats) {
        if (q.categoryId == c.name) {
          q.categoryId = c._id;
          break;
        }
      }
    }
    console.log(`✅ Mapped new questions with new categoryID`)

    await Question.deleteMany();
    console.log(`✅ Cleared DB of prev questions`);

    await Question.create(questions);
    console.log(`✅ Seeded DB with questions`);

    console.log(`🎉 Seed Complete`);
    process.exit(1);
  } catch (err) {
    console.error(`❌ Error seeding DB`, err);
    process.exit(1);
  }
}

seedDatabase();
