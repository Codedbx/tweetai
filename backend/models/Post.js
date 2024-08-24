import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Autobot from './Autobot.js';

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  autobotId: {
    type: DataTypes.INTEGER,
    references: {
      model: Autobot,
      key: 'id',
    },
  },
}, {
  timestamps: false,
});

// Establishing relationships
Autobot.hasMany(Post, { foreignKey: 'autobotId', onDelete: 'CASCADE' });
Post.belongsTo(Autobot, { foreignKey: 'autobotId' });

export default Post;
