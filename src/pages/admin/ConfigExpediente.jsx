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
  Tabs,
  Tab,
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

// Paleta corporativa
const colors = {
  primary: {
    dark: '#0D2A4D',
    main: '#133B6B',
    light: '#3A6EA5'
  },
  secondary: {
    main: '#00A8A8',
    light: '#00C2D1',
    lighter: '#35D0FF'
  },
  accents: {
    blue: '#0099FF',
    purple: '#6C5CE7'
  },
  status: {
    success: '#00A8A8',
    warning: '#00C2D1',
    error: '#0099FF',
    info: '#3A6EA5'
  },
  text: {
    primary: '#0D2A4D',
    secondary: '#3A6EA5',
    light: '#6C5CE7'
  }
};

const ConfigExpediente = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'DOCUMENTACIÓN PERSONAL',
      description: 'Documentos de identificación y datos personales del solicitante',
      required: true,
      icon: '👤',
      color: colors.primary.main,
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
      color: colors.secondary.main,
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
      color: colors.accents.purple,
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
      color: colors.accents.blue,
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
      color: colors.text.secondary,
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
            <Typography variant="h5" sx={{ color: colors.primary.dark, fontWeight: 'bold', mb: 0.5 }}>
              Configuración de Expedientes
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              Panel de administración - Asigne categorías y documentos a cada tipo de usuario
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Chip
                icon={<AdminPanelSettingsIcon />}
                label="Panel de Administración"
                size="small"
                sx={{ 
                  bgcolor: colors.primary.dark,
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
              <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                Puede asignar categorías a Agentes Aduanales o Asociaciones Aduanales
              </Typography>
            </Box>
          </Box>
          
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddCategory}
              sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
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
            borderLeft: `4px solid ${colors.primary.dark}`,
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
                  <Box sx={{ color: colors.primary.dark }}>
                    <FolderIcon />
                  </Box>
                  <Typography variant="body2" sx={{
                    color: colors.text.secondary,
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}>
                    Categorías Totales
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{
                  color: colors.primary.dark,
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
            borderLeft: `4px solid ${colors.primary.main}`,
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
                  <Box sx={{ color: colors.primary.main }}>
                    <PersonIcon />
                  </Box>
                  <Typography variant="body2" sx={{
                    color: colors.text.secondary,
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}>
                    Exclusivo Agentes
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{
                  color: colors.primary.dark,
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
            borderLeft: `4px solid ${colors.accents.purple}`,
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
                  <Box sx={{ color: colors.accents.purple }}>
                    <BusinessIcon />
                  </Box>
                  <Typography variant="body2" sx={{
                    color: colors.text.secondary,
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}>
                    Exclusivo Asociaciones
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{
                  color: colors.primary.dark,
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
            borderLeft: `4px solid ${colors.accents.blue}`,
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
                  <Box sx={{ color: colors.accents.blue }}>
                    <GroupIcon />
                  </Box>
                  <Typography variant="body2" sx={{
                    color: colors.text.secondary,
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}>
                    Compartidas
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{
                  color: colors.primary.dark,
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
            borderLeft: `4px solid ${colors.secondary.main}`,
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
                  <Box sx={{ color: colors.secondary.main }}>
                    <DescriptionIcon />
                  </Box>
                  <Typography variant="body2" sx={{
                    color: colors.text.secondary,
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}>
                    Documentos Totales
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{
                  color: colors.primary.dark,
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
            borderLeft: `4px solid ${colors.primary.dark}`,
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
                  <Box sx={{ color: colors.primary.dark }}>
                    <PeopleIcon />
                  </Box>
                  <Typography variant="body2" sx={{
                    color: colors.text.secondary,
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}>
                    Rev. Comité
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{
                  color: colors.primary.dark,
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
                borderBottom: `1px solid ${colors.primary.light}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: '#fff'
              }}>
                <Typography variant="h6" sx={{ color: colors.primary.dark, fontWeight: 'bold' }}>
                  Estructura del Expediente
                </Typography>
                
                <Stack direction="row" spacing={1}>
                  <Tooltip title="Ordenar">
                    <IconButton size="small" sx={{ color: colors.primary.main }}>
                      <SortIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Filtrar">
                    <IconButton size="small" sx={{ color: colors.primary.main }}>
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
                    sx={{ 
                      mb: 2, 
                      borderRadius: '8px !important', 
                      overflow: 'hidden',
                      '&:before': {
                        display: 'none'
                      }
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: colors.primary.main }} />} sx={{ bgcolor: '#fff' }}>
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
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                              {category.name}
                            </Typography>
                            {category.required && (
                              <Chip 
                                label="OBLIGATORIO" 
                                size="small" 
                                sx={{ 
                                  height: 20, 
                                  fontSize: '0.65rem',
                                  bgcolor: colors.primary.dark,
                                  color: 'white'
                                }}
                              />
                            )}
                            <Chip 
                              label={`${category.documents.length} docs`}
                              size="small"
                              variant="outlined"
                              sx={{ 
                                height: 20, 
                                fontSize: '0.65rem',
                                borderColor: colors.primary.main,
                                color: colors.primary.main
                              }}
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
                                bgcolor: category.assignedRoles.length === 2 ? colors.accents.blue :
                                         category.assignedRoles.includes('AGENTE_ADUANAL') ? colors.primary.main : colors.accents.purple,
                                color: 'white'
                              }}
                            />
                          </Box>
                          <Typography variant="caption" sx={{ color: colors.text.secondary }}>
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
                              sx={{ color: colors.accents.blue }}
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
                              sx={{ color: colors.primary.dark }}
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
                                borderLeft: `3px solid ${document.required ? colors.primary.dark : colors.text.secondary}`
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <DragIndicatorIcon sx={{ color: colors.text.secondary }} />
                              </ListItemIcon>
                              
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <DescriptionIcon sx={{ color: document.required ? colors.primary.dark : colors.text.secondary }} />
                              </ListItemIcon>
                              
                              <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                    {document.name}
                                  </Typography>
                                  {document.required ? (
                                    <Chip 
                                      label="OBLIGATORIO" 
                                      size="small" 
                                      sx={{ 
                                        height: 18, 
                                        fontSize: '0.6rem',
                                        bgcolor: colors.primary.dark,
                                        color: 'white'
                                      }}
                                    />
                                  ) : (
                                    <Chip 
                                      label="OPCIONAL" 
                                      size="small" 
                                      sx={{ 
                                        height: 18, 
                                        fontSize: '0.6rem',
                                        bgcolor: colors.text.secondary,
                                        color: 'white'
                                      }}
                                    />
                                  )}
                                  {/* Mostrar icono de revisión por comité */}
                                  {document.committeeReview && (
                                    <Tooltip title="Requiere revisión por comité">
                                      <PeopleIcon sx={{ fontSize: 16, color: colors.primary.dark }} />
                                    </Tooltip>
                                  )}
                                  {/* Mostrar icono de revisión periódica si es mayor a 0 */}
                                  {parseInt(document.periodicReview) > 0 && (
                                    <Tooltip title={getReviewDescription(document)}>
                                      <TimerIcon sx={{ fontSize: 16, color: colors.primary.main }} />
                                    </Tooltip>
                                  )}
                                </Box>
                                
                                <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mb: 1 }}>
                                  {document.description}
                                </Typography>
                                
                                {/* INFORMACIÓN SIMPLIFICADA - SOLO 2 LÍNEAS */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                  <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                    <strong>Formato:</strong> {document.format}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                    <strong>Tamaño:</strong> {document.maxSize}
                                  </Typography>
                                  {parseInt(document.periodicReview) > 0 && (
                                    <Typography variant="caption" sx={{ color: colors.primary.main }}>
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
                                          sx={{
                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                              color: colors.primary.main,
                                              '&:hover': {
                                                backgroundColor: '#e8f0fe',
                                              },
                                            },
                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                              backgroundColor: colors.primary.main,
                                            },
                                          }}
                                        />
                                      }
                                      label=""
                                    />
                                  </Tooltip>
                                  <Tooltip title="Editar documento">
                                    <IconButton 
                                      size="small"
                                      onClick={() => handleEditDocument(category, document)}
                                      sx={{ color: colors.accents.blue }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Eliminar documento">
                                    <IconButton 
                                      size="small"
                                      onClick={() => handleDeleteDocument(category.id, document.id)}
                                      sx={{ color: colors.primary.dark }}
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
                          sx={{ 
                            mt: 2,
                            color: colors.primary.main,
                            '&:hover': {
                              backgroundColor: '#e8f0fe'
                            }
                          }}
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
        </Box>
      </Box>

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
        <DialogTitle sx={{ color: colors.primary.dark }}>
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
                InputLabelProps={{ sx: { color: colors.primary.main } }}
              />
              
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={2}
                value={currentCategory?.description || ''}
                onChange={(e) => setCurrentCategory({...currentCategory, description: e.target.value})}
                helperText="Describe el propósito de esta categoría"
                InputLabelProps={{ sx: { color: colors.primary.main } }}
              />
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Ícono"
                  value={currentCategory?.icon || ''}
                  onChange={(e) => setCurrentCategory({...currentCategory, icon: e.target.value})}
                  helperText="Emoji o código"
                  InputLabelProps={{ sx: { color: colors.primary.main } }}
                />
                
                <TextField
                  fullWidth
                  type="color"
                  label="Color"
                  value={currentCategory?.color || colors.text.secondary}
                  onChange={(e) => setCurrentCategory({...currentCategory, color: e.target.value})}
                  InputLabelProps={{ sx: { color: colors.primary.main } }}
                />
              </Box>
              
              {/* ASIGNACIÓN DE ROLES - OBLIGATORIO */}
              <FormControl fullWidth>
                <InputLabel sx={{ color: colors.primary.main }}>Asignar a tipo de usuario *</InputLabel>
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
                            bgcolor: value === 'AGENTE_ADUANAL' ? colors.primary.main : colors.accents.purple,
                            color: 'white'
                          }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {availableRoles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      <Checkbox 
                        checked={currentCategory?.assignedRoles?.indexOf(role.value) > -1} 
                        sx={{ color: colors.primary.main, '&.Mui-checked': { color: colors.primary.main } }}
                      />
                      <ListItemIcon>
                        {role.icon}
                      </ListItemIcon>
                      <ListItemText primary={role.label} />
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="caption" sx={{ color: colors.text.secondary, mt: 0.5 }}>
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
                InputLabelProps={{ sx: { color: colors.primary.main } }}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={currentCategory?.required || false}
                    onChange={(e) => setCurrentCategory({...currentCategory, required: e.target.checked})}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: colors.primary.main,
                        '&:hover': {
                          backgroundColor: '#e8f0fe',
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: colors.primary.main,
                      },
                    }}
                  />
                }
                label="Categoría Obligatoria"
                sx={{ color: colors.primary.dark }}
              />
            </Stack>
          ) : (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Nombre del Documento"
                value={currentDocument?.name || ''}
                onChange={(e) => setCurrentDocument({...currentDocument, name: e.target.value})}
                InputLabelProps={{ sx: { color: colors.primary.main } }}
              />
              
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={2}
                value={currentDocument?.description || ''}
                onChange={(e) => setCurrentDocument({...currentDocument, description: e.target.value})}
                InputLabelProps={{ sx: { color: colors.primary.main } }}
              />
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  select
                  label="Formato"
                  value={currentDocument?.format || 'PDF'}
                  onChange={(e) => setCurrentDocument({...currentDocument, format: e.target.value})}
                  InputLabelProps={{ sx: { color: colors.primary.main } }}
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
                  InputLabelProps={{ sx: { color: colors.primary.main } }}
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
                InputLabelProps={{ sx: { color: colors.primary.main } }}
              />
              
              <TextField
                fullWidth
                label="Validación Requerida"
                value={currentDocument?.validation || ''}
                onChange={(e) => setCurrentDocument({...currentDocument, validation: e.target.value})}
                helperText="Ej: OCR, Vigencia, Firma, etc."
                InputLabelProps={{ sx: { color: colors.primary.main } }}
              />
              
              <TextField
                fullWidth
                label="Etiquetas"
                value={currentDocument?.tags?.join(', ') || ''}
                onChange={(e) => setCurrentDocument({...currentDocument, tags: e.target.value.split(', ')})}
                helperText="Separar por comas"
                InputLabelProps={{ sx: { color: colors.primary.main } }}
              />
              
              <TextField
                fullWidth
                label="Orden"
                type="number"
                value={currentDocument?.order || 1}
                onChange={(e) => setCurrentDocument({...currentDocument, order: parseInt(e.target.value)})}
                InputLabelProps={{ sx: { color: colors.primary.main } }}
              />
              
              <Stack spacing={1}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentDocument?.required || false}
                      onChange={(e) => setCurrentDocument({...currentDocument, required: e.target.checked})}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: colors.primary.main,
                          '&:hover': {
                            backgroundColor: '#e8f0fe',
                          },
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: colors.primary.main,
                        },
                      }}
                    />
                  }
                  label="Documento Obligatorio"
                  sx={{ color: colors.primary.dark }}
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentDocument?.committeeReview || false}
                      onChange={(e) => setCurrentDocument({...currentDocument, committeeReview: e.target.checked})}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: colors.primary.dark,
                          '&:hover': {
                            backgroundColor: '#e8f0fe',
                          },
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: colors.primary.dark,
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PeopleIcon fontSize="small" sx={{ color: colors.primary.dark }} />
                      <Typography variant="body2" sx={{ color: colors.primary.dark }}>
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
          <Button 
            onClick={() => setEditDialog(false)} 
            sx={{ color: colors.text.secondary }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={editMode === 'category' ? 
              !currentCategory?.name || !currentCategory?.assignedRoles || currentCategory?.assignedRoles.length === 0 : 
              !currentDocument?.name}
            sx={{ 
              bgcolor: colors.primary.main, 
              '&:hover': { bgcolor: colors.primary.dark },
              '&.Mui-disabled': {
                bgcolor: colors.text.secondary
              }
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConfigExpediente;