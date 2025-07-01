const FastFashion = require('../models/FastFashion');

exports.createFastFashion = async (req, res) => {
  try {
    const data = new FastFashion(req.body);
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllFastFashion = async (req, res) => {
  try {
    const data = await FastFashion.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFastFashionById = async (req, res) => {
  try {
    const data = await FastFashion.findById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFastFashion = async (req, res) => {
  try {
    const updated = await FastFashion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteFastFashion = async (req, res) => {
  try {
    const deleted = await FastFashion.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
