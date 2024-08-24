import Post from '../models/Post.js';

export const getPostsByAutobotId = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { autobotId: req.params.autobotId },
      limit: 10,
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
};
