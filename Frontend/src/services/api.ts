const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';


//Autenticacion
export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return response.json();
};

export const register = async (userData: {
    n_cuenta: string;
    email: string;
    password: string;
    nombre_completo: string;
    carrera: string;
    id_rol: number;
}) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    return response.json();
};

export const getPerfil = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/users/perfil`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
    } catch {
        return false;
    }
};

export const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role;
    } catch {
        return null;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
};


//Citas
export const getCitasDisponibles = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/citas/disponibles`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
};

export const seleccionarCita = async (id_cita: number) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/citas/seleccionar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: id_cita })
    });
    return response.json();
};

export const crearCita = async (citaData: {
    materia: string;
    tutor: string;
    fecha: string;
    hora: string;
    lugar: string;
    notas: string;
}) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/citas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(citaData)
    });
    return response.json();
};


//Usuarios
export const getUsuarios = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/users`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
};

export const updateUserRole = async (id_user: number, id_rol_nuevo: number, motivo?: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/auth/user-role`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id_user, id_rol_nuevo, motivo })
    });
    return response.json();
};


//Citas
const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const obtenerCitas = async () => {
    const response = await fetch(`${API_URL}/citas`, {
        headers: getHeaders()
    });
    return response.json();
};

export const crearCita = async (citaData: any) => {
    const response = await fetch(`${API_URL}/citas`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(citaData)
    });
    return response.json();
};

export const editarCita = async (id: number, citaData: any) => {
    const response = await fetch(`${API_URL}/citas/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(citaData)
    });
    return response.json();
};

export const eliminarCita = async (id: number) => {
    const response = await fetch(`${API_URL}/citas/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });
    return response.json();
};

export const inscribirseCita = async (id: number) => {
    const response = await fetch(`${API_URL}/citas/${id}/inscribirse`, {
        method: 'POST',
        headers: getHeaders()
    });
    return response.json();
};

export const misCitas = async () => {
    const response = await fetch(`${API_URL}/citas/mis-citas`, {
        headers: getHeaders()
    });
    return response.json();
};

export const asignarLugar = async (id: number, lugar: string) => {
    const response = await fetch(`${API_URL}/citas/${id}/lugar`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ lugar })
    });
    return response.json();
};

export const obtenerPerfil = async () => {
    const response = await fetch(`${API_URL}/users/perfil`, {
        headers: getHeaders()
    });
    return response.json();
};

export const actualizarPerfil = async (userData: any) => {
    const response = await fetch(`${API_URL}/users/perfil`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(userData)
    });
    return response.json();
};