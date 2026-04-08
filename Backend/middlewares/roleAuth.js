const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    // Obtener el token desde el header Authorization (formato: "Bearer <token>")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Se requiere un token de autenticación' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'llave_secreta_por_defecto');

        // Adjuntar el payload decodificado (que incluye el rol) al objeto request
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

// Middleware para verificar roles (RBAC)
const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        // req.user viene del middleware anterior (verifyToken)
        if (!req.user || !req.user.rol) {
            return res.status(403).json({ message: 'No se encontraron permisos para el usuario' });
        }

        // Verificar si el rol del usuario está dentro de los roles permitidos
        if (!allowedRoles.includes(req.user.rol)) {
            return res.status(403).json({ message: 'Acceso denegado: permisos insuficientes' });
        }

        next();
    };
};

module.exports = {
    verifyToken,
    requireRole
};