const leaveService = require('../services/leaveService');

function list(req, res) {
  res.json({ success: true, data: leaveService.list(req.user, req.query) });
}

function get(req, res) {
  res.json({ success: true, data: leaveService.get(req.user, req.params.id) });
}

function create(req, res) {
  res.status(201).json({ success: true, data: leaveService.create(req.user, req.body) });
}

function update(req, res) {
  res.json({ success: true, data: leaveService.update(req.user, req.params.id, req.body) });
}

function cancel(req, res) {
  res.json({ success: true, data: leaveService.cancel(req.user, req.params.id) });
}

function removeOwn(req, res) {
  leaveService.removeOwn(req.user, req.params.id);
  res.json({ success: true, data: null, message: 'İzin talebiniz kalıcı olarak silindi.' });
}

function approve(req, res) {
  res.json({ success: true, data: leaveService.decide(req.user, req.params.id, 'APPROVED', req.body) });
}

function reject(req, res) {
  res.json({ success: true, data: leaveService.decide(req.user, req.params.id, 'REJECTED', req.body) });
}

function history(req, res) {
  res.json({ success: true, data: leaveService.history(req.user) });
}

function remove(req, res) {
  leaveService.remove(req.user, req.params.id);
  res.json({ success: true, data: null, message: 'İzin talebi kalıcı olarak silindi.' });
}

module.exports = { list, get, create, update, cancel, removeOwn, approve, reject, history, remove };
