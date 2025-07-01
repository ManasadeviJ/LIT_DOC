const SustainableFashion = require('../models/SustainableFashion');

exports.createSustainableFashion = async (req, res) => {
  try {
    const data = new SustainableFashion(req.body);
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllSustainableFashion = async (req, res) => {
  try {
    const data = await SustainableFashion.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSustainableFashionById = async (req, res) => {
  try {
    const data = await SustainableFashion.findById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSustainableFashion = async (req, res) => {
  try {
    const updated = await SustainableFashion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSustainableFashion = async (req, res) => {
  try {
    const deleted = await SustainableFashion.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
