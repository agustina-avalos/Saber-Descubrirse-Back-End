const Carrusel = require('../models/Carrusel');

const postImage = async (req, res) => {
  try {
    const carruselmage = new Carrusel(req.body);
    await carruselmage.save();
    res.status(201).json(carruselmage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getImages = async (req, res) => {
  try {
    const carruselImages = await Carrusel.find().sort({ order: 1 });
    res.json(carruselImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateImage = async (req, res) => {
  try {
    const carruselmage = await Carrusel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
    if (!carruselmage) return res.status(404).json({ error: 'Imagen no encontrada' });
    res.json(carruselmage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteImage = async (req, res) => {
  try {
    const carruselmage = await Carrusel.findByIdAndDelete(
        req.params.id,
        { $set: { deleted: true } },
        { new: true }
    );
    if (!carruselmage) return res.status(404).json({ error: 'Imagen no encontrada' });
    res.json({ message: 'Imagen eliminada' }); 

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = { postImage, getImages, updateImage, deleteImage };
