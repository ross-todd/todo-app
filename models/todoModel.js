const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Open SQLite DB
const db = new sqlite3.Database(path.join(__dirname, '../todo.sqlite'), (err) => {
  if (err) {
    console.error('Could not connect to DB', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = {
  getAll: (callback) => {
    db.all('SELECT * FROM todos ORDER BY created_at DESC', (err, rows) => {
      callback(err, rows);
    });
  },

  add: (text, callback) => {
    db.run('INSERT INTO todos (text) VALUES (?)', [text], function(err) {
      callback(err, this.lastID);
    });
  },

  complete: (id, callback) => {
    db.run('UPDATE todos SET completed = 1 WHERE id = ?', [id], function(err) {
      callback(err);
    });
  },

  delete: (id, callback) => {
    db.run('DELETE FROM todos WHERE id = ?', [id], function(err) {
      callback(err);
    });
  }
};
