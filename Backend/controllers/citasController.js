exports.aceptarCita = async (req, res) => {
  const { id } = req.params;

  const cita = await db.query('SELECT * FROM citas WHERE id = ?', [id]);

  if (cita[0].estado !== 'pendiente') {
    return res.status(400).json({ error: 'No se puede modificar' });
  }

  await db.query('UPDATE citas SET estado = "aceptada" WHERE id = ?', [id]);

  res.json({ message: 'Cita aceptada' });
};
