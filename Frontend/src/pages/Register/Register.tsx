import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register, getRoles, getCarreras } from '../../services/api';
import './Register.css';

interface Catalogo {
  id: number;
  nombre: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    numero_cuenta: '',
    nombre: '',
    apellidos: '',
    correo: '',
    id_carrera: '',
    id_rol: '',
    password: '',
    confirmar_password: '',
  });

  const [roles, setRoles] = useState<Catalogo[]>([]);
  const [carreras, setCarreras] = useState<Catalogo[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getRoles().then(res => {
      if (res.success) setRoles(res.data);
    }).catch(() => {});

    getCarreras().then(res => {
      if (res.success) setCarreras(res.data);
    }).catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
    setError('');
  };

  const validateClient = (): boolean => {
    const errors: Record<string, string> = {};

    if (!form.numero_cuenta.trim()) errors.numero_cuenta = 'El número de cuenta es obligatorio.';
    if (!form.nombre.trim()) errors.nombre = 'El nombre es obligatorio.';
    if (!form.apellidos.trim()) errors.apellidos = 'Los apellidos son obligatorios.';
    if (!form.correo.trim()) {
      errors.correo = 'El correo electrónico es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      errors.correo = 'El correo electrónico no es válido.';
    }
    if (!form.id_carrera) errors.id_carrera = 'Selecciona una carrera.';
    if (!form.id_rol) errors.id_rol = 'Selecciona un rol.';
    if (!form.password) {
      errors.password = 'La contraseña es obligatoria.';
    } else if (form.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }
    if (form.password !== form.confirmar_password) {
      errors.confirmar_password = 'Las contraseñas no coinciden.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateClient()) return;

    setLoading(true);
    setError('');

    try {
      const result = await register({
        numero_cuenta: form.numero_cuenta.trim(),
        nombre: form.nombre.trim(),
        apellidos: form.apellidos.trim(),
        correo: form.correo.trim(),
        id_carrera: Number(form.id_carrera),
        id_rol: Number(form.id_rol),
        password: form.password,
      });

      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate('/'), 2500);
      } else if (result.errors) {
        const serverErrors: Record<string, string> = {};
        result.errors.forEach((e: { campo: string; mensaje: string }) => {
          serverErrors[e.campo] = e.mensaje;
        });
        setFieldErrors(serverErrors);
      } else {
        setError(result.message || 'Ocurrió un error al registrar el usuario.');
      }
    } catch {
      setError('Error al conectar con el servidor. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="register-page">
        <div className="register-card">
          <div className="register-success">
            <span className="material-symbols-outlined success-icon">check_circle</span>
            <h2>¡Registro exitoso!</h2>
            <p>Tu cuenta ha sido creada correctamente. Serás redirigido al inicio en unos segundos.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Crear cuenta</h2>
        <p className="register-subtitle">Sistema PIT — FES Acatlán</p>

        <form onSubmit={handleSubmit} noValidate>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="numero_cuenta">Número de cuenta</label>
              <input
                type="text"
                id="numero_cuenta"
                name="numero_cuenta"
                value={form.numero_cuenta}
                onChange={handleChange}
                placeholder="Ej. 420012345"
                className={fieldErrors.numero_cuenta ? 'input-error' : ''}
              />
              {fieldErrors.numero_cuenta && <span className="field-error">{fieldErrors.numero_cuenta}</span>}
            </div>
          </div>

          <div className="form-row two-cols">
            <div className="form-group">
              <label htmlFor="nombre">Nombre(s)</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej. Juan"
                className={fieldErrors.nombre ? 'input-error' : ''}
              />
              {fieldErrors.nombre && <span className="field-error">{fieldErrors.nombre}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                value={form.apellidos}
                onChange={handleChange}
                placeholder="Ej. Pérez García"
                className={fieldErrors.apellidos ? 'input-error' : ''}
              />
              {fieldErrors.apellidos && <span className="field-error">{fieldErrors.apellidos}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="correo">Correo electrónico</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                placeholder="correo@comunidad.unam.mx"
                className={fieldErrors.correo ? 'input-error' : ''}
              />
              {fieldErrors.correo && <span className="field-error">{fieldErrors.correo}</span>}
            </div>
          </div>

          <div className="form-row two-cols">
            <div className="form-group">
              <label htmlFor="id_rol">Rol</label>
              <select
                id="id_rol"
                name="id_rol"
                value={form.id_rol}
                onChange={handleChange}
                className={fieldErrors.id_rol ? 'input-error' : ''}
              >
                <option value="">Selecciona un rol</option>
                {roles.length > 0 ? (
                  roles.map(r => (
                    <option key={r.id} value={r.id}>{r.nombre}</option>
                  ))
                ) : (
                  <>
                    <option value="1">Tutor</option>
                    <option value="2">Tutorado</option>
                  </>
                )}
              </select>
              {fieldErrors.id_rol && <span className="field-error">{fieldErrors.id_rol}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="id_carrera">Carrera</label>
              <select
                id="id_carrera"
                name="id_carrera"
                value={form.id_carrera}
                onChange={handleChange}
                className={fieldErrors.id_carrera ? 'input-error' : ''}
              >
                <option value="">Selecciona una carrera</option>
                {carreras.map(c => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
              {fieldErrors.id_carrera && <span className="field-error">{fieldErrors.id_carrera}</span>}
            </div>
          </div>

          <div className="form-row two-cols">
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  className={fieldErrors.password ? 'input-error' : ''}
                />
                <button type="button" className="toggle-password" onClick={() => setShowPassword(p => !p)}>
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmar_password">Confirmar contraseña</label>
              <div className="password-wrapper">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  id="confirmar_password"
                  name="confirmar_password"
                  value={form.confirmar_password}
                  onChange={handleChange}
                  placeholder="Repite tu contraseña"
                  className={fieldErrors.confirmar_password ? 'input-error' : ''}
                />
                <button type="button" className="toggle-password" onClick={() => setShowConfirm(p => !p)}>
                  <span className="material-symbols-outlined">
                    {showConfirm ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {fieldErrors.confirmar_password && <span className="field-error">{fieldErrors.confirmar_password}</span>}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-register" disabled={loading}>
            {loading ? 'Registrando...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="register-footer">
          ¿Ya tienes cuenta?{' '}
          <Link to="/" className="link-login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
