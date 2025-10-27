import { Schema, models, model } from "mongoose";

const CommentSchema = new Schema(
  {
    threadId: {
      type: Schema.Types.ObjectId,
      ref: "Thread",
      required: [true, "Thread reference is required."]
    },
    commentedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required."]
    },
    commentText: {
      type: String,
      required: [true, "Comment text is required."]
    },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null, // for replies (nested comments)
    },
    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: "ThreadContent" // if a comment can have attachments too
      }
    ],
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

const Comment =
  models.Comment || model("Comment", CommentSchema);

export { Comment };
