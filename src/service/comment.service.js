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
