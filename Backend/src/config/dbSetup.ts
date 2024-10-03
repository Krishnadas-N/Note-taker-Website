import { query } from "./database"; 

export const initializeDatabase = async () => {
  try {
    // SQL to create the users table if it doesn't exist
    const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255),
      profileImage VARCHAR(255),
      google_id VARCHAR(255),  
      refresh_token TEXT,      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  

    const createNotesTableQuery = `
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      media TEXT[] DEFAULT '{}',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

    // Execute the queries
    await query(createUsersTableQuery);
    console.log('Users table has been created or already exists.');

    await query(createNotesTableQuery);
    console.log('Notes table has been created or already exists.');
  } catch (err) {
    console.error('Error creating tables:', err);
    throw err;
  }
};
