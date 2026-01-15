import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Stack,
  InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'

  // Datos mock de usuarios
  const [users, setUsers] = useState([
    { id: 1, name: 'Luis Rodríguez', email: 'luis@ejemplo.com', role: 'Agente', region: 'Norte', status: 'Activo', lastAccess: '15/01/2026' },
    { id: 2, name: 'María González', email: 'maria@ejemplo.com', role: 'Comité', region: 'Centro', status: 'Activo', lastAccess: '14/01/2026' },
    { id: 3, name: 'Carlos Martínez', email: 'carlos@ejemplo.com', role: 'Agente', region: 'Sur', status: 'Inactivo', lastAccess: '10/01/2026' },
    { id: 4, name: 'Ana López', email: 'ana@ejemplo.com', role: 'Profesionista', region: 'Norte', status: 'Activo', lastAccess: '15/01/2026' },
    { id: 5, name: 'Pedro Sánchez', email: 'pedro@ejemplo.com', role: 'Empresario', region: 'Centro', status: 'Activo', lastAccess: '13/01/2026' },
    { id: 6, name: 'Laura Díaz', email: 'laura@ejemplo.com', role: 'Admin', region: 'Todas', status: 'Activo', lastAccess: '15/01/2026' },
  ]);

  const roles = ['Agente', 'Comité', 'Profesionista', 'Empresario', 'Admin'];
  const regions = ['Norte', 'Centro', 'Sur', 'Metropolitana', 'Todas'];

  const handleAddUser = () => {
    setDialogMode('add');
    setSelectedUser({
      name: '',
      email: '',
      role: 'Agente',
      region: 'Norte',
      status: 'Activo'
    });
    setOpenDialog(true);
  };

  const handleEditUser = (user) => {
    setDialogMode('edit');
    setSelectedUser({ ...user });
    setOpenDialog(true);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleSaveUser = () => {
    if (dialogMode === 'add') {
      // Agregar nuevo usuario
      const newUser = {
        ...selectedUser,
        id: users.length + 1,
        lastAccess: new Date().toLocaleDateString('es-ES')
      };
      setUsers([...users, newUser]);
    } else {
      // Editar usuario existente
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...selectedUser } : user
      ));
    }
    setOpenDialog(false);
  };

  const handleToggleStatus = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: user.status === 'Activo' ? 'Inactivo' : 'Activo' } : user
    ));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
            Gestión de Usuarios
          </Typography>
          <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
            Administre los usuarios del sistema SICAG
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
          sx={{ bgcolor: '#1b5e20', '&:hover': { bgcolor: '#2e7d32' } }}
        >
          Nuevo Usuario
        </Button>
      </Box>

      {/* Barra de búsqueda y filtros */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Buscar por nombre, email o rol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Chip label={`Total: ${users.length}`} color="primary" variant="outlined" />
              <Chip 
                label={`Activos: ${users.filter(u => u.status === 'Activo').length}`} 
                color="success" 
                variant="outlined" 
              />
              <Chip 
                label={`Inactivos: ${users.filter(u => u.status === 'Inactivo').length}`} 
                color="error" 
                variant="outlined" 
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabla de usuarios */}
      <Paper elevation={1}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f7fa' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Nombre Completo</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Rol</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Región</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Último Acceso</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Estatus</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Typography sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      {user.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role}
                      size="small"
                      color={
                        user.role === 'Admin' ? 'error' :
                        user.role === 'Comité' ? 'secondary' :
                        user.role === 'Agente' ? 'primary' : 'default'
                      }
                    />
                  </TableCell>
                  <TableCell>{user.region}</TableCell>
                  <TableCell>{user.lastAccess}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.status}
                      size="small"
                      color={user.status === 'Activo' ? 'success' : 'error'}
                      icon={user.status === 'Activo' ? <CheckCircleIcon /> : <CancelIcon />}
                      onClick={() => handleToggleStatus(user.id)}
                      sx={{ cursor: 'pointer' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleEditUser(user)}
                        sx={{ color: '#3498db' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteUser(user.id)}
                        sx={{ color: '#e74c3c' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton size="small">
                        <MoreVertIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Diálogo para agregar/editar usuario */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogMode === 'add' ? 'Nuevo Usuario' : 'Editar Usuario'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre Completo"
                value={selectedUser?.name || ''}
                onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={selectedUser?.email || ''}
                onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Rol"
                value={selectedUser?.role || ''}
                onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Región"
                value={selectedUser?.region || ''}
                onChange={(e) => setSelectedUser({...selectedUser, region: e.target.value})}
              >
                {regions.map((region) => (
                  <MenuItem key={region} value={region}>
                    {region}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Estatus"
                value={selectedUser?.status || ''}
                onChange={(e) => setSelectedUser({...selectedUser, status: e.target.value})}
              >
                <MenuItem value="Activo">Activo</MenuItem>
                <MenuItem value="Inactivo">Inactivo</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button 
            onClick={handleSaveUser} 
            variant="contained"
            disabled={!selectedUser?.name || !selectedUser?.email}
          >
            {dialogMode === 'add' ? 'Crear Usuario' : 'Guardar Cambios'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;