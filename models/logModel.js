import mongoose from 'mongoose'
const Schema = mongoose.Schema
const logItemModel = new Schema({
  content: { type: 'mixed' }
})
const logModel = new Schema({
  logItems: { type: [logItemModel] }
})
export default mongoose.model('logs', logModel)