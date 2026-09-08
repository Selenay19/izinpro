const positionService = require('../services/positionService');

function list(req, res) {
  const activeOnly = req.user.role !== 'ADMIN' || req.query.activeOnly === 'true';
  res.json({ success: true, data: positionService.list(activeOnly) });
}

function create(req, res) {
  res.status(201).json({ success: true, data: positionService.create(req.body) });
}

function update(req, res) {
  res.json({ success: true, data: positionService.update(req.params.id, req.body) });
}

function setStatus(req, res) {
  res.json({ success: true, data: positionService.setStatus(req.params.id, req.body.isActive) });
}

function remove(req, res) {
  positionService.remove(req.params.id);
  res.json({ success: true, data: null, message: 'Pozisyon kalıcı olarak silindi.' });
}

module.exports = { list, create, update, setStatus, remove };
