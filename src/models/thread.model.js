import { models, model, Schema } from "mongoose";

const ThreadSchema = new Schema({
  uploadedBy: {
    type: Schema.Types.ObjectId,
    required: [true, "Please mention the _id of user."],
    ref: "User"
  },
  plainText: {
    type: String
  },
  html: {
    type: String
  },
  file:{
    type: Schema.Types.ObjectId,
    ref: "Thread"
  }
});

const ThreadContentSchema = new Schema({
  data: {
    type: String,
    required: [true, "Provide the file Base64 data"]
  },
  contentType: {
    type: String,
    required: [true, "ContentType is required."]
  },
  fileName: {
    type: String,
    required: [true, "FileName is required."]
  }
});

const Thread = models.Thread || model("Thread", ThreadSchema);
const ThreadContent = models.ThreadContent || model("ThreadContent", ThreadContentSchema);

export { Thread, ThreadContent };
