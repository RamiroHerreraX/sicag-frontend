import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIndicatorIcon,
  Save as SaveIcon,
  Folder as FolderIcon,
  Description as DescriptionIcon,
  Security as SecurityIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';

const ConfigExpediente = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'DOCUMENTACIÓN PERSONAL',
      required: true,
      documents: [
        { id: 101, name: 'Identificación Oficial', required: true, format: 'PDF/JPG', maxSize: '5MB' },
        { id: 102, name: 'Comprobante de Domicilio', required: true, format: 'PDF', maxSize: '5MB' },
        { id: 103, name: 'Acta de Nacimiento', required: true, format: 'PDF', maxSize: '10MB' },
      ]
    },
    {
      id: 2,
      name: 'CERTIFICACIONES PROFESIONALES',
      required: true,
      documents: [
        { id: 201, name: 'Patente Aduanal', required: true, format: 'PDF', maxSize: '10MB' },
        { id: 202, name: 'Cédula Profesional', required: true, format: 'PDF', maxSize: '10MB' },
        { id: 203, name: 'Opinión SAT', required: false, format: 'PDF', maxSize: '5MB' },
      ]
    },
    {
      id: 3,
      name: 'DOCUMENTACIÓN LEGAL',
      required: false,
      documents: [
        { id: 301, name: 'Poder Notarial', required: false, format: 'PDF', maxSize: '15MB' },
        { id: 302, name: 'Constancia Fiscal', required: true, format: 'PDF', maxSize: '5MB' },
      ]
    }
  ]);

  const [editDialog, setEditDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [editMode, setEditMode] = useState('category'); // 'category' or 'document'

  const handleAddCategory = () => {
    setEditMode('category');
    setCurrentCategory({
      id: Date.now(),
      name: '',
      required: false,
      documents: []
    });
    setEditDialog(true);
  };

  const handleEditCategory = (category) => {
    setEditMode('category');
    setCurrentCategory({ ...category });
    setEditDialog(true);
  };

  const handleAddDocument = (categoryId) => {
    setEditMode('document');
    setCurrentDocument({
      id: Date.now(),
      name: '',
      required: false,
      format: 'PDF',
      maxSize: '5MB'
    });
    setCurrentCategory(categories.find(c => c.id === categoryId));
    setEditDialog(true);
  };

  const handleEditDocument = (category, document) => {
    setEditMode('document');
    setCurrentDocument({ ...document });
    setCurrentCategory(category);
    setEditDialog(true);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('¿Está seguro de eliminar esta categoría y todos sus documentos?')) {
      setCategories(categories.filter(c => c.id !== categoryId));
    }
  };

  const handleDeleteDocument = (categoryId, documentId) => {
    if (window.confirm('¿Está seguro de eliminar este documento?')) {
      setCategories(categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            documents: category.documents.filter(doc => doc.id !== documentId)
          };
        }
        return category;
      }));
    }
  };

  const handleSave = () => {
    if (editMode === 'category') {
      if (currentCategory.id > 100) { // Nuevo
        setCategories([...categories, currentCategory]);
      } else { // Editar
        setCategories(categories.map(c => 
          c.id === currentCategory.id ? currentCategory : c
        ));
      }
    } else { // Documento
      setCategories(categories.map(category => {
        if (category.id === currentCategory.id) {
          const existingDocIndex = category.documents.findIndex(d => d.id === currentDocument.id);
          if (existingDocIndex >= 0) {
            // Editar documento existente
            const updatedDocuments = [...category.documents];
            updatedDocuments[existingDocIndex] = currentDocument;
            return { ...category, documents: updatedDocuments };
          } else {
            // Agregar nuevo documento
            return { ...category, documents: [...category.documents, currentDocument] };
          }
        }
        return category;
      }));
    }
    setEditDialog(false);
  };

  const handleToggleRequired = (categoryId, documentId) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          documents: category.documents.map(doc => 
            doc.id === documentId ? { ...doc, required: !doc.required } : doc
          )
        };
      }
      return category;
    }));
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
          Configuración de Expedientes
        </Typography>
        <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
          Defina la estructura y requisitos de los expedientes digitales
        </Typography>
      </Box>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '4px solid #3498db' }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: '#3498db', fontWeight: 'bold', mb: 1 }}>
                {categories.length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                Categorías
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '4px solid #2ecc71' }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: '#2ecc71', fontWeight: 'bold', mb: 1 }}>
                {categories.reduce((total, cat) => total + cat.documents.length, 0)}
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                Documentos Totales
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '4px solid #f39c12' }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: '#f39c12', fontWeight: 'bold', mb: 1 }}>
                {categories.reduce((total, cat) => 
                  total + cat.documents.filter(doc => doc.required).length, 0)}
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                Obligatorios
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '4px solid #9b59b6' }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: '#9b59b6', fontWeight: 'bold', mb: 1 }}>
                {categories.filter(cat => cat.required).length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                Categorías Obligatorias
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Botón agregar categoría */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCategory}
          sx={{ bgcolor: '#2c3e50', '&:hover': { bgcolor: '#34495e' } }}
        >
          Nueva Categoría
        </Button>
      </Box>

      {/* Lista de categorías */}
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} key={category.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FolderIcon sx={{ mr: 2, color: category.required ? '#e74c3c' : '#7f8c8d' }} />
                    <Box>
                      <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                        {category.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Chip 
                          label={category.required ? 'OBLIGATORIO' : 'OPCIONAL'} 
                          color={category.required ? 'error' : 'default'}
                          size="small"
                        />
                        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                          {category.documents.length} documentos
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton 
                      size="small" 
                      onClick={() => handleEditCategory(category)}
                      sx={{ color: '#3498db' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDeleteCategory(category.id)}
                      sx={{ color: '#e74c3c' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <List>
                  {category.documents.map((document) => (
                    <ListItem 
                      key={document.id}
                      sx={{ 
                        bgcolor: '#f8f9fa',
                        mb: 1,
                        borderRadius: 1
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <DragIndicatorIcon sx={{ color: '#7f8c8d' }} />
                      </ListItemIcon>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <DescriptionIcon sx={{ color: document.required ? '#e74c3c' : '#7f8c8d' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                              {document.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                              Formato: {document.format} • Máx: {document.maxSize}
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FormControlLabel
                            control={
                              <Switch
                                size="small"
                                checked={document.required}
                                onChange={() => handleToggleRequired(category.id, document.id)}
                                color="primary"
                              />
                            }
                            label={
                              <Typography variant="caption">
                                {document.required ? 'Obligatorio' : 'Opcional'}
                              </Typography>
                            }
                          />
                          <IconButton 
                            size="small" 
                            onClick={() => handleEditDocument(category, document)}
                            sx={{ color: '#f39c12' }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleDeleteDocument(category.id, document.id)}
                            sx={{ color: '#e74c3c' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>

                <Button
                  startIcon={<AddIcon />}
                  size="small"
                  onClick={() => handleAddDocument(category.id)}
                  sx={{ mt: 2 }}
                >
                  Agregar Documento
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Configuración general */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
            Configuración General de Expedientes
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Tamaño Máximo por Expediente"
                defaultValue="100"
                InputProps={{
                  endAdornment: <Typography variant="caption">MB</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Días para Completar Expediente"
                defaultValue="30"
                InputProps={{
                  endAdornment: <Typography variant="caption">días</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Revisión Periódica"
                defaultValue="180"
                InputProps={{
                  endAdornment: <Typography variant="caption">días</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                label="Formato Principal"
                defaultValue="PDF"
              >
                <MenuItem value="PDF">PDF</MenuItem>
                <MenuItem value="JPG">JPG/PNG</MenuItem>
                <MenuItem value="AMBOS">Ambos</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ minWidth: 200 }}
            >
              Guardar Configuración
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Diálogo de edición */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editMode === 'category' ? 
            (currentCategory?.id > 100 ? 'Nueva Categoría' : 'Editar Categoría') : 
            (currentDocument?.id > 1000 ? 'Nuevo Documento' : 'Editar Documento')}
        </DialogTitle>
        <DialogContent>
          {editMode === 'category' ? (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre de la Categoría"
                  value={currentCategory?.name || ''}
                  onChange={(e) => setCurrentCategory({...currentCategory, name: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentCategory?.required || false}
                      onChange={(e) => setCurrentCategory({...currentCategory, required: e.target.checked})}
                      color="primary"
                    />
                  }
                  label="Categoría Obligatoria"
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre del Documento"
                  value={currentDocument?.name || ''}
                  onChange={(e) => setCurrentDocument({...currentDocument, name: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentDocument?.required || false}
                      onChange={(e) => setCurrentDocument({...currentDocument, required: e.target.checked})}
                      color="primary"
                    />
                  }
                  label="Documento Obligatorio"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Formato"
                  value={currentDocument?.format || 'PDF'}
                  onChange={(e) => setCurrentDocument({...currentDocument, format: e.target.value})}
                >
                  <MenuItem value="PDF">PDF</MenuItem>
                  <MenuItem value="JPG">JPG</MenuItem>
                  <MenuItem value="PNG">PNG</MenuItem>
                  <MenuItem value="DOC">DOC/DOCX</MenuItem>
                  <MenuItem value="OTRO">Otro</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Tamaño Máximo"
                  value={currentDocument?.maxSize || '5MB'}
                  onChange={(e) => setCurrentDocument({...currentDocument, maxSize: e.target.value})}
                >
                  <MenuItem value="1MB">1 MB</MenuItem>
                  <MenuItem value="5MB">5 MB</MenuItem>
                  <MenuItem value="10MB">10 MB</MenuItem>
                  <MenuItem value="25MB">25 MB</MenuItem>
                  <MenuItem value="50MB">50 MB</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancelar</Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={editMode === 'category' ? !currentCategory?.name : !currentDocument?.name}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConfigExpediente;