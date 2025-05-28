const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database(path.join(__dirname, '../todo.sqlite'), (err) => {
  if (err) {
    console.error('Could not connect to DB', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

db.serialize(() => {
  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Add user_id to todos if not exists (ignore error if already exists)
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      user_id INTEGER NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
});

module.exports = {
  // User-related DB ops
  createUser: (username, password, callback) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Hashing error:', err);
      return callback(err);
    }
    db.run(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      [username, hash],
      function (err) {
        if (err) {
          console.error('DB Insert User error:', err);
        } else {
          console.log(`User created with id: ${this.lastID}`);
        }
        callback(err, this ? this.lastID : null);
      }
    );
  });
},

findUserByUsername: (username, callback) => {
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      console.error('DB Find User error:', err);
    } else {
      console.log('User fetched:', row);
    }
    callback(err, row);
  });
},

  // Todo-related DB ops (now user-aware)
  getAll: (userId, callback) => {
    db.all('SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, rows) => {
      callback(err, rows);
    });
  },

  add: (text, userId, callback) => {
    db.run('INSERT INTO todos (text, user_id) VALUES (?, ?)', [text, userId], function (err) {
      callback(err, this ? this.lastID : null);
    });
  },

  complete: (id, userId, callback) => {
    db.run('UPDATE todos SET completed = 1 WHERE id = ? AND user_id = ?', [id, userId], function (err) {
      callback(err);
    });
  },

  delete: (id, userId, callback) => {
    db.run('DELETE FROM todos WHERE id = ? AND user_id = ?', [id, userId], function (err) {
      callback(err);
    });
  }
};
