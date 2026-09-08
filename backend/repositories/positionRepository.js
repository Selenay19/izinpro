const { getDatabase } = require('../config/database');

function map(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    isActive: Boolean(row.is_active),
    userCount: row.user_count === undefined ? undefined : row.user_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function list(activeOnly = false) {
  const where = activeOnly ? 'WHERE p.is_active = 1' : '';
  return getDatabase().prepare(`
    SELECT p.*, COUNT(u.id) AS user_count
    FROM positions p
    LEFT JOIN users u ON u.position_id = p.id
    ${where}
    GROUP BY p.id
    ORDER BY p.name
  `).all().map(map);
}

function findById(id) {
  return map(getDatabase().prepare(`
    SELECT p.*, COUNT(u.id) AS user_count
    FROM positions p
    LEFT JOIN users u ON u.position_id = p.id
    WHERE p.id = ?
    GROUP BY p.id
  `).get(id));
}

function findByName(name) {
  return map(getDatabase().prepare(`
    SELECT p.*, COUNT(u.id) AS user_count
    FROM positions p
    LEFT JOIN users u ON u.position_id = p.id
    WHERE p.name = ? COLLATE NOCASE
    GROUP BY p.id
  `).get(name));
}

function create(name) {
  const result = getDatabase().prepare('INSERT INTO positions (name) VALUES (?)').run(name);
  return findById(result.lastInsertRowid);
}

function update(id, name) {
  getDatabase().prepare(`
    UPDATE positions SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(name, id);
  return findById(id);
}

function setActive(id, active) {
  getDatabase().prepare(`
    UPDATE positions SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(active ? 1 : 0, id);
  return findById(id);
}

function remove(id) {
  getDatabase().prepare('DELETE FROM positions WHERE id = ?').run(id);
}

module.exports = { list, findById, findByName, create, update, setActive, remove };
