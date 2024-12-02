import mongoose from "mongoose";

const KeeperSchema = mongoose.Schema({
    title: String,
    description: String
});

export const Keeper = new mongoose.model("Keeper", KeeperSchema)

