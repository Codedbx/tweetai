import Comment from '../models/Comment.js';

export const getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { postId: req.params.postId },
      limit: 10,
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
};
