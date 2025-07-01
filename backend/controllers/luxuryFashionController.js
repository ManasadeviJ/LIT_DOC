const LuxuryFashion = require('../models/LuxuryFashion');

exports.createLuxuryFashion = async (req, res) => {
  try {
    const data = new LuxuryFashion(req.body);
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllLuxuryFashion = async (req, res) => {
  try {
    const data = await LuxuryFashion.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLuxuryFashionById = async (req, res) => {
  try {
    const data = await LuxuryFashion.findById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLuxuryFashion = async (req, res) => {
  try {
    const updated = await LuxuryFashion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteLuxuryFashion = async (req, res) => {
  try {
    const deleted = await LuxuryFashion.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
