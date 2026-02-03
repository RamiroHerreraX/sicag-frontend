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
  LinearProgress,
  Drawer,
  Tabs,
  Tab,
  Fab
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
  List as ListIcon,
  Sort as SortIcon,
  FilterList as FilterIcon,
  People as PeopleIcon,
  ChevronRight as ChevronRightIcon,
  Timer as TimerIcon
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
  const [expandedCategory, setExpandedCategory] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [panelTab, setPanelTab] = useState(0);
  
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

  // Estadísticas - MOVIDAS AL PANEL
  const stats = {
    totalCategories: categories.length,
    totalDocuments: categories.reduce((total, cat) => total + cat.documents.length, 0),
    requiredDocuments: categories.reduce((total, cat) => 
      total + cat.documents.filter(doc => doc.required).length, 0),
    optionalDocuments: categories.reduce((total, cat) => 
      total + cat.documents.filter(doc => !doc.required).length, 0),
    requiredCategories: categories.filter(cat => cat.required).length
  };

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

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const formatOptions = ['PDF', 'JPG', 'PNG', 'DOC', 'DOCX', 'XLS', 'XLSX', 'TXT'];
  const sizeOptions = ['1MB', '5MB', '10MB', '25MB', '50MB', '100MB'];
  const tagOptions = ['obligatorio', 'identificación', 'fiscal', 'legal', 'profesional', 'domicilio', 'poder', 'opcional'];

  const panelTabs = [
    { label: 'Resumen', icon: <DescriptionIcon /> },
    { label: 'Configuración', icon: <SettingsIcon /> },
  ];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f7fa' }}>
      {/* Header */}
      <Box sx={{ mb: 3, p: 2.5 }}>
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
              variant="outlined"
              startIcon={<VisibilityIcon />}
              onClick={toggleDrawer}
            >
              Panel
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

        {/* 6 CARDS CON MISMA ALTURA QUE LAS 4 DEL PRIMER CÓDIGO */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)', // 6 columnas de igual ancho
          gap: 2,
          mb: 3,
          width: '100%',
          '@media (max-width: 1200px)': {
            gridTemplateColumns: 'repeat(3, 1fr)', // 3 columnas en pantallas medianas
          },
          '@media (max-width: 768px)': {
            gridTemplateColumns: 'repeat(2, 1fr)', // 2 columnas en tablets
          },
          '@media (max-width: 480px)': {
            gridTemplateColumns: '1fr', // 1 columna en móviles
          }
        }}>
          {/* Card 1: Categorías */}
          <Card sx={{
            borderLeft: '4px solid #3498db',
            height: 120, // MISMA ALTURA EXACTA que las 4 cards del primer código
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <CardContent sx={{
              p: 1.5,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 1,
                mb: 1
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ color: '#3498db' }}>
                    <FolderIcon />
                  </Box>
                  <Typography variant="body2" sx={{
                    color: '#7f8c8d',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}>
                    Categorías
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{
                  color: '#2c3e50',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                  textAlign: 'right'
                }}>
                  {stats.totalCategories}
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: 0.5
              }}>
                <Typography variant="caption" sx={{
                  color: '#95a5a6',
                  fontSize: '0.7rem',
                  lineHeight: 1.2,
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {stats.requiredCategories} obligatorias
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Card 2: Documentos */}
          <Card sx={{
            borderLeft: '4px solid #2ecc71',
            height: 120,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <CardContent sx={{
              p: 1.5,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 1,
                mb: 1
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ color: '#2ecc71' }}>
                    <DescriptionIcon />
                  </Box>
                  <Typography variant="body2" sx={{
                    color: '#7f8c8d',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}>
                    Documentos
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{
                  color: '#2c3e50',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                  textAlign: 'right'
                }}>
                  {stats.totalDocuments}
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: 0.5
              }}>
                <Typography variant="caption" sx={{
                  color: '#95a5a6',
                  fontSize: '0.7rem',
                  lineHeight: 1.2,
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {stats.requiredDocuments} obligatorios
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Card 3: Obligatorios */}
          <Card sx={{
            borderLeft: '4px solid #f39c12',
            height: 120,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <CardContent sx={{
              p: 1.5,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 1,
                mb: 1
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ color: '#f39c12' }}>
                    <CheckCircleIcon />
                  </Box>
                  <Typography variant="body2" sx={{
                    color: '#7f8c8d',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}>
                    Obligatorios
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{
                  color: '#2c3e50',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                  textAlign: 'right'
                }}>
                  {stats.requiredDocuments}
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: 0.5
              }}>
                <Typography variant="caption" sx={{
                  color: '#95a5a6',
                  fontSize: '0.7rem',
                  lineHeight: 1.2,
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {Math.round((stats.requiredDocuments / stats.totalDocuments) * 100)}% del total
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Card 4: Opcionales */}
          <Card sx={{
            borderLeft: '4px solid #9b59b6',
            height: 120,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <CardContent sx={{
              p: 1.5,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 1,
                mb: 1
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ color: '#9b59b6' }}>
                    <DescriptionIcon />
                  </Box>
                  <Typography variant="body2" sx={{
                    color: '#7f8c8d',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}>
                    Opcionales
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{
                  color: '#2c3e50',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                  textAlign: 'right'
                }}>
                  {stats.optionalDocuments}
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: 0.5
              }}>
                <Typography variant="caption" sx={{
                  color: '#95a5a6',
                  fontSize: '0.7rem',
                  lineHeight: 1.2,
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {Math.round((stats.optionalDocuments / stats.totalDocuments) * 100)}% del total
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Card 5: Cat. Obligatorias */}
          <Card sx={{
            borderLeft: '4px solid #e74c3c',
            height: 120,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <CardContent sx={{
              p: 1.5,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 1,
                mb: 1
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ color: '#e74c3c' }}>
                    <ErrorIcon />
                  </Box>
                  <Typography variant="body2" sx={{
                    color: '#7f8c8d',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}>
                    Cat. Obligatorias
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{
                  color: '#2c3e50',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                  textAlign: 'right'
                }}>
                  {stats.requiredCategories}
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: 0.5
              }}>
                <Typography variant="caption" sx={{
                  color: '#95a5a6',
                  fontSize: '0.7rem',
                  lineHeight: 1.2,
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {Math.round((stats.requiredCategories / stats.totalCategories) * 100)}% del total
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Card 6: Capacidad */}
          <Card sx={{
            borderLeft: '4px solid #1abc9c',
            height: 120,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <CardContent sx={{
              p: 1.5,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 1,
                mb: 1
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ color: '#1abc9c' }}>
                    <CloudUploadIcon />
                  </Box>
                  <Typography variant="body2" sx={{
                    color: '#7f8c8d',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}>
                    Capacidad
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{
                  color: '#2c3e50',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                  textAlign: 'right'
                }}>
                  {parseInt(generalConfig.maxExpedienteSize) * stats.totalDocuments}MB
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: 0.5
              }}>
                <Typography variant="caption" sx={{
                  color: '#95a5a6',
                  fontSize: '0.7rem',
                  lineHeight: 1.2,
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {generalConfig.maxExpedienteSize} MB máximo por documento
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Contenido principal - 2 COLUMNAS CON ANCHO ESPECÍFICO */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: 0, 
        p: 2.5, 
        pt: 0,
        gap: 2
      }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flex: 1,
          minHeight: 0,
          '@media (max-width: 1200px)': {
            flexDirection: 'column',
          }
        }}>
          {/* Columna izquierda - Estructura del Expediente (70%) */}
          <Box sx={{ 
            flex: 7, // 70% del espacio
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            '@media (max-width: 1200px)': {
              flex: '1 1 100%',
            }
          }}>
            <Paper elevation={1} sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              overflow: 'hidden', 
              borderRadius: '8px',
              height: '100%'
            }}>
              <Box sx={{ 
                p: 2, 
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: '#fff'
              }}>
                <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                  Estructura del Expediente
                </Typography>
                
                <Stack direction="row" spacing={1}>
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

              {/* Lista de categorías - SOLO VISTA DE LISTA */}
              <Box sx={{ flex: 1, overflowY: 'auto', p: 2, bgcolor: '#f8f9fa' }}>
                {categories.sort((a, b) => a.order - b.order).map((category) => (
                  <Accordion 
                    key={category.id}
                    expanded={expandedCategory === category.id}
                    onChange={() => handleCategoryExpand(category.id)}
                    sx={{ mb: 2, borderRadius: '8px !important', overflow: 'hidden' }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fff' }}>
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
                    
                    <AccordionDetails sx={{ bgcolor: '#fff' }}>
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
                ))}
              </Box>
            </Paper>
          </Box>

          {/* Columna derecha - Configuración General (30%) - MISMA ALTURA QUE LA OTRA CARD */}
          <Box sx={{ 
            flex: 3, // 30% del espacio
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            '@media (max-width: 1200px)': {
              flex: '1 1 100%',
            }
          }}>
            <Paper elevation={1} sx={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '8px',
              height: '100%',
              overflow: 'hidden'
            }}>
              <CardContent sx={{ 
                p: 2, 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                  Configuración General
                </Typography>

                <Stack spacing={3} sx={{ flex: 1, overflow: 'hidden' }}>
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
                  
                  <Box sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
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
                    
                    <Box sx={{ mt: 3 }}>
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
                    
                    <Box sx={{ mt: 2 }}>
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
              </CardContent>
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* Panel flotante (Drawer) CON RESUMEN DEL EXPEDIENTE */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        variant="persistent"
        PaperProps={{
          sx: {
            width: 380,
            maxWidth: '90vw',
            marginTop: '64px',
            height: 'calc(100vh - 64px)',
            borderLeft: '1px solid #e0e0e0',
            boxShadow: '0px 0px 20px rgba(0,0,0,0.1)',
            borderRadius: '8px 0 0 8px',
            backgroundColor: '#fff'
          }
        }}
      >
        <Box sx={{
          p: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header del panel */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            pb: 2,
            borderBottom: '1px solid #e0e0e0'
          }}>
            <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
              Resumen del Expediente
            </Typography>
            <IconButton
              size="small"
              onClick={toggleDrawer}
              sx={{
                color: '#7f8c8d',
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>

          {/* Tabs del panel */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs
              value={panelTab}
              onChange={(e, newValue) => setPanelTab(newValue)}
              variant="fullWidth"
              sx={{ minHeight: 40 }}
            >
              {panelTabs.map((tab, index) => (
                <Tab
                  key={index}
                  icon={tab.icon}
                  iconPosition="start"
                  label={tab.label}
                  sx={{
                    minHeight: 40,
                    fontSize: '0.75rem',
                    textTransform: 'none'
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* Contenido del panel */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            overflowY: 'auto'
          }}>
            {panelTab === 0 && (
              /* Resumen del Expediente */
              <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
                  Información General
                </Typography>

                <Stack spacing={2}>
                  {/* Tarjeta de resumen principal */}
                  <Paper sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: '8px' }}>
                    <Typography variant="body2" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
                      Configuración Actual
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
                  </Paper>

                  {/* Distribución de documentos */}
                  <Paper sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: '8px' }}>
                    <Typography variant="body2" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
                      Distribución de Documentos
                    </Typography>
                    
                    <Stack spacing={1.5}>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            Obligatorios
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                            {stats.requiredDocuments} ({Math.round((stats.requiredDocuments / stats.totalDocuments) * 100)}%)
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={(stats.requiredDocuments / stats.totalDocuments) * 100}
                          sx={{ 
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: '#ecf0f1',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#e74c3c',
                              borderRadius: 3
                            }
                          }}
                        />
                      </Box>
                      
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            Opcionales
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                            {stats.optionalDocuments} ({Math.round((stats.optionalDocuments / stats.totalDocuments) * 100)}%)
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={(stats.optionalDocuments / stats.totalDocuments) * 100}
                          sx={{ 
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: '#ecf0f1',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#9b59b6',
                              borderRadius: 3
                            }
                          }}
                        />
                      </Box>
                    </Stack>
                  </Paper>

                  {/* Tamaños y formatos */}
                  <Paper sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: '8px' }}>
                    <Typography variant="body2" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
                      Tamaños y Formatos
                    </Typography>
                    
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 1 }}>
                          <Typography variant="h6" sx={{ color: '#3498db', fontWeight: 'bold' }}>
                            {generalConfig.maxExpedienteSize} MB
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            Máx por documento
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 1 }}>
                          <Typography variant="h6" sx={{ color: '#2ecc71', fontWeight: 'bold' }}>
                            {parseInt(generalConfig.maxExpedienteSize) * stats.totalDocuments} MB
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            Capacidad total
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ mt: 1, p: 1.5, bgcolor: '#fff', borderRadius: '6px' }}>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            <strong>Formato principal:</strong> {generalConfig.mainFormat}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Nota informativa */}
                  <Box sx={{ p: 1.5, bgcolor: '#fff3cd', borderRadius: '6px', border: '1px solid #ffeaa7' }}>
                    <Typography variant="caption" sx={{ color: '#856404' }}>
                      <strong>Nota:</strong> Los cambios se aplican a todos los nuevos expedientes. Los expedientes existentes mantienen su configuración original.
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            )}

            {panelTab === 1 && (
              /* Configuración Avanzada */
              <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
                  Configuración Avanzada
                </Typography>

                <Stack spacing={2}>
                  <Paper sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: '8px' }}>
                    <Typography variant="body2" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
                      Estado del Sistema
                    </Typography>
                    
                    <Stack spacing={1.5}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {generalConfig.autoValidation ? (
                            <CheckCircleIcon sx={{ color: '#27ae60', fontSize: 16 }} />
                          ) : (
                            <ErrorIcon sx={{ color: '#e74c3c', fontSize: 16 }} />
                          )}
                          <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                            Validación Automática
                          </Typography>
                        </Box>
                        <Chip 
                          label={generalConfig.autoValidation ? "ACTIVADO" : "DESACTIVADO"}
                          size="small"
                          color={generalConfig.autoValidation ? "success" : "error"}
                          sx={{ fontSize: '0.65rem', height: 22 }}
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {generalConfig.versionControl ? (
                            <CheckCircleIcon sx={{ color: '#27ae60', fontSize: 16 }} />
                          ) : (
                            <ErrorIcon sx={{ color: '#e74c3c', fontSize: 16 }} />
                          )}
                          <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                            Control de Versiones
                          </Typography>
                        </Box>
                        <Chip 
                          label={generalConfig.versionControl ? "ACTIVADO" : "DESACTIVADO"}
                          size="small"
                          color={generalConfig.versionControl ? "success" : "error"}
                          sx={{ fontSize: '0.65rem', height: 22 }}
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {generalConfig.requireDigitalSignature ? (
                            <LockIcon sx={{ color: '#3498db', fontSize: 16 }} />
                          ) : (
                            <PublicIcon sx={{ color: '#7f8c8d', fontSize: 16 }} />
                          )}
                          <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                            Firma Digital
                          </Typography>
                        </Box>
                        <Chip 
                          label={generalConfig.requireDigitalSignature ? "REQUERIDA" : "NO REQUERIDA"}
                          size="small"
                          color={generalConfig.requireDigitalSignature ? "primary" : "default"}
                          sx={{ fontSize: '0.65rem', height: 22 }}
                        />
                      </Box>
                    </Stack>
                  </Paper>

                  <Paper sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: '8px' }}>
                    <Typography variant="body2" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
                      Tiempos y Retención
                    </Typography>
                    
                    <Stack spacing={1.5}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Revisión periódica:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                          {generalConfig.periodicReview} días
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Retención:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                          {generalConfig.retentionYears} años
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Máx. documentos:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                          {generalConfig.maxDocumentsPerExpediente}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Stack>
              </Box>
            )}
          </Box>

          {/* Footer del panel */}
          <Box sx={{
            pt: 2,
            mt: 2,
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ChevronRightIcon />}
              onClick={toggleDrawer}
              fullWidth
              sx={{
                color: '#3498db',
                borderColor: '#3498db'
              }}
            >
              Cerrar Panel
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Botón flotante para abrir panel */}
      {!drawerOpen && (
        <Fab
          color="default"
          aria-label="ver panel"
          onClick={toggleDrawer}
          sx={{
            position: 'fixed',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1000,
            boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            color: '#7f8c8d',
            border: '1px solid #e0e0e0',
            opacity: 0.8,
            '&:hover': {
              bgcolor: 'rgba(248, 249, 250, 0.95)',
              opacity: 1,
              boxShadow: '0px 4px 12px rgba(0,0,0,0.15)'
            },
            transition: 'all 0.2s ease-in-out'
          }}
          size="small"
        >
          <VisibilityIcon sx={{ fontSize: 18 }} />
        </Fab>
      )}

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