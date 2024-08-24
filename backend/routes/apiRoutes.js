import express from 'express';
import { getAutobotCount, getAutobots } from '../controllers/autobotController.js';
import { getPostsByAutobotId } from '../controllers/postController.js';
import { getCommentsByPostId } from '../controllers/commentController.js';

const router = express.Router();

/**
 * @swagger
 * /autobot/count:
 *   get:
 *     summary: Retrieve the count of Autobots
 *     responses:
 *       200:
 *         description: The count of Autobots
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 500
 */
router.get('/autobot/count', getAutobotCount);

/**
 * @swagger
 * /autobots:
 *   get:
 *     summary: Retrieve a list of Autobots
 *     responses:
 *       200:
 *         description: A list of Autobots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: 'Autobot Name'
 */
router.get('/autobots', getAutobots);

/**
 * @swagger
 * /autobots/{autobotId}/posts:
 *   get:
 *     summary: Retrieve posts for a specific Autobot
 *     parameters:
 *       - in: path
 *         name: autobotId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Autobot
 *     responses:
 *       200:
 *         description: A list of posts for the specified Autobot
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: 'Post Title'
 */
router.get('/autobots/:autobotId/posts', getPostsByAutobotId);

/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     summary: Retrieve comments for a specific post
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: A list of comments for the specified post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   body:
 *                     type: string
 *                     example: 'Comment body'
 */
router.get('/posts/:postId/comments', getCommentsByPostId);

export default router;
