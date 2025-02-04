import mongoose from "mongoose"

const logsSchema = new mongoose.Schema({
  userId: Number,
  log: String
})

export const Log = mongoose.model('Logs', logsSchema)