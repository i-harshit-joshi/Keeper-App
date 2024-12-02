import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Keeper } from "./Models/keeperModel.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/keeperAppDB")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.get("/api/getAll", async (req, res) => {
  try {
    let response = await Keeper.find({});
    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});
app.post("/api/addNew", async (req, res) => {
  try {
    const { title, description } = req.body;
    const keeperObj = new Keeper({
      title: title,
      description: description,
    });
    let savedInput = await keeperObj.save();
    res.status(201).json(savedInput);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save the note" });
  }
});
app.post("/api/delete", async (req, res) => {
  const { id } = req.body;
  try {
    await Keeper.deleteOne({ _id: id });
    const response = await Keeper.find({});
    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete the keeper" });
  }
});
app.post("/api/update", async (req, res) => {
  const { id, updatedData } = req.body;

  try {
    await Keeper.updateOne({ _id: id }, { $set: updatedData });

    let updatedNotes = await Keeper.find({});
    res.status(200).json(updatedNotes);
  } catch (err) {
    res.status(500).json({ message: "Error updating note", error: err });
  }
});
app.listen(3001, () => {
  console.log("Ruuning on port 3001");
});
