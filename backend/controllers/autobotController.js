import Autobot from '../models/Autobot.js';

export const getAutobotCount = async (req, res) => {
  try {
    const count = await Autobot.count();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
};

export const getAutobots = async (req, res) => {
  try {
    const autobots = await Autobot.findAll({ limit: 10 });
    res.json(autobots);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
};
