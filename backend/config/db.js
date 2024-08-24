import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

// Database configuration
const databaseName = 'tweetai';
const username = 'root';  
const password = '';  
const host = 'localhost';

// Function to create the database if it does not exist
const createDatabaseIfNotExists = async () => {
  const connection = await mysql.createConnection({ host, user: username, password });
  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
    console.log(`Database '${databaseName}' is ready.`);
  } catch (err) {
    console.error('Error creating database:', err.message);
  } finally {
    await connection.end();
  }
};

// Initialize Sequelize connection
const sequelize = new Sequelize(databaseName, username, password, {
  host,
  dialect: 'mysql',
  logging: false,
});

export { createDatabaseIfNotExists, sequelize };
