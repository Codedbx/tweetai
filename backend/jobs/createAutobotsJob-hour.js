import cron from 'node-cron';
import axios from 'axios';
import Autobot from '../models/Autobot.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

export const createAutobotsJob = () => {
  cron.schedule('*/10 * * * *', async () => {
    try {
      for (let i = 0; i < 500; i++) {
        const { data: user } = await axios.get('https://jsonplaceholder.typicode.com/users/1');
        const autobot = await Autobot.create({
          name: user.name,
          username: user.username,
          email: user.email,
        });

        for (let j = 0; j < 10; j++) {
          const { data: post } = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
          const createdPost = await Post.create({
            title: `${post.title}-${autobot.id}-${j}`,
            body: post.body,
            autobotId: autobot.id,
          });

          for (let k = 0; k < 10; k++) {
            const { data: comment } = await axios.get('https://jsonplaceholder.typicode.com/comments/1');
            await Comment.create({
              name: comment.name,
              email: comment.email,
              body: comment.body,
              postId: createdPost.id,
            });
          }
        }
      }
      console.log('500 Autobots and associated content created!');
    } catch (err) {
      console.error('Error creating Autobots:', err.message);
    }
  });
};
