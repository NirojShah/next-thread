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
