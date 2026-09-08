const leaveTypeService = require('../services/leaveTypeService');

function list(req, res) {
  res.json({ success: true, data: leaveTypeService.list(req.user.role !== 'ADMIN') });
}

function create(req, res) {
  res.status(201).json({ success: true, data: leaveTypeService.create(req.body) });
}

function update(req, res) {
  res.json({ success: true, data: leaveTypeService.update(req.params.id, req.body) });
}

function remove(req, res) {
  leaveTypeService.remove(req.params.id);
  res.json({ success: true, data: null, message: 'İzin türü kalıcı olarak silindi.' });
}

module.exports = { list, create, update, remove };
