const SQLite = require("better-sqlite3");
const sql = new SQLite("./users.sqlite");
const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'users';");

// Initialize SQLite DB if necessary

if (false) {
    sql.prepare("CREATE TABLE users (id TEXT PRIMARY KEY, gmailAddress TEXT);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_users_id ON users (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
}


const createUser = sql.prepare("INSERT OR REPLACE INTO users (id, gmailAddress) VALUES (@id, @gmailAddress);");
const getUser = sql.prepare("SELECT * FROM users WHERE id = ?");
const deleteUser = sql.prepare("DELETE FROM users WHERE id = ?");

// userAccount = {
//  id: discordID
//  gmailAddress: gmail
// }

// createUser.run(userAccount)

module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;