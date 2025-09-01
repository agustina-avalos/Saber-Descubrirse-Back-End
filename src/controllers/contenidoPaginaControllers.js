const ContenidoPagina = require("../models/ContenidoPagina");

// Crear un nuevo contenido de página
const createContenidoPagina = async (req, res) => {
  try {
    const contenido = new ContenidoPagina(req.body);
    await contenido.save();
    res.status(201).json(contenido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//Actualizar un contenido de página existente
const updateContenidoPagina = async (req, res) => {
  try {
    const contenido = await ContenidoPagina.findOneAndUpdate(
      { section: req.params.section },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!contenido) return res.status(404).json({ error: 'No existe esta sección.' });
    res.json(contenido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports = { createContenidoPagina, updateContenidoPagina };