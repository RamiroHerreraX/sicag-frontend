// src/pages/expediente/ConfigExpediente.jsx
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
  MenuItem,
  Stack,
  Tooltip,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputAdornment,
  Avatar,
  LinearProgress
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
  CloudUpload as CloudUploadIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Settings as SettingsIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Visibility as VisibilityIcon,
  Lock as LockIcon,
  Public as PublicIcon,
  GridView as GridViewIcon,
  List as ListIcon,
  Sort as SortIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';

const ConfigExpediente = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'DOCUMENTACIÓN PERSONAL',
      description: 'Documentos de identificación y datos personales',
      required: true,
      icon: '👤',
      color: '#3498db',
      documents: [
        { 
          id: 101, 
          name: 'Identificación Oficial', 
          description: 'INE, Pasaporte o Cédula profesional', 
          required: true, 
          format: 'PDF/JPG/PNG', 
          maxSize: '5MB',
          validation: 'OCR y validez',
          tags: ['obligatorio', 'identificación'],
          order: 1
        },
        { 
          id: 102, 
          name: 'Comprobante de Domicilio', 
          description: 'No mayor a 3 meses de antigüedad', 
          required: true, 
          format: 'PDF', 
          maxSize: '5MB',
          validation: 'Fecha y domicilio',
          tags: ['obligatorio', 'domicilio'],
          order: 2
        },
        { 
          id: 103, 
          name: 'Acta de Nacimiento', 
          description: 'Documento oficial vigente', 
          required: true, 
          format: 'PDF', 
          maxSize: '10MB',
          validation: 'Autenticidad',
          tags: ['obligatorio', 'identificación'],
          order: 3
        },
      ],
      order: 1
    },
    {
      id: 2,
      name: 'CERTIFICACIONES PROFESIONALES',
      description: 'Certificaciones y credenciales profesionales',
      required: true,
      icon: '🎓',
      color: '#2ecc71',
      documents: [
        { 
          id: 201, 
          name: 'Patente Aduanal', 
          description: 'Vigente y legible', 
          required: true, 
          format: 'PDF', 
          maxSize: '10MB',
          validation: 'Vigencia y registro',
          tags: ['obligatorio', 'profesional'],
          order: 1
        },
        { 
          id: 202, 
          name: 'Cédula Profesional', 
          description: 'Registro profesional vigente', 
          required: true, 
          format: 'PDF', 
          maxSize: '10MB',
          validation: 'Registro y especialidad',
          tags: ['obligatorio', 'profesional'],
          order: 2
        },
        { 
          id: 203, 
          name: 'Opinión SAT', 
          description: 'Opinión positiva del SAT', 
          required: false, 
          format: 'PDF', 
          maxSize: '5MB',
          validation: 'Vigencia y folio',
          tags: ['opcional', 'fiscal'],
          order: 3
        },
      ],
      order: 2
    },
    {
      id: 3,
      name: 'DOCUMENTACIÓN LEGAL',
      description: 'Documentos legales y poderes',
      required: false,
      icon: '⚖️',
      color: '#9b59b6',
      documents: [
        { 
          id: 301, 
          name: 'Poder Notarial', 
          description: 'Poder vigente y autenticado', 
          required: false, 
          format: 'PDF', 
          maxSize: '15MB',
          validation: 'Firma y registro',
          tags: ['legal', 'poder'],
          order: 1
        },
        { 
          id: 302, 
          name: 'Constancia Fiscal', 
          description: 'Constancia de situación fiscal', 
          required: true, 
          format: 'PDF', 
          maxSize: '5MB',
          validation: 'Vigencia y RFC',
          tags: ['obligatorio', 'fiscal'],
          order: 2
        },
      ],
      order: 3
    }
  ]);

  const [editDialog, setEditDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [editMode, setEditMode] = useState('category');
  const [viewMode, setViewMode] = useState('list'); // 'list' o 'grid'
  const [expandedCategory, setExpandedCategory] = useState(1);
  const [generalConfig, setGeneralConfig] = useState({
    maxExpedienteSize: '100',
    daysToComplete: '30',
    periodicReview: '180',
    mainFormat: 'PDF',
    autoValidation: true,
    versionControl: true,
    requireDigitalSignature: false,
    retentionYears: '5',
    maxDocumentsPerExpediente: '50'
  });

  const handleAddCategory = () => {
    setEditMode('category');
    setCurrentCategory({
      id: Date.now(),
      name: '',
      description: '',
      required: false,
      icon: '📁',
      color: '#7f8c8d',
      documents: [],
      order: categories.length + 1
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
    const category = categories.find(c => c.id === categoryId);
    setCurrentDocument({
      id: Date.now(),
      name: '',
      description: '',
      required: false,
      format: 'PDF',
      maxSize: '5MB',
      validation: '',
      tags: [],
      order: category.documents.length + 1
    });
    setCurrentCategory(category);
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

  const handleCategoryExpand = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleGeneralConfigChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setGeneralConfig({
      ...generalConfig,
      [field]: value
    });
  };

  // Estadísticas
  const stats = {
    totalCategories: categories.length,
    totalDocuments: categories.reduce((total, cat) => total + cat.documents.length, 0),
    requiredDocuments: categories.reduce((total, cat) => 
      total + cat.documents.filter(doc => doc.required).length, 0),
    optionalDocuments: categories.reduce((total, cat) => 
      total + cat.documents.filter(doc => !doc.required).length, 0),
    requiredCategories: categories.filter(cat => cat.required).length
  };

  const formatOptions = ['PDF', 'JPG', 'PNG', 'DOC', 'DOCX', 'XLS', 'XLSX', 'TXT'];
  const sizeOptions = ['1MB', '5MB', '10MB', '25MB', '50MB', '100MB'];
  const tagOptions = ['obligatorio', 'identificación', 'fiscal', 'legal', 'profesional', 'domicilio', 'poder', 'opcional'];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 0.5 }}>
              Configuración de Expedientes
            </Typography>
            <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
              Defina la estructura y requisitos de los expedientes digitales
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              size="small"
            >
              Exportar Config
            </Button>
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              size="small"
            >
              Importar Config
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddCategory}
              sx={{ bgcolor: '#2c3e50' }}
            >
              Nueva Categoría
            </Button>
          </Stack>
        </Box>

        {/* Estadísticas */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ borderLeft: '4px solid #3498db' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#3498db', fontWeight: 'bold', mb: 0.5 }}>
                  {stats.totalCategories}
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  Categorías
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ borderLeft: '4px solid #2ecc71' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#2ecc71', fontWeight: 'bold', mb: 0.5 }}>
                  {stats.totalDocuments}
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  Documentos
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ borderLeft: '4px solid #f39c12' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#f39c12', fontWeight: 'bold', mb: 0.5 }}>
                  {stats.requiredDocuments}
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  Obligatorios
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ borderLeft: '4px solid #9b59b6' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#9b59b6', fontWeight: 'bold', mb: 0.5 }}>
                  {stats.optionalDocuments}
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  Opcionales
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ borderLeft: '4px solid #e74c3c' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#e74c3c', fontWeight: 'bold', mb: 0.5 }}>
                  {stats.requiredCategories}
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  Cat. Obligatorias
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ borderLeft: '4px solid #1abc9c' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#1abc9c', fontWeight: 'bold', mb: 0.5 }}>
                  {parseInt(generalConfig.maxExpedienteSize) * stats.totalDocuments}MB
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  Capacidad Total
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Contenido principal */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <Grid container spacing={2} sx={{ flex: 1 }}>
          {/* Columna izquierda - Categorías y documentos */}
          <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Paper elevation={1} sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <Box sx={{ 
                p: 2, 
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                  Estructura del Expediente
                </Typography>
                
                <Stack direction="row" spacing={1}>
                  <Tooltip title="Vista de lista">
                    <IconButton 
                      size="small" 
                      onClick={() => setViewMode('list')}
                      color={viewMode === 'list' ? 'primary' : 'default'}
                    >
                      <ListIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Vista de grid">
                    <IconButton 
                      size="small" 
                      onClick={() => setViewMode('grid')}
                      color={viewMode === 'grid' ? 'primary' : 'default'}
                    >
                      <GridViewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Ordenar">
                    <IconButton size="small">
                      <SortIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Filtrar">
                    <IconButton size="small">
                      <FilterIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>

              {/* Lista de categorías */}
              <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
                {viewMode === 'list' ? (
                  // Vista de lista
                  categories.sort((a, b) => a.order - b.order).map((category) => (
                    <Accordion 
                      key={category.id}
                      expanded={expandedCategory === category.id}
                      onChange={() => handleCategoryExpand(category.id)}
                      sx={{ mb: 2, borderRadius: '8px !important' }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          <Box sx={{ 
                            width: 40, 
                            height: 40, 
                            borderRadius: '8px',
                            bgcolor: `${category.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2
                          }}>
                            <Typography variant="h5" sx={{ color: category.color }}>
                              {category.icon}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                {category.name}
                              </Typography>
                              {category.required && (
                                <Chip 
                                  label="OBLIGATORIO" 
                                  size="small" 
                                  color="error"
                                  sx={{ height: 20, fontSize: '0.65rem' }}
                                />
                              )}
                              <Chip 
                                label={`${category.documents.length} docs`}
                                size="small"
                                variant="outlined"
                                sx={{ height: 20, fontSize: '0.65rem' }}
                              />
                            </Box>
                            <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                              {category.description}
                            </Typography>
                          </Box>
                          
                          <Stack direction="row" spacing={0.5}>
                            <Tooltip title="Editar categoría">
                              <IconButton 
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditCategory(category);
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar categoría">
                              <IconButton 
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteCategory(category.id);
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Box>
                      </AccordionSummary>
                      
                      <AccordionDetails>
                        <Box sx={{ pl: 6 }}>
                          {/* Lista de documentos */}
                          <List sx={{ p: 0 }}>
                            {category.documents.sort((a, b) => a.order - b.order).map((document) => (
                              <ListItem 
                                key={document.id}
                                sx={{ 
                                  p: 1.5,
                                  mb: 1,
                                  borderRadius: '6px',
                                  bgcolor: '#f8f9fa',
                                  borderLeft: `3px solid ${document.required ? '#e74c3c' : '#7f8c8d'}`
                                }}
                              >
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                  <DragIndicatorIcon sx={{ color: '#7f8c8d' }} />
                                </ListItemIcon>
                                
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                  <DescriptionIcon sx={{ color: document.required ? '#e74c3c' : '#7f8c8d' }} />
                                </ListItemIcon>
                                
                                <Box sx={{ flex: 1 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                      {document.name}
                                    </Typography>
                                    {document.required ? (
                                      <Chip 
                                        label="OBLIGATORIO" 
                                        size="small" 
                                        color="error"
                                        sx={{ height: 18, fontSize: '0.6rem' }}
                                      />
                                    ) : (
                                      <Chip 
                                        label="OPCIONAL" 
                                        size="small" 
                                        color="default"
                                        sx={{ height: 18, fontSize: '0.6rem' }}
                                      />
                                    )}
                                    {document.tags.map((tag, idx) => (
                                      <Chip 
                                        key={idx}
                                        label={tag}
                                        size="small"
                                        variant="outlined"
                                        sx={{ height: 18, fontSize: '0.6rem' }}
                                      />
                                    ))}
                                  </Box>
                                  
                                  <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', mb: 1 }}>
                                    {document.description}
                                  </Typography>
                                  
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                      <strong>Formato:</strong> {document.format}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                      <strong>Máx:</strong> {document.maxSize}
                                    </Typography>
                                    {document.validation && (
                                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                        <strong>Validación:</strong> {document.validation}
                                      </Typography>
                                    )}
                                  </Box>
                                </Box>
                                
                                <ListItemSecondaryAction>
                                  <Stack direction="row" spacing={0.5}>
                                    <Tooltip title={document.required ? "Marcar como opcional" : "Marcar como obligatorio"}>
                                      <FormControlLabel
                                        control={
                                          <Switch
                                            size="small"
                                            checked={document.required}
                                            onChange={() => handleToggleRequired(category.id, document.id)}
                                            color="primary"
                                          />
                                        }
                                        label=""
                                      />
                                    </Tooltip>
                                    <Tooltip title="Editar documento">
                                      <IconButton 
                                        size="small"
                                        onClick={() => handleEditDocument(category, document)}
                                      >
                                        <EditIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar documento">
                                      <IconButton 
                                        size="small"
                                        onClick={() => handleDeleteDocument(category.id, document.id)}
                                      >
                                        <DeleteIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </Stack>
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
                            Agregar Documento a esta Categoría
                          </Button>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  ))
                ) : (
                  // Vista de grid
                  <Grid container spacing={2}>
                    {categories.sort((a, b) => a.order - b.order).map((category) => (
                      <Grid item xs={12} md={6} key={category.id}>
                        <Card sx={{ height: '100%' }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ 
                                  width: 48, 
                                  height: 48, 
                                  borderRadius: '8px',
                                  bgcolor: `${category.color}20`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  <Typography variant="h4" sx={{ color: category.color }}>
                                    {category.icon}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                    {category.name}
                                  </Typography>
                                  <Chip 
                                    label={category.required ? "OBLIGATORIO" : "OPCIONAL"}
                                    size="small"
                                    color={category.required ? "error" : "default"}
                                    sx={{ height: 20, fontSize: '0.65rem' }}
                                  />
                                </Box>
                              </Box>
                              
                              <Stack direction="row" spacing={0.5}>
                                <IconButton size="small">
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Stack>
                            </Box>
                            
                            <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 2 }}>
                              {category.description}
                            </Typography>
                            
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', mb: 1 }}>
                                Documentos ({category.documents.length}):
                              </Typography>
                              <Stack spacing={1}>
                                {category.documents.slice(0, 3).map((doc) => (
                                  <Box 
                                    key={doc.id}
                                    sx={{ 
                                      p: 1,
                                      borderRadius: '4px',
                                      bgcolor: '#f8f9fa',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between'
                                    }}
                                  >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <DescriptionIcon sx={{ fontSize: 16, color: doc.required ? '#e74c3c' : '#7f8c8d' }} />
                                      <Typography variant="caption" sx={{ color: '#2c3e50' }}>
                                        {doc.name}
                                      </Typography>
                                    </Box>
                                    <Chip 
                                      label={doc.required ? "Req" : "Opc"}
                                      size="small"
                                      sx={{ 
                                        height: 16,
                                        fontSize: '0.6rem',
                                        bgcolor: doc.required ? '#ffebee' : '#f5f5f5'
                                      }}
                                    />
                                  </Box>
                                ))}
                              </Stack>
                            </Box>
                            
                            <Button
                              fullWidth
                              size="small"
                              variant="outlined"
                              onClick={() => handleCategoryExpand(category.id)}
                            >
                              Ver todos los documentos
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Columna derecha - Configuración general */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Paper elevation={1} sx={{ p: 2, mb: 2, flex: 1 }}>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                Configuración General
              </Typography>

              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                    Tamaño Máximo por Expediente
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={generalConfig.maxExpedienteSize}
                    onChange={handleGeneralConfigChange('maxExpedienteSize')}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">MB</InputAdornment>,
                    }}
                  />
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                    Días para Completar Expediente
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={generalConfig.daysToComplete}
                    onChange={handleGeneralConfigChange('daysToComplete')}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">días</InputAdornment>,
                    }}
                  />
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                    Revisión Periódica
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={generalConfig.periodicReview}
                    onChange={handleGeneralConfigChange('periodicReview')}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">días</InputAdornment>,
                    }}
                  />
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                    Formato Principal
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    select
                    value={generalConfig.mainFormat}
                    onChange={handleGeneralConfigChange('mainFormat')}
                  >
                    <MenuItem value="PDF">PDF</MenuItem>
                    <MenuItem value="JPG">JPG/PNG</MenuItem>
                    <MenuItem value="AMBOS">Ambos</MenuItem>
                    <MenuItem value="MULTI">Múltiples formatos</MenuItem>
                  </TextField>
                </Box>
                
                <Divider />
                
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 2 }}>
                    Opciones Avanzadas
                  </Typography>
                  
                  <Stack spacing={1.5}>
                    <FormControlLabel
                      control={
                        <Switch
                          size="small"
                          checked={generalConfig.autoValidation}
                          onChange={handleGeneralConfigChange('autoValidation')}
                        />
                      }
                      label="Validación Automática"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          size="small"
                          checked={generalConfig.versionControl}
                          onChange={handleGeneralConfigChange('versionControl')}
                        />
                      }
                      label="Control de Versiones"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          size="small"
                          checked={generalConfig.requireDigitalSignature}
                          onChange={handleGeneralConfigChange('requireDigitalSignature')}
                        />
                      }
                      label="Firma Digital Requerida"
                    />
                  </Stack>
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                    Retención de Documentos
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={generalConfig.retentionYears}
                    onChange={handleGeneralConfigChange('retentionYears')}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">años</InputAdornment>,
                    }}
                  />
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                    Máx. Documentos por Expediente
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={generalConfig.maxDocumentsPerExpediente}
                    onChange={handleGeneralConfigChange('maxDocumentsPerExpediente')}
                  />
                </Box>
              </Stack>
              
              <Button
                fullWidth
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{ mt: 3 }}
              >
                Guardar Configuración
              </Button>
            </Paper>

            {/* Resumen */}
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
                Resumen del Expediente
              </Typography>
              
              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                    Categorías configuradas:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    {stats.totalCategories}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                    Documentos totales:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    {stats.totalDocuments}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                    Documentos obligatorios:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    {stats.requiredDocuments}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                    Tamaño máximo:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    {generalConfig.maxExpedienteSize} MB
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                    Tiempo para completar:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    {generalConfig.daysToComplete} días
                  </Typography>
                </Box>
              </Stack>
              
              <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f8f9fa', borderRadius: '6px' }}>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  <strong>Nota:</strong> Los cambios se aplican a todos los nuevos expedientes. Los expedientes existentes mantienen su configuración original.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Diálogo de edición */}
      <Dialog 
        open={editDialog} 
        onClose={() => setEditDialog(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: '12px' }
        }}
      >
        <DialogTitle>
          {editMode === 'category' ? 
            (currentCategory?.id > 100 ? 'Nueva Categoría' : 'Editar Categoría') : 
            (currentDocument?.id > 1000 ? 'Nuevo Documento' : 'Editar Documento')}
        </DialogTitle>
        
        <DialogContent>
          {editMode === 'category' ? (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Nombre de la Categoría"
                value={currentCategory?.name || ''}
                onChange={(e) => setCurrentCategory({...currentCategory, name: e.target.value})}
              />
              
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={2}
                value={currentCategory?.description || ''}
                onChange={(e) => setCurrentCategory({...currentCategory, description: e.target.value})}
              />
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Ícono"
                  value={currentCategory?.icon || ''}
                  onChange={(e) => setCurrentCategory({...currentCategory, icon: e.target.value})}
                  helperText="Emoji o código"
                />
                
                <TextField
                  fullWidth
                  type="color"
                  label="Color"
                  value={currentCategory?.color || '#7f8c8d'}
                  onChange={(e) => setCurrentCategory({...currentCategory, color: e.target.value})}
                />
              </Box>
              
              <TextField
                fullWidth
                label="Orden"
                type="number"
                value={currentCategory?.order || 1}
                onChange={(e) => setCurrentCategory({...currentCategory, order: parseInt(e.target.value)})}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={currentCategory?.required || false}
                    onChange={(e) => setCurrentCategory({...currentCategory, required: e.target.checked})}
                  />
                }
                label="Categoría Obligatoria"
              />
            </Stack>
          ) : (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Nombre del Documento"
                value={currentDocument?.name || ''}
                onChange={(e) => setCurrentDocument({...currentDocument, name: e.target.value})}
              />
              
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={2}
                value={currentDocument?.description || ''}
                onChange={(e) => setCurrentDocument({...currentDocument, description: e.target.value})}
              />
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  select
                  label="Formato"
                  value={currentDocument?.format || 'PDF'}
                  onChange={(e) => setCurrentDocument({...currentDocument, format: e.target.value})}
                >
                  {formatOptions.map(format => (
                    <MenuItem key={format} value={format}>{format}</MenuItem>
                  ))}
                </TextField>
                
                <TextField
                  fullWidth
                  select
                  label="Tamaño Máximo"
                  value={currentDocument?.maxSize || '5MB'}
                  onChange={(e) => setCurrentDocument({...currentDocument, maxSize: e.target.value})}
                >
                  {sizeOptions.map(size => (
                    <MenuItem key={size} value={size}>{size}</MenuItem>
                  ))}
                </TextField>
              </Box>
              
              <TextField
                fullWidth
                label="Validación Requerida"
                value={currentDocument?.validation || ''}
                onChange={(e) => setCurrentDocument({...currentDocument, validation: e.target.value})}
                helperText="Ej: OCR, Vigencia, Firma, etc."
              />
              
              <TextField
                fullWidth
                label="Etiquetas"
                value={currentDocument?.tags?.join(', ') || ''}
                onChange={(e) => setCurrentDocument({...currentDocument, tags: e.target.value.split(', ')})}
                helperText="Separar por comas"
              />
              
              <TextField
                fullWidth
                label="Orden"
                type="number"
                value={currentDocument?.order || 1}
                onChange={(e) => setCurrentDocument({...currentDocument, order: parseInt(e.target.value)})}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={currentDocument?.required || false}
                    onChange={(e) => setCurrentDocument({...currentDocument, required: e.target.checked})}
                  />
                }
                label="Documento Obligatorio"
              />
            </Stack>
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