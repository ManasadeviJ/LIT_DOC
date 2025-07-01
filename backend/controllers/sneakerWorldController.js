const SneakerWorld = require('../models/SneakerWorld');

exports.createSneakerWorld = async (req, res) => {
  try {
    const data = new SneakerWorld(req.body);
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllSneakerWorld = async (req, res) => {
  try {
    const data = await SneakerWorld.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSneakerWorldById = async (req, res) => {
  try {
    const data = await SneakerWorld.findById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSneakerWorld = async (req, res) => {
  try {
    const updated = await SneakerWorld.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSneakerWorld = async (req, res) => {
  try {
    const deleted = await SneakerWorld.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
