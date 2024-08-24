import cron from 'node-cron';
import axios from 'axios';
import Autobot from '../models/Autobot.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import crypto from 'crypto';

const generateUniqueString = (length) => {
  return crypto.randomBytes(length).toString('hex');
};

export const createAutobotsJob = () => {
  cron.schedule('*/1 * * * *', async () => {
    try {
      const usersPromises = Array.from({ length: 10 }, (_, i) =>
        axios.get(`https://jsonplaceholder.typicode.com/users/${i + 1}`)
      );

      const postsPromises = Array.from({ length: 10 }, (_, j) =>
        axios.get(`https://jsonplaceholder.typicode.com/posts/${j + 1}`)
      );

      const commentsPromises = Array.from({ length: 10 }, (_, k) =>
        axios.get(`https://jsonplaceholder.typicode.com/comments/${k + 1}`)
      );

      const [users, posts, comments] = await Promise.all([
        Promise.all(usersPromises),
        Promise.all(postsPromises),
        Promise.all(commentsPromises),
      ]).then((results) => results.map((r) => r.map((res) => res.data)));

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

          postsData.push({
            title: `${post.title}-${uniqueSuffix}-${postUniqueSuffix}`,
            body: post.body,
            autobotId: i + 1, 
          });

          for (let k = 0; k < 10; k++) {
            const commentUniqueSuffix = generateUniqueString(6);
            const comment = comments[k % 10]; 

            commentsData.push({
              name: `${comment.name}-${commentUniqueSuffix}`,
              body: comment.body,
              postId: (i * 10) + j + 1, 
            });
          }
        }
      }

      // Insert Autobots, Posts, and Comments in bulk
      await Autobot.bulkCreate(autobotsData);
      await Post.bulkCreate(postsData);
      await Comment.bulkCreate(commentsData);

      console.log('500 Autobots and associated content created!');
    } catch (err) {
      console.error('Error creating Autobots:', err.message);
    }
  });
};
