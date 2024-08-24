import cron from 'node-cron';
import axios from 'axios';
import Autobot from '../models/Autobot.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import crypto from 'crypto';

const generateUniqueString = (length) => crypto.randomBytes(length).toString('hex');

const fetchData = async (endpoint, count) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/${endpoint}`);
  return Array(count).fill().map(() => response.data[Math.floor(Math.random() * response.data.length)]);
};

export const createAutobotsJob = () => {
  cron.schedule('0 * * * *', async () => {
    try {
      const [users, posts, comments] = await Promise.all([
        fetchData('users', 10),
        fetchData('posts', 10),
        fetchData('comments', 10)
      ]);

      const autobotsData = [];
      const postsData = [];
      const commentsData = [];

      for (let i = 0; i < 500; i++) {
        const uniqueSuffix = generateUniqueString(6);
        const user = users[i % 10];
        autobotsData.push({
          name: `${user.name}-${uniqueSuffix}`,
          username: `${user.username}-${uniqueSuffix}`,
          email: `${uniqueSuffix}.${user.email}`,
        });

        for (let j = 0; j < 10; j++) {
          const postUniqueSuffix = generateUniqueString(6);
          const post = posts[j % 10];
          const postId = (i * 10) + j + 1;
          postsData.push({
            title: `${post.title}-${uniqueSuffix}-${postUniqueSuffix}`,
            body: post.body,
            autobotId: i + 1,
          });

          commentsData.push(...Array(10).fill().map(() => {
            const commentUniqueSuffix = generateUniqueString(6);
            const comment = comments[Math.floor(Math.random() * 10)];
            return {
              name: `${comment.name}-${commentUniqueSuffix}`,
              body: comment.body,
              postId,
            };
          }));
        }
      }

      await Promise.all([
        Autobot.bulkCreate(autobotsData),
        Post.bulkCreate(postsData),
        Comment.bulkCreate(commentsData)
      ]);

      console.log('500 Autobots and associated content created!');
    } catch (err) {
      console.error('Error creating Autobots:', err.message);
    }
  });
};
