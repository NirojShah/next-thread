import { Comment } from "../models/comment.model.js";
import { Thread } from "../models/thread.model.js";

export const createComment = async ({ threadId, commentedBy, commentText, parentCommentId = null, attachments = [] }) => {
  const thread = await Thread.findById(threadId);
  if (!thread) throw new Error("Thread not found.");

  const newComment = await Comment.create({
    threadId,
    commentedBy,
    commentText,
    parentCommentId,
    attachments
  });

  return newComment;
};


export const getCommentsByThread = async ({ threadId }) => {
  const comments = await Comment.find({ threadId, parentCommentId: null })
    .populate("commentedBy", "name email")
    .populate("attachments")
    .sort({ createdAt: -1 });

  const withReplies = await Promise.all(
    comments.map(async (comment) => {
      const replies = await Comment.find({ parentCommentId: comment._id })
        .populate("commentedBy", "name email")
        .populate("attachments")
        .sort({ createdAt: 1 });
      return { ...comment.toObject(), replies };
    })
  );

  return withReplies;
};


export const replyToComment = async ({ parentCommentId, commentedBy, commentText, attachments = [] }) => {
  const parent = await Comment.findById(parentCommentId);
  if (!parent) throw new Error("Parent comment not found.");

  const reply = await Comment.create({
    threadId: parent.threadId,
    parentCommentId,
    commentedBy,
    commentText,
    attachments
  });

  return reply;
};


export const deleteComment = async ({ commentId, deleteReplies = true }) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("Comment not found.");

  await Comment.findByIdAndDelete(commentId);

  if (deleteReplies) {
    await Comment.deleteMany({ parentCommentId: commentId });
  }

  return { message: "Comment deleted successfully." };
};



export const updateComment = async ({ commentId, commentText }) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("Comment not found.");

  comment.commentText = commentText;
  await comment.save();

  return comment;
};
