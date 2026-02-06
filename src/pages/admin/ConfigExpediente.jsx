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
  Fab,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemButton
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
  Timer as TimerIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  AdminPanelSettings as AdminPanelSettingsIcon
} from '@mui/icons-material';

const ConfigExpediente = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'DOCUMENTACIÓN PERSONAL',
      description: 'Documentos de identificación y datos personales del solicitante',
      required: true,
      icon: '👤',
      color: '#3498db',
      assignedRoles: ['AGENTE_ADUANAL'], // MODIFICADO: Solo para agentes
      documents: [
        { 
          id: 101, 
          name: 'Identificación Oficial', 
          description: 'INE, Pasaporte o Cédula profesional vigente', 
          required: true, 
          format: 'PDF/JPG/PNG', 
          maxSize: '5MB',
          validation: 'OCR y validez',
          tags: ['obligatorio', 'identificación'],
          order: 1,
          periodicReview: '365',
          committeeReview: false,
          reviewDescription: 'Revisión anual por renovación'
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
          order: 2,
          periodicReview: '90',
          committeeReview: false,
          reviewDescription: 'Revisión trimestral'
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
          order: 3,
          periodicReview: '0',
          committeeReview: true,
          reviewDescription: 'No requiere revisión periódica'
        },
        { 
          id: 104, 
          name: 'CURP', 
          description: 'Clave Única de Registro de Población', 
          required: true, 
          format: 'PDF', 
          maxSize: '5MB',
          validation: 'Vigencia y datos',
          tags: ['obligatorio', 'identificación'],
          order: 4,
          periodicReview: '0',
          committeeReview: false,
          reviewDescription: 'Documento permanente'
        },
      ],
      order: 1
    },
    {
      id: 2,
      name: 'CERTIFICACIONES PROFESIONALES',
      description: 'Certificaciones y credenciales profesionales requeridas',
      required: true,
      icon: '🎓',
      color: '#2ecc71',
      assignedRoles: ['AGENTE_ADUANAL'],
      documents: [
        { 
          id: 201, 
          name: 'Patente Aduanal', 
          description: 'Patente vigente y legible', 
          required: true, 
          format: 'PDF', 
          maxSize: '10MB',
          validation: 'Vigencia y registro',
          tags: ['obligatorio', 'profesional', 'agente'],
          order: 1,
          periodicReview: '365',
          committeeReview: true,
          reviewDescription: 'Renovación anual obligatoria'
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
          order: 2,
          periodicReview: '730',
          committeeReview: false,
          reviewDescription: 'Revisión bianual'
        },
      ],
      order: 2
    },
    {
      id: 3,
      name: 'DOCUMENTACIÓN LEGAL',
      description: 'Documentos legales y poderes notariales',
      required: false,
      icon: '⚖️',
      color: '#9b59b6',
      assignedRoles: ['ASOCIACION_ADUANAL'],
      documents: [
        { 
          id: 301, 
          name: 'Acta Constitutiva', 
          description: 'Documento legal de constitución (solo para asociaciones)', 
          required: true, 
          format: 'PDF', 
          maxSize: '15MB',
          validation: 'Firma y registro notarial',
          tags: ['legal', 'asociación'],
          order: 1,
          periodicReview: '0',
          committeeReview: true,
          reviewDescription: 'Documento permanente - revisión inicial'
        },
        { 
          id: 302, 
          name: 'RFC de la Asociación', 
          description: 'Registro Federal de Contribuyentes', 
          required: true, 
          format: 'PDF', 
          maxSize: '5MB',
          validation: 'Vigencia y datos',
          tags: ['obligatorio', 'fiscal', 'asociación'],
          order: 2,
          periodicReview: '365',
          committeeReview: false,
          reviewDescription: 'Revisión anual por cambios fiscales'
        },
      ],
      order: 3
    },
    {
      id: 4,
      name: 'DOCUMENTACIÓN OPERATIVA',
      description: 'Documentos relacionados con operaciones aduanales',
      required: true,
      icon: '📊',
      color: '#f39c12',
      assignedRoles: ['AGENTE_ADUANAL', 'ASOCIACION_ADUANAL'],
      documents: [
        { 
          id: 401, 
          name: 'Política de Cumplimiento', 
          description: 'Política interna de cumplimiento normativo', 
          required: true, 
          format: 'PDF', 
          maxSize: '10MB',
          validation: 'Firmas y vigencia',
          tags: ['obligatorio', 'operativo'],
          order: 1,
          periodicReview: '180',
          committeeReview: true,
          reviewDescription: 'Revisión semestral por cambios normativos'
        },
        { 
          id: 402, 
          name: 'Seguro de Responsabilidad Civil', 
          description: 'Póliza vigente de responsabilidad civil', 
          required: true, 
          format: 'PDF', 
          maxSize: '10MB',
          validation: 'Vigencia y cobertura',
          tags: ['obligatorio', 'seguro'],
          order: 2,
          periodicReview: '365',
          committeeReview: false,
          reviewDescription: 'Renovación anual'
        },
      ],
      order: 4
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
    mainFormat: 'PDF',
    autoValidation: true,
    versionControl: true,
    requireDigitalSignature: false,
    retentionYears: '5',
    maxDocumentsPerExpediente: '50'
  });

  const availableRoles = [
    { value: 'AGENTE_ADUANAL', label: 'Agente Aduanal', icon: <PersonIcon fontSize="small" /> },
    { value: 'ASOCIACION_ADUANAL', label: 'Asociación Aduanal', icon: <BusinessIcon fontSize="small" /> }
  ];

  const stats = {
    totalCategories: categories.length,
    totalDocuments: categories.reduce((total, cat) => total + cat.documents.length, 0),
    requiredDocuments: categories.reduce((total, cat) => 
      total + cat.documents.filter(doc => doc.required).length, 0),
    optionalDocuments: categories.reduce((total, cat) => 
      total + cat.documents.filter(doc => !doc.required).length, 0),
    requiredCategories: categories.filter(cat => cat.required).length,
    committeeReviewDocuments: categories.reduce((total, cat) => 
      total + cat.documents.filter(doc => doc.committeeReview).length, 0),
    agentCategories: categories.filter(cat => cat.assignedRoles.includes('AGENTE_ADUANAL')).length,
    associationCategories: categories.filter(cat => cat.assignedRoles.includes('ASOCIACION_ADUANAL')).length,
    sharedCategories: categories.filter(cat => 
      cat.assignedRoles.includes('AGENTE_ADUANAL') && cat.assignedRoles.includes('ASOCIACION_ADUANAL')
    ).length,
    exclusiveAgentCategories: categories.filter(cat => 
      cat.assignedRoles.length === 1 && cat.assignedRoles.includes('AGENTE_ADUANAL')
    ).length,
    exclusiveAssociationCategories: categories.filter(cat => 
      cat.assignedRoles.length === 1 && cat.assignedRoles.includes('ASOCIACION_ADUANAL')
    ).length
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
      assignedRoles: ['AGENTE_ADUANAL'],
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
      order: category.documents.length + 1,
      periodicReview: '0',
      committeeReview: false,
      reviewDescription: ''
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
      if (currentCategory.id > 100) {
        setCategories([...categories, currentCategory]);
      } else {
        setCategories(categories.map(c => 
          c.id === currentCategory.id ? currentCategory : c
        ));
      }
    } else {
      setCategories(categories.map(category => {
        if (category.id === currentCategory.id) {
          const existingDocIndex = category.documents.findIndex(d => d.id === currentDocument.id);
          if (existingDocIndex >= 0) {
            const updatedDocuments = [...category.documents];
            updatedDocuments[existingDocIndex] = currentDocument;
            return { ...category, documents: updatedDocuments };
          } else {
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
  const tagOptions = ['obligatorio', 'identificación', 'fiscal', 'legal', 'profesional', 'domicilio', 'poder', 'opcional', 'agente', 'asociación', 'pago', 'seguro', 'operativo'];

  const panelTabs = [
    { label: 'Resumen', icon: <DescriptionIcon /> },
    { label: 'Configuración', icon: <SettingsIcon /> },
  ];

  const getRoleIcon = (role) => {
    switch(role) {
      case 'AGENTE_ADUANAL': return <PersonIcon fontSize="small" />;
      case 'ASOCIACION_ADUANAL': return <BusinessIcon fontSize="small" />;
      default: return <GroupIcon fontSize="small" />;
    }
  };

  const getAssignedRolesLabel = (roles) => {
    if (roles.length === 2) return 'Ambos';
    if (roles.includes('AGENTE_ADUANAL')) return 'Solo Agentes';
    if (roles.includes('ASOCIACION_ADUANAL')) return 'Solo Asociaciones';
    return 'No asignado';
  };

  const getReviewDescription = (document) => {
    if (parseInt(document.periodicReview) === 0) return 'No requiere revisión periódica';
    const days = parseInt(document.periodicReview);
    if (days === 30) return 'Revisión mensual';
    if (days === 60) return 'Revisión bimestral';
    if (days === 90) return 'Revisión trimestral';
    if (days === 180) return 'Revisión semestral';
    if (days === 365) return 'Revisión anual';
    if (days === 730) return 'Revisión bianual';
    return `Revisión cada ${document.periodicReview} días`;
  };

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
              Panel de administración - Asigne categorías y documentos a cada tipo de usuario
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Chip
                icon={<AdminPanelSettingsIcon />}
                label="Panel de Administración"
                size="small"
                sx={{ 
                  bgcolor: '#2c3e50',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
              <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                Puede asignar categorías a Agentes Aduanales o Asociaciones Aduanales
              </Typography>
            </Box>
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
              Panel de Resumen
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

        {/* 6 CARDS CON ESTADÍSTICAS */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 2,
          mb: 3,
          width: '100%',
          '@media (max-width: 1200px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
          '@media (max-width: 768px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@media (max-width: 480px)': {
            gridTemplateColumns: '1fr',
          }
        }}>
          {/* Card 1: Categorías Totales */}
          <Card sx={{
            borderLeft: '4px solid #2c3e50',
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
                  <Box sx={{ color: '#2c3e50' }}>
                    <FolderIcon />
                  </Box>
                  <Typography variant="body2" sx={{
                    color: '#7f8c8d',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}>
                    Categorías Totales
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

          {/* Card 2: Para Agentes Exclusivos */}
          <Card sx={{
            borderLeft: '4px solid #3498db',
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
                  <Box sx={{ color: '#3498db' }}>
                    <PersonIcon />
                  </Box>
                  <Typography variant="body2" sx={{
                    color: '#7f8c8d',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}>
                    Exclusivo Agentes
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{
                  color: '#2c3e50',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                  textAlign: 'right'
                }}>
                  {stats.exclusiveAgentCategories}
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
                  Solo para Agentes Aduanales
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Card 3: Para Asociaciones Exclusivas */}
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
                    <BusinessIcon />
                  </Box>
                  <Typography variant="body2" sx={{
                    color: '#7f8c8d',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}>
                    Exclusivo Asociaciones
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{
                  color: '#2c3e50',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                  textAlign: 'right'
                }}>
                  {stats.exclusiveAssociationCategories}
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
                  Solo para Asociaciones
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Card 4: Compartidas */}
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
                    <GroupIcon />
                  </Box>
                  <Typography variant="body2" sx={{
                    color: '#7f8c8d',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}>
                    Compartidas
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{
                  color: '#2c3e50',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                  textAlign: 'right'
                }}>
                  {stats.sharedCategories}
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
                  Para ambos tipos de usuarios
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Card 5: Documentos Totales */}
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
                    Documentos Totales
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

          {/* Card 6: Rev. Comité */}
          <Card sx={{
            borderLeft: '4px solid #d35400',
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
                  <Box sx={{ color: '#d35400' }}>
                    <PeopleIcon />
                  </Box>
                  <Typography variant="body2" sx={{
                    color: '#7f8c8d',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}>
                    Rev. Comité
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{
                  color: '#2c3e50',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                  textAlign: 'right'
                }}>
                  {stats.committeeReviewDocuments}
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
                  {Math.round((stats.committeeReviewDocuments / stats.totalDocuments) * 100)}% del total
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
                  Estructura del Expediente (Vista de Administrador)
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
                            {/* Indicador de roles asignados */}
                            <Chip
                              icon={category.assignedRoles.length === 2 ? <GroupIcon /> : 
                                    category.assignedRoles.includes('AGENTE_ADUANAL') ? <PersonIcon /> : <BusinessIcon />}
                              label={getAssignedRolesLabel(category.assignedRoles)}
                              size="small"
                              sx={{ 
                                height: 20,
                                fontSize: '0.65rem',
                                bgcolor: category.assignedRoles.length === 2 ? '#f39c12' :
                                         category.assignedRoles.includes('AGENTE_ADUANAL') ? '#3498db' : '#9b59b6',
                                color: 'white'
                              }}
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
                        {/* Lista de documentos - VISTA SIMPLIFICADA */}
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
                                  {/* Mostrar icono de revisión por comité */}
                                  {document.committeeReview && (
                                    <Tooltip title="Requiere revisión por comité">
                                      <PeopleIcon sx={{ fontSize: 16, color: '#d35400' }} />
                                    </Tooltip>
                                  )}
                                  {/* Mostrar icono de revisión periódica si es mayor a 0 */}
                                  {parseInt(document.periodicReview) > 0 && (
                                    <Tooltip title={getReviewDescription(document)}>
                                      <TimerIcon sx={{ fontSize: 16, color: '#3498db' }} />
                                    </Tooltip>
                                  )}
                                </Box>
                                
                                <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', mb: 1 }}>
                                  {document.description}
                                </Typography>
                                
                                {/* INFORMACIÓN SIMPLIFICADA - SOLO 2 LÍNEAS */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                    <strong>Formato:</strong> {document.format}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                    <strong>Tamaño:</strong> {document.maxSize}
                                  </Typography>
                                  {parseInt(document.periodicReview) > 0 && (
                                    <Typography variant="caption" sx={{ color: '#3498db' }}>
                                      <strong>Revisión:</strong> {getReviewDescription(document)}
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
              Resumen de Configuración
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
                  Distribución por Tipo de Usuario
                </Typography>

                <Stack spacing={2}>
                  {/* Tarjeta de resumen principal */}
                  <Paper sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: '8px' }}>
                    <Typography variant="body2" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
                      Resumen General
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
                          Rev. por comité:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                          {stats.committeeReviewDocuments}
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

                  {/* Distribución por rol */}
                  <Paper sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: '8px' }}>
                    <Typography variant="body2" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
                      Distribución por Rol Asignado
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Box sx={{ 
                            width: 40, 
                            height: 40, 
                            borderRadius: '50%',
                            bgcolor: '#3498db20',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 8px'
                          }}>
                            <PersonIcon sx={{ color: '#3498db' }} />
                          </Box>
                          <Typography variant="h6" sx={{ color: '#3498db', fontWeight: 'bold' }}>
                            {stats.exclusiveAgentCategories}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            Solo Agentes
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Box sx={{ 
                            width: 40, 
                            height: 40, 
                            borderRadius: '50%',
                            bgcolor: '#9b59b620',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 8px'
                          }}>
                            <BusinessIcon sx={{ color: '#9b59b6' }} />
                          </Box>
                          <Typography variant="h6" sx={{ color: '#9b59b6', fontWeight: 'bold' }}>
                            {stats.exclusiveAssociationCategories}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            Solo Asociaciones
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ mt: 1, textAlign: 'center' }}>
                          <Box sx={{ 
                            width: 40, 
                            height: 40, 
                            borderRadius: '50%',
                            bgcolor: '#f39c1220',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 8px'
                          }}>
                            <GroupIcon sx={{ color: '#f39c12' }} />
                          </Box>
                          <Typography variant="h6" sx={{ color: '#f39c12', fontWeight: 'bold' }}>
                            {stats.sharedCategories}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            Compartidas (ambos)
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Frecuencias de revisión */}
                  <Paper sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: '8px' }}>
                    <Typography variant="body2" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
                      Frecuencias de Revisión
                    </Typography>
                    
                    <Stack spacing={1.5}>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            Sin revisión periódica:
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                            {categories.reduce((total, cat) => total + cat.documents.filter(doc => parseInt(doc.periodicReview) === 0).length, 0)} docs
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={(categories.reduce((total, cat) => total + cat.documents.filter(doc => parseInt(doc.periodicReview) === 0).length, 0) / stats.totalDocuments) * 100}
                          sx={{ 
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: '#ecf0f1',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#95a5a6',
                              borderRadius: 3
                            }
                          }}
                        />
                      </Box>
                      
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            Revisión anual (365 días):
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                            {categories.reduce((total, cat) => total + cat.documents.filter(doc => parseInt(doc.periodicReview) === 365).length, 0)} docs
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={(categories.reduce((total, cat) => total + cat.documents.filter(doc => parseInt(doc.periodicReview) === 365).length, 0) / stats.totalDocuments) * 100}
                          sx={{ 
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: '#ecf0f1',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#3498db',
                              borderRadius: 3
                            }
                          }}
                        />
                      </Box>
                      
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            Revisión semestral (180 días):
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                            {categories.reduce((total, cat) => total + cat.documents.filter(doc => parseInt(doc.periodicReview) === 180).length, 0)} docs
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={(categories.reduce((total, cat) => total + cat.documents.filter(doc => parseInt(doc.periodicReview) === 180).length, 0) / stats.totalDocuments) * 100}
                          sx={{ 
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: '#ecf0f1',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#2ecc71',
                              borderRadius: 3
                            }
                          }}
                        />
                      </Box>
                      
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            Revisión trimestral (90 días):
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                            {categories.reduce((total, cat) => total + cat.documents.filter(doc => parseInt(doc.periodicReview) === 90).length, 0)} docs
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={(categories.reduce((total, cat) => total + cat.documents.filter(doc => parseInt(doc.periodicReview) === 90).length, 0) / stats.totalDocuments) * 100}
                          sx={{ 
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: '#ecf0f1',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#f39c12',
                              borderRadius: 3
                            }
                          }}
                        />
                      </Box>
                    </Stack>
                  </Paper>

                  {/* Nota informativa */}
                  <Box sx={{ p: 1.5, bgcolor: '#d4edda', borderRadius: '6px', border: '1px solid #c3e6cb' }}>
                    <Typography variant="caption" sx={{ color: '#155724' }}>
                      <strong>Nota:</strong> Esta configuración determina qué documentos verán los Agentes Aduanales y Asociaciones Aduanales cuando creen expedientes. Las revisiones periódicas se ajustan según el tipo de documento.
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

      {/* Diálogo de edición - CON ASIGNACIÓN DE ROLES Y REVISIÓN PERIÓDICA COMO INPUT */}
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
                helperText="Ej: Documentación Personal"
              />
              
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={2}
                value={currentCategory?.description || ''}
                onChange={(e) => setCurrentCategory({...currentCategory, description: e.target.value})}
                helperText="Describe el propósito de esta categoría"
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
              
              {/* ASIGNACIÓN DE ROLES - OBLIGATORIO */}
              <FormControl fullWidth>
                <InputLabel>Asignar a tipo de usuario *</InputLabel>
                <Select
                  multiple
                  value={currentCategory?.assignedRoles || ['AGENTE_ADUANAL']}
                  onChange={(e) => setCurrentCategory({...currentCategory, assignedRoles: e.target.value})}
                  input={<OutlinedInput label="Asignar a tipo de usuario *" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value === 'AGENTE_ADUANAL' ? 'Agente Aduanal' : 'Asociación Aduanal'}
                          size="small"
                          icon={getRoleIcon(value)}
                          sx={{ 
                            bgcolor: value === 'AGENTE_ADUANAL' ? '#3498db' : '#9b59b6',
                            color: 'white'
                          }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {availableRoles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      <Checkbox checked={currentCategory?.assignedRoles?.indexOf(role.value) > -1} />
                      <ListItemIcon>
                        {role.icon}
                      </ListItemIcon>
                      <ListItemText primary={role.label} />
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="caption" sx={{ color: '#7f8c8d', mt: 0.5 }}>
                  Seleccione a qué tipo de usuario(es) se mostrarán los documentos de esta categoría
                </Typography>
              </FormControl>
              
              <TextField
                fullWidth
                label="Orden"
                type="number"
                value={currentCategory?.order || 1}
                onChange={(e) => setCurrentCategory({...currentCategory, order: parseInt(e.target.value)})}
                helperText="Número de orden en la lista"
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
              
              {/* REVISIÓN PERIÓDICA - INPUT NORMAL (NO COMBOBOX) */}
              <TextField
                fullWidth
                label="Revisión Periódica"
                value={currentDocument?.periodicReview || ''}
                onChange={(e) => setCurrentDocument({...currentDocument, periodicReview: e.target.value})}
                helperText="Ej: 30 días (mensual), 90 días (trimestral), 180 días (semestral), 365 días (anual), 730 días (bianual)"
                InputProps={{
                  endAdornment: <InputAdornment position="end">días</InputAdornment>,
                }}
              />
              
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
              
              <Stack spacing={1}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentDocument?.required || false}
                      onChange={(e) => setCurrentDocument({...currentDocument, required: e.target.checked})}
                    />
                  }
                  label="Documento Obligatorio"
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentDocument?.committeeReview || false}
                      onChange={(e) => setCurrentDocument({...currentDocument, committeeReview: e.target.checked})}
                      color="warning"
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PeopleIcon fontSize="small" sx={{ color: '#d35400' }} />
                      <Typography variant="body2">
                        Requiere revisión por comité
                      </Typography>
                    </Box>
                  }
                />
              </Stack>
            </Stack>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancelar</Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={editMode === 'category' ? 
              !currentCategory?.name || !currentCategory?.assignedRoles || currentCategory?.assignedRoles.length === 0 : 
              !currentDocument?.name}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConfigExpediente;