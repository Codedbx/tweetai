import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5, 
  handler: (req, res) => {
    res.status(429).json({
      message: 'Too many requests, please try again later.',
    });
  },
  skip: (req) => {
    // Exclude the '/api/autobots/count' route from rate limiting
    return req.path === '/api/autobots/count';
  }
});

export default apiLimiter;
