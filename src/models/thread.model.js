import { models, model, Schema } from "mongoose";

const ThreadSchema = new Schema({
  uploadedBy: {
    type: Schema.Types.ObjectId,
    required: [true, "Please mention the _id of user."],
    ref: "User"
  },
  plainText: {
    type: String,
    trim: true,
    maxlength: [5000, "Text cannot exceed 5000 characters"]
  },
  html: {
    type: String,
    trim: true
  },
  file: {
    type: Schema.Types.ObjectId,
    ref: "ThreadContent"
  }
});


const ThreadContentSchema = new Schema({
  data: {
    type: String,
    required: [true, "Provide the file Base64 data"]
  },
  contentType: {
    type: String,
    required: [true, "ContentType is required."],
    enum: ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'] 
  },
  fileName: {
    type: String,
    required: [true, "FileName is required."],
    trim: true
  }
}, { timestamps: true });

const Thread = models.Thread || model("Thread", ThreadSchema);
const ThreadContent = models.ThreadContent || model("ThreadContent", ThreadContentSchema);

export { Thread, ThreadContent };
