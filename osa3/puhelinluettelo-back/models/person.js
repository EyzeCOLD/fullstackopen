import mongoose from "mongoose";

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

try {
  await mongoose.connect(url, { family: 4 });
  console.log("Connected to MongoDB!");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

personSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

export { Person };
