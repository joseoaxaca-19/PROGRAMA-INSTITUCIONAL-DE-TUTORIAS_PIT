const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editandoId) {
        const nuevosAvisos = avisos.map((aviso) => 
            aviso.id === editandoId ? { ...formData, id: editandoId } : aviso
        );
        setAvisos(nuevosAvisos);
        localStorage.setItem('avisos', JSON.stringify(nuevosAvisos));
        setEditandoId(null);
    } else {
        const nuevoAviso = { ...formData, id: Date.now() };
        const nuevosAvisos = [...avisos, nuevoAviso];
        setAvisos(nuevosAvisos);
        localStorage.setItem('avisos', JSON.stringify(nuevosAvisos));
    }
    setFormData({ titulo: '', contenido: '', imagen: '', color: '#003DA6' });
};