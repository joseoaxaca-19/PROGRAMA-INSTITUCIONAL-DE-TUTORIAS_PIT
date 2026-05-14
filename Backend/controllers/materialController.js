const db = require("../connection");

// Obtener todos los materiales(publico)
exports.obtenerMateriales = async (req, res) => {
    try {
        const { tipo, carrera } = req.query;
        
        let query = `
            SELECT m.* FROM tr_materiales m
            WHERE m.activo = true
        `;
        const params = [];
        
        if (tipo) {
            query += ` AND m.tipo = $${params.length + 1}`;
            params.push(tipo);
        }
        
        if (carrera) {
            query += ` AND m.carrera = $${params.length + 1}`;
            params.push(carrera);
        }
        
        query += ` ORDER BY m.orden ASC, m.created_at DESC`;
        
        const result = await db.query(query, params);
        res.json({ success: true, materiales: result.rows });
    } catch (error) {
        console.error("Error al obtener materiales:", error);
        res.status(500).json({ success: false, error: "Error al obtener materiales" });
    }
};

// Obtener materiales por categoria
exports.obtenerMaterialesPorCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;
        
        const result = await db.query(`
            SELECT * FROM tr_materiales 
            WHERE categoria = $1 AND activo = true
            ORDER BY orden ASC, created_at DESC
        `, [categoria]);
        
        res.json({ success: true, materiales: result.rows });
    } catch (error) {
        console.error("Error al obtener materiales:", error);
        res.status(500).json({ success: false, error: "Error al obtener materiales" });
    }
};

// Obtener materiales por carrera
exports.obtenerMaterialesPorCarrera = async (req, res) => {
    try {
        const { carrera } = req.params;
        
        const result = await db.query(`
            SELECT * FROM tr_materiales 
            WHERE carrera = $1 AND tipo = 'material_academico' AND activo = true
            ORDER BY orden ASC, created_at DESC
        `, [decodeURIComponent(carrera)]);
        
        res.json({ success: true, materiales: result.rows });
    } catch (error) {
        console.error("Error al obtener materiales:", error);
        res.status(500).json({ success: false, error: "Error al obtener materiales" });
    }
};

// Crear material (solo admin)
exports.crearMaterial = async (req, res) => {
    try {
        const { titulo, descripcion, tipo, categoria, carrera, archivo_url, tamano } = req.body;
        
        if (!titulo || !tipo || !categoria || !archivo_url) {
            return res.status(400).json({ success: false, error: "Titulo, tipo, categoria y URL del archivo son obligatorios" });
        }
        
        const result = await db.query(`
            INSERT INTO tr_materiales (titulo, descripcion, tipo, categoria, carrera, archivo_url, tamano)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `, [titulo, descripcion, tipo, categoria, carrera, archivo_url, tamano]);
        
        res.json({ success: true, material: result.rows[0] });
    } catch (error) {
        console.error("Error al crear material:", error);
        res.status(500).json({ success: false, error: "Error al crear material" });
    }
};

// Actualizar material (solo admin)
exports.actualizarMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, tipo, categoria, carrera, archivo_url, tamano, activo, orden } = req.body;
        
        const result = await db.query(`
            UPDATE tr_materiales 
            SET titulo = $1, descripcion = $2, tipo = $3, categoria = $4, 
                carrera = $5, archivo_url = $6, tamano = $7, activo = $8, 
                orden = $9, updated_at = NOW()
            WHERE id_material = $10
            RETURNING *
        `, [titulo, descripcion, tipo, categoria, carrera, archivo_url, tamano, activo, orden, id]);
        
        res.json({ success: true, material: result.rows[0] });
    } catch (error) {
        console.error("Error al actualizar material:", error);
        res.status(500).json({ success: false, error: "Error al actualizar material" });
    }
};

// Eliminar material (solo admin)
exports.eliminarMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM tr_materiales WHERE id_material = $1", [id]);
        res.json({ success: true, message: "Material eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar material:", error);
        res.status(500).json({ success: false, error: "Error al eliminar material" });
    }
};

// Obtener todas las categorias
exports.obtenerCategorias = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT * FROM tr_categorias_material ORDER BY orden ASC
        `);
        res.json({ success: true, categorias: result.rows });
    } catch (error) {
        console.error("Error al obtener categorias:", error);
        res.status(500).json({ success: false, error: "Error al obtener categorias" });
    }
};