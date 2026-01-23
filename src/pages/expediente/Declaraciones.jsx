import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  TextField,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Badge,
  Stepper,
  Step,
  StepLabel,
  Slider,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Collapse
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Description as DescriptionIcon,
  Security as SecurityIcon,
  Gavel as GavelIcon,
  Balance as BalanceIcon,
  Verified as VerifiedIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  CalendarToday as CalendarIcon,
  Assignment as AssignmentIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Assessment as AssessmentIcon,
  RateReview as RateReviewIcon,
  Timeline as TimelineIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  Help as HelpIcon,
  Upload as UploadIcon,
  History as HistoryIcon,
  Group as GroupIcon,
  Build as BuildIcon,
  TextFields as TextFieldsIcon,
  Description as DescriptionIcon2,
  HowToReg as HowToRegIcon,
  TrendingUp as TrendingUpIcon,
  Comment as CommentIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
  Person as PersonIcon,
  VerifiedUser as VerifiedUserIcon,
  Gavel as LawIcon,
  AssignmentInd as MandateIcon,
  Policy as PolicyIcon
} from '@mui/icons-material';

const DeclaracionesCumplimientoAduanero = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState('panel1');
  const [activeStep, setActiveStep] = useState(0);
  const [observacionDialog, setObservacionDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Definir la estructura base de los apartados
  const estructuraBaseApartados = {
    principios_rectores: {
      id: 'principios_rectores',
      titulo: 'ARTÍCULO 95 - PRINCIPIOS RECTORES',
      descripcion: 'Responsabilidades éticas y profesionales del agente aduanal',
      articulo: '95',
      preguntas: [
        {
          id: 1,
          texto: '¿Actúo con diligencia, probidad y buena fe en todas las operaciones aduaneras que realizo?',
          respuesta: null,
          explicacion: '',
          puntos: 25,
          responsabilidad: 'Diligencia y Probidad'
        },
        {
          id: 2,
          texto: '¿Mantengo la confidencialidad de la información de mis clientes según lo establecido por la ley?',
          respuesta: null,
          explicacion: '',
          puntos: 20,
          responsabilidad: 'Confidencialidad'
        },
        {
          id: 3,
          texto: '¿Evito conflictos de interés y declaro cualquier situación que pueda afectar mi imparcialidad?',
          respuesta: null,
          explicacion: '',
          puntos: 20,
          responsabilidad: 'Prevención de Conflictos'
        },
        {
          id: 4,
          texto: '¿Capacito adecuadamente a mi personal auxiliar en principios éticos y normativos?',
          respuesta: null,
          explicacion: '',
          puntos: 15,
          responsabilidad: 'Capacitación del Personal'
        },
        {
          id: 5,
          texto: '¿Rechazo cualquier operación que pueda constituir evasión fiscal o contrabando?',
          respuesta: null,
          explicacion: '',
          puntos: 20,
          responsabilidad: 'Integridad Operativa'
        }
      ],
      estado: 'pendiente',
      guardado: false,
      puntuacionTotal: 0,
      maxPuntos: 100,
      color: '#1976d2'
    },

    conocimiento_mandato: {
      id: 'conocimiento_mandato',
      titulo: 'ARTÍCULO 96 - CONOCIMIENTO DEL MANDATO',
      descripcion: 'Responsabilidades respecto al mandato recibido del importador/exportador',
      articulo: '96',
      preguntas: [
        {
          id: 1,
          texto: '¿Verifico que el mandato otorgado por el cliente esté debidamente formalizado y sea vigente?',
          respuesta: null,
          explicacion: '',
          puntos: 30,
          responsabilidad: 'Formalización del Mandato'
        },
        {
          id: 2,
          texto: '¿Confirmo que actúo dentro de los límites del mandato conferido por mi cliente?',
          respuesta: null,
          explicacion: '',
          puntos: 25,
          responsabilidad: 'Límites del Mandato'
        },
        {
          id: 3,
          texto: '¿Mantengo comunicación clara con el cliente sobre el alcance de mis facultades como agente?',
          respuesta: null,
          explicacion: '',
          puntos: 25,
          responsabilidad: 'Comunicación con el Cliente'
        },
        {
          id: 4,
          texto: '¿Documento adecuadamente las instrucciones específicas recibidas del mandante?',
          respuesta: null,
          explicacion: '',
          puntos: 20,
          responsabilidad: 'Documentación de Instrucciones'
        }
      ],
      estado: 'pendiente',
      guardado: false,
      puntuacionTotal: 0,
      maxPuntos: 100,
      color: '#2e7d32'
    },

    materialidad: {
      id: 'materialidad',
      titulo: 'ARTÍCULO 97 - MATERIALIDAD',
      descripcion: 'Responsabilidades técnicas sobre información material en declaraciones',
      articulo: '97',
      preguntas: [
        {
          id: 1,
          texto: '¿Verifico personalmente la exactitud de la información material en las declaraciones que presento?',
          respuesta: null,
          explicacion: '',
          puntos: 25,
          responsabilidad: 'Exactitud de la Información'
        },
        {
          id: 2,
          texto: '¿Confirmo la correcta clasificación arancelaria de todas las mercancías que declaro?',
          respuesta: null,
          explicacion: '',
          puntos: 25,
          responsabilidad: 'Clasificación Arancelaria'
        },
        {
          id: 3,
          texto: '¿Valido el valor en aduana declarado con la documentación comercial correspondiente?',
          respuesta: null,
          explicacion: '',
          puntos: 20,
          responsabilidad: 'Valor en Aduana'
        },
        {
          id: 4,
          texto: '¿Verifico el origen de las mercancías y aplico correctamente los tratados comerciales?',
          respuesta: null,
          explicacion: '',
          puntos: 15,
          responsabilidad: 'Origen Preferencial'
        },
        {
          id: 5,
          texto: '¿Reporto inmediatamente cualquier error o omisión material que detecte en las declaraciones?',
          respuesta: null,
          explicacion: '',
          puntos: 15,
          responsabilidad: 'Reporte de Errores'
        }
      ],
      estado: 'pendiente',
      guardado: false,
      puntuacionTotal: 0,
      maxPuntos: 100,
      color: '#ed6c02'
    },

    reglas_minimas_seguridad: {
      id: 'reglas_minimas_seguridad',
      titulo: 'ARTÍCULO 98 - REGLAS MÍNIMAS DE SEGURIDAD',
      descripcion: 'Responsabilidades de seguridad en operaciones aduaneras',
      articulo: '98',
      preguntas: [
        {
          id: 1,
          texto: '¿Verifico la integridad de los precintos aduaneros en las operaciones que manejo?',
          respuesta: null,
          explicacion: '',
          puntos: 25,
          responsabilidad: 'Control de Precintos'
        },
        {
          id: 2,
          texto: '¿Confirmo que las mercancías bajo mi responsabilidad estén almacenadas en áreas seguras?',
          respuesta: null,
          explicacion: '',
          puntos: 25,
          responsabilidad: 'Almacenamiento Seguro'
        },
        {
          id: 3,
          texto: '¿Reporto inmediatamente cualquier irregularidad o incidente de seguridad detectado?',
          respuesta: null,
          explicacion: '',
          puntos: 20,
          responsabilidad: 'Reporte de Incidentes'
        },
        {
          id: 4,
          texto: '¿Aplico los procedimientos de seguridad establecidos durante el transporte de mercancías?',
          respuesta: null,
          explicacion: '',
          puntos: 15,
          responsabilidad: 'Procedimientos de Transporte'
        },
        {
          id: 5,
          texto: '¿Verifico la identidad de las personas autorizadas para el manejo de mercancías?',
          respuesta: null,
          explicacion: '',
          puntos: 15,
          responsabilidad: 'Control de Accesos'
        }
      ],
      estado: 'pendiente',
      guardado: false,
      puntuacionTotal: 0,
      maxPuntos: 100,
      color: '#9c27b0'
    }
  };

  // Estados para los apartados principales según artículos 95-98
  const [apartadosData, setApartadosData] = useState(estructuraBaseApartados);

  // Indicadores para la tabla superior
  const [indicadoresSuperiores, setIndicadoresSuperiores] = useState({
    principiosRectores: {
      responsabilidadEtica: { valor: 0, meta: 90 },
      conocimientoNormativo: { valor: 0, meta: 85 },
      supervisionPersonal: { valor: 0, meta: 85 }
    },
    conocimientoMandato: {
      formalizacionMandato: { valor: 0, meta: 95 },
      comunicacionCliente: { valor: 0, meta: 90 },
      limitesFacultades: { valor: 0, meta: 85 }
    },
    materialidad: {
      exactitudInformacion: { valor: 0, meta: 80 },
      clasificacionArancelaria: { valor: 0, meta: 85 },
      valoracionMercancias: { valor: 0, meta: 90 }
    },
    reglasMinimasSeguridad: {
      integridadOperaciones: { valor: 0, meta: 95 },
      reporteIncidentes: { valor: 0, meta: 90 },
      cumplimientoProcedimientos: { valor: 0, meta: 90 }
    }
  });

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Función CORREGIDA con protección contra undefined
  const handleRespuestaChange = (apartadoId, preguntaId, respuesta) => {
    setApartadosData(prev => {
      // Verificar que el apartado exista
      const apartadoActual = prev[apartadoId];
      if (!apartadoActual) {
        console.error(`Apartado ${apartadoId} no encontrado`);
        return prev;
      }

      // Verificar que las preguntas existan
      if (!apartadoActual.preguntas || !Array.isArray(apartadoActual.preguntas)) {
        console.error(`Preguntas del apartado ${apartadoId} no válidas`);
        return prev;
      }

      // Mapear las preguntas y actualizar la correspondiente
      const nuevasPreguntas = apartadoActual.preguntas.map(p => {
        if (p && p.id === preguntaId) {
          return { ...p, respuesta: respuesta };
        }
        return p;
      });

      return {
        ...prev,
        [apartadoId]: {
          ...apartadoActual,
          preguntas: nuevasPreguntas
        }
      };
    });
  };

  // Función CORREGIDA con protección contra undefined
  const handleExplicacionChange = (apartadoId, preguntaId, explicacion) => {
    setApartadosData(prev => {
      const apartadoActual = prev[apartadoId];
      if (!apartadoActual || !apartadoActual.preguntas) {
        console.error(`Apartado ${apartadoId} o preguntas no encontrados`);
        return prev;
      }

      const nuevasPreguntas = apartadoActual.preguntas.map(p => {
        if (p && p.id === preguntaId) {
          return { ...p, explicacion };
        }
        return p;
      });

      return {
        ...prev,
        [apartadoId]: {
          ...apartadoActual,
          preguntas: nuevasPreguntas
        }
      };
    });
  };

  // Función para calcular puntuación y guardar apartado con protección
  const handleGuardarApartado = (apartadoId) => {
    const apartado = apartadosData[apartadoId];
    
    // Verificar que el apartado exista
    if (!apartado) {
      alert(`Error: No se encontró el apartado ${apartadoId}`);
      return;
    }

    // Verificar que las preguntas existan
    if (!apartado.preguntas || !Array.isArray(apartado.preguntas)) {
      alert(`Error: Las preguntas del apartado ${apartadoId} no son válidas`);
      return;
    }

    const preguntasContestadas = apartado.preguntas.filter(p => p && p.respuesta !== null);
    
    if (preguntasContestadas.length === 0) {
      alert('Por favor responda al menos una pregunta antes de guardar');
      return;
    }

    // Calcular puntuación de manera segura
    let puntuacionTotal = 0;
    apartado.preguntas.forEach(pregunta => {
      if (pregunta && pregunta.respuesta === true) {
        puntuacionTotal += pregunta.puntos || 0;
      }
    });

    // Calcular porcentaje
    const maxPuntos = apartado.maxPuntos || 100;
    const porcentaje = Math.round((puntuacionTotal / maxPuntos) * 100);

    // Determinar estado
    let estado = 'pendiente';
    if (preguntasContestadas.length === apartado.preguntas.length) {
      estado = porcentaje >= 80 ? 'cumple_totalmente' : 
               porcentaje >= 60 ? 'cumple_parcialmente' : 'no_cumple';
    }

    // Actualizar estado del apartado
    setApartadosData(prev => ({
      ...prev,
      [apartadoId]: {
        ...prev[apartadoId],
        puntuacionTotal,
        estado: estado,
        guardado: true
      }
    }));

    // Actualizar indicadores superiores según el apartado
    actualizarIndicadoresSuperiores(apartadoId, porcentaje);

    alert(`Evaluación del Artículo ${apartado.articulo} guardada exitosamente. Puntuación: ${puntuacionTotal}/${maxPuntos} (${porcentaje}%)`);
  };

  // Función para actualizar indicadores superiores
  const actualizarIndicadoresSuperiores = (apartadoId, porcentaje) => {
    setIndicadoresSuperiores(prev => {
      const nuevosIndicadores = { ...prev };
      
      switch(apartadoId) {
        case 'principios_rectores':
          nuevosIndicadores.principiosRectores.responsabilidadEtica.valor = porcentaje;
          nuevosIndicadores.principiosRectores.conocimientoNormativo.valor = Math.min(porcentaje + 5, 100);
          nuevosIndicadores.principiosRectores.supervisionPersonal.valor = Math.min(porcentaje + 8, 100);
          break;
        case 'conocimiento_mandato':
          nuevosIndicadores.conocimientoMandato.formalizacionMandato.valor = porcentaje;
          nuevosIndicadores.conocimientoMandato.comunicacionCliente.valor = Math.min(porcentaje + 10, 100);
          nuevosIndicadores.conocimientoMandato.limitesFacultades.valor = Math.min(porcentaje + 5, 100);
          break;
        case 'materialidad':
          nuevosIndicadores.materialidad.exactitudInformacion.valor = porcentaje;
          nuevosIndicadores.materialidad.clasificacionArancelaria.valor = Math.min(porcentaje + 8, 100);
          nuevosIndicadores.materialidad.valoracionMercancias.valor = Math.min(porcentaje + 12, 100);
          break;
        case 'reglas_minimas_seguridad':
          nuevosIndicadores.reglasMinimasSeguridad.integridadOperaciones.valor = porcentaje;
          nuevosIndicadores.reglasMinimasSeguridad.reporteIncidentes.valor = Math.min(porcentaje + 15, 100);
          nuevosIndicadores.reglasMinimasSeguridad.cumplimientoProcedimientos.valor = Math.min(porcentaje + 5, 100);
          break;
      }
      
      return nuevosIndicadores;
    });
  };

  // Calcular cumplimiento general de manera segura
  const calcularCumplimientoGeneral = () => {
    try {
      const apartados = Object.values(apartadosData);
      if (!apartados || apartados.length === 0) return 0;
      
      const completados = apartados.filter(a => 
        a && a.estado && a.estado !== 'pendiente' && a.guardado
      ).length;
      
      return apartados.length > 0 ? Math.round((completados / apartados.length) * 100) : 0;
    } catch (error) {
      console.error('Error calculando cumplimiento general:', error);
      return 0;
    }
  };

  const cumplimientoGeneral = calcularCumplimientoGeneral();

  // Calcular cumplimiento por apartado de manera segura
  const calcularCumplimientoApartado = (apartado) => {
    if (!apartado || !apartado.guardado) return 0;
    
    const puntuacionTotal = apartado.puntuacionTotal || 0;
    const maxPuntos = apartado.maxPuntos || 100;
    
    return maxPuntos > 0 ? Math.round((puntuacionTotal / maxPuntos) * 100) : 0;
  };

  // Obtener texto del estado según el porcentaje de manera segura
  const obtenerTextoEstado = (apartado) => {
    if (!apartado || !apartado.guardado) return 'PENDIENTE';
    
    const preguntas = apartado.preguntas || [];
    const preguntasContestadas = preguntas.filter(p => p && p.respuesta !== null).length;
    
    if (preguntasContestadas < preguntas.length) return 'EN PROCESO';
    
    const porcentaje = calcularCumplimientoApartado(apartado);
    if (porcentaje >= 80) return 'CUMPLE TOTALMENTE';
    if (porcentaje >= 60) return 'CUMPLE PARCIALMENTE';
    return 'NO CUMPLE';
  };

  // Obtener color del estado de manera segura
  const obtenerColorEstado = (apartado) => {
    if (!apartado || !apartado.guardado) return 'default';
    
    const preguntas = apartado.preguntas || [];
    const preguntasContestadas = preguntas.filter(p => p && p.respuesta !== null).length;
    
    if (preguntasContestadas < preguntas.length) return 'warning';
    
    const porcentaje = calcularCumplimientoApartado(apartado);
    if (porcentaje >= 80) return 'success';
    if (porcentaje >= 60) return 'warning';
    return 'error';
  };

  // Función para obtener el icono según el apartado
  const obtenerIcono = (apartadoId) => {
    switch(apartadoId) {
      case 'principios_rectores':
        return <BalanceIcon />;
      case 'conocimiento_mandato':
        return <MandateIcon />;
      case 'materialidad':
        return <AssessmentIcon />;
      case 'reglas_minimas_seguridad':
        return <SecurityIcon />;
      default:
        return <AssignmentIcon />;
    }
  };

  // Función para renderizar cada apartado con preguntas de manera segura
  const renderApartado = (apartado) => {
    if (!apartado) return null;
    
    const cumplimiento = calcularCumplimientoApartado(apartado);
    const preguntas = apartado.preguntas || [];
    const preguntasContestadas = preguntas.filter(p => p && p.respuesta !== null).length;
    const preguntasTotales = preguntas.length;
    const textoEstado = obtenerTextoEstado(apartado);
    const colorEstado = obtenerColorEstado(apartado);
    
    return (
      <Accordion 
        expanded={expanded === apartado.id}
        onChange={handleAccordionChange(apartado.id)}
        sx={{ 
          mb: 3,
          border: '2px solid',
          borderColor: apartado.color || '#1976d2',
          borderRadius: '8px !important',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          '&:before': { display: 'none' }
        }}
      >
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          sx={{ 
            backgroundColor: expanded === apartado.id ? '#f8f9fa' : 'white',
            borderRadius: '8px',
            minHeight: '70px',
            '& .MuiAccordionSummary-content': {
              alignItems: 'center'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: `${apartado.color || '#1976d2'}15`,
              color: apartado.color || '#1976d2'
            }}>
              {obtenerIcono(apartado.id)}
            </Box>
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ 
                fontWeight: '700', 
                color: '#333',
                fontSize: '1rem',
                mb: 0.5
              }}>
                {apartado.titulo || 'Artículo'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                {apartado.descripcion || 'Descripción no disponible'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {apartado.guardado && (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ 
                    color: cumplimiento >= 80 ? '#4caf50' : 
                           cumplimiento >= 60 ? '#ff9800' : '#f44336',
                    fontWeight: 'bold'
                  }}>
                    {cumplimiento}%
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Cumplimiento
                  </Typography>
                </Box>
              )}
              
              <Chip 
                label={textoEstado}
                size="small"
                color={colorEstado}
                sx={{ fontWeight: '600' }}
              />
            </Box>
          </Box>
        </AccordionSummary>
        
        <AccordionDetails sx={{ pt: 3, pb: 3 }}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ color: '#333', display: 'flex', alignItems: 'center', gap: 1 }}>
                <LawIcon sx={{ color: apartado.color || '#1976d2' }} /> 
                Evaluación del Artículo {apartado.articulo || ''} - Responsabilidades del Agente Aduanal
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <VerifiedUserIcon fontSize="small" sx={{ color: '#666' }} />
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {preguntasContestadas}/{preguntasTotales} responsabilidades evaluadas
                </Typography>
              </Box>
            </Box>
            
            <Alert severity="info" sx={{ mb: 3, backgroundColor: `${apartado.color || '#1976d2'}10` }}>
              <Typography variant="body2">
                <strong>Instrucciones:</strong> Evalúe cada una de sus responsabilidades según el Artículo {apartado.articulo || ''}. 
                Seleccione "Sí" si cumple consistentemente con la responsabilidad o "No" si identifica áreas de mejora.
              </Typography>
            </Alert>
            
            {preguntas.map((pregunta, index) => {
              if (!pregunta) return null;
              
              return (
                <Box key={pregunta.id || index} sx={{ mb: 3, p: 2.5, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      backgroundColor: apartado.color || '#1976d2',
                      color: 'white',
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </Box>
                    
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: '500', mb: 0.5 }}>
                        {pregunta.texto || 'Pregunta no disponible'}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Chip 
                          label={pregunta.responsabilidad || 'Responsabilidad'}
                          size="small"
                          sx={{ 
                            backgroundColor: `${apartado.color || '#1976d2'}20`,
                            color: apartado.color || '#1976d2',
                            fontWeight: '500'
                          }}
                        />
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: '600' }}>
                          {pregunta.puntos || 0} puntos
                        </Typography>
                      </Box>
                      
                      {/* Estado de la respuesta */}
                      {pregunta.respuesta !== null && (
                        <Box sx={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: 1,
                          p: 1,
                          borderRadius: 1,
                          backgroundColor: pregunta.respuesta ? '#e8f5e9' : '#ffebee',
                          border: `1px solid ${pregunta.respuesta ? '#4caf50' : '#f44336'}`,
                          mb: 1
                        }}>
                          {pregunta.respuesta ? (
                            <>
                              <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                              <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: '500' }}>
                                Cumple con esta responsabilidad
                              </Typography>
                            </>
                          ) : (
                            <>
                              <CloseIcon sx={{ color: '#f44336', fontSize: 20 }} />
                              <Typography variant="body2" sx={{ color: '#c62828', fontWeight: '500' }}>
                                No cumple completamente
                              </Typography>
                            </>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Box>
                  
                  <FormControl component="fieldset" sx={{ mb: 2, width: '100%' }}>
                    <FormLabel component="legend" sx={{ fontWeight: '500', mb: 1 }}>
                      Mi nivel de cumplimiento:
                    </FormLabel>
                    <RadioGroup
                      row
                      value={pregunta.respuesta === null ? '' : pregunta.respuesta.toString()}
                      onChange={(e) => {
                        const valor = e.target.value === 'true';
                        handleRespuestaChange(apartado.id, pregunta.id, valor);
                      }}
                      sx={{ gap: 2 }}
                    >
                      <FormControlLabel 
                        value="true" 
                        control={<Radio />} 
                        label={
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1,
                            p: 1,
                            borderRadius: 1,
                            backgroundColor: pregunta.respuesta === true ? '#e8f5e9' : 'transparent',
                            border: pregunta.respuesta === true ? '2px solid #4caf50' : '1px solid #e0e0e0'
                          }}>
                            <CheckCircleIcon sx={{ color: pregunta.respuesta === true ? '#4caf50' : '#9e9e9e' }} />
                            <Typography sx={{ fontWeight: pregunta.respuesta === true ? '600' : '400' }}>
                              Sí, cumplo con esta responsabilidad
                            </Typography>
                          </Box>
                        } 
                        sx={{ m: 0 }}
                      />
                      <FormControlLabel 
                        value="false" 
                        control={<Radio />} 
                        label={
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1,
                            p: 1,
                            borderRadius: 1,
                            backgroundColor: pregunta.respuesta === false ? '#ffebee' : 'transparent',
                            border: pregunta.respuesta === false ? '2px solid #f44336' : '1px solid #e0e0e0'
                          }}>
                            <CloseIcon sx={{ color: pregunta.respuesta === false ? '#f44336' : '#9e9e9e' }} />
                            <Typography sx={{ fontWeight: pregunta.respuesta === false ? '600' : '400' }}>
                              No, necesito mejorar en esta área
                            </Typography>
                          </Box>
                        } 
                        sx={{ m: 0 }}
                      />
                    </RadioGroup>
                  </FormControl>
                  
                  <Collapse in={pregunta.respuesta === false}>
                    <Box sx={{ mt: 2, p: 2, backgroundColor: '#fff8e1', borderRadius: 1, border: '1px solid #ffd54f' }}>
                      <Typography variant="body2" sx={{ mb: 1, color: '#f57c00', fontWeight: '500', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ArrowForwardIcon sx={{ fontSize: 16 }} />
                        Área de mejora identificada - Plan de acción:
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="Describa las acciones específicas que tomará para mejorar en esta responsabilidad..."
                        value={pregunta.explicacion || ''}
                        onChange={(e) => handleExplicacionChange(apartado.id, pregunta.id, e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ backgroundColor: 'white' }}
                        helperText="Este plan de mejora será registrado para seguimiento"
                      />
                    </Box>
                  </Collapse>
                </Box>
              );
            })}
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: '600', color: '#333', mb: 1 }}>
                  Resumen del Artículo {apartado.articulo || ''}:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Responsabilidades evaluadas: {preguntasContestadas}/{preguntasTotales}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Puntuación obtenida: {apartado.puntuacionTotal || 0}/{apartado.maxPuntos || 100} puntos
                    </Typography>
                    {apartado.guardado && (
                      <Typography variant="body2" sx={{ color: apartado.color || '#1976d2', fontWeight: '600', mt: 0.5 }}>
                        Nivel de cumplimiento: {cumplimiento}%
                      </Typography>
                    )}
                  </Box>
                  
                  {apartado.guardado && (
                    <Box sx={{ 
                      p: 2, 
                      borderRadius: 2,
                      backgroundColor: cumplimiento >= 80 ? '#e8f5e9' : 
                                     cumplimiento >= 60 ? '#fff3e0' : '#ffebee',
                      border: `2px solid ${cumplimiento >= 80 ? '#4caf50' : 
                                               cumplimiento >= 60 ? '#ff9800' : '#f44336'}`
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: '600',
                        color: cumplimiento >= 80 ? '#2e7d32' : 
                               cumplimiento >= 60 ? '#f57c00' : '#c62828'
                      }}>
                        {cumplimiento >= 80 ? '✅ Excelente cumplimiento' :
                         cumplimiento >= 60 ? '⚠️ Cumplimiento aceptable' :
                         '❌ Necesita mejorar significativamente'}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
              
              <Button
                variant="contained"
                sx={{ 
                  textTransform: 'none', 
                  px: 4,
                  backgroundColor: apartado.color || '#1976d2',
                  '&:hover': {
                    backgroundColor: apartado.color || '#1976d2',
                    opacity: 0.9
                  }
                }}
                onClick={() => handleGuardarApartado(apartado.id)}
                disabled={preguntasContestadas === 0}
                startIcon={<AssignmentTurnedInIcon />}
              >
                {apartado.guardado ? 'Actualizar Evaluación' : 'Guardar Evaluación'}
              </Button>
            </Box>
          </Paper>
        </AccordionDetails>
      </Accordion>
    );
  };

  // Calcular indicadores para la parte superior de manera segura
  const calcularIndicadoresSuperiores = () => {
    try {
      const apartados = Object.values(apartadosData);
      if (!apartados) return {
        totalApartados: 0,
        guardados: 0,
        altoCumplimiento: 0,
        areasMejora: 0,
        totalResponsabilidades: 0,
        responsabilidadesEvaluadas: 0,
        cumplimientoGeneral: 0
      };
      
      // Apartados guardados
      const guardados = apartados.filter(a => a && a.guardado).length;
      
      // Apartados con alto cumplimiento (≥80%)
      const altoCumplimiento = apartados.filter(a => {
        if (!a || !a.guardado) return false;
        const cumplimiento = calcularCumplimientoApartado(a);
        return cumplimiento >= 80;
      }).length;
      
      // Preguntas con respuesta "no" (áreas de mejora)
      const areasMejora = apartados.reduce((total, apartado) => {
        if (!apartado || !apartado.preguntas) return total;
        return total + apartado.preguntas.filter(p => p && p.respuesta === false).length;
      }, 0);
      
      // Total de responsabilidades
      const totalResponsabilidades = apartados.reduce((total, apartado) => {
        if (!apartado || !apartado.preguntas) return total;
        return total + apartado.preguntas.length;
      }, 0);
      
      // Responsabilidades evaluadas
      const responsabilidadesEvaluadas = apartados.reduce((total, apartado) => {
        if (!apartado || !apartado.preguntas) return total;
        return total + apartado.preguntas.filter(p => p && p.respuesta !== null).length;
      }, 0);
      
      return {
        totalApartados: apartados.length,
        guardados,
        altoCumplimiento,
        areasMejora,
        totalResponsabilidades,
        responsabilidadesEvaluadas,
        cumplimientoGeneral
      };
    } catch (error) {
      console.error('Error calculando indicadores:', error);
      return {
        totalApartados: 0,
        guardados: 0,
        altoCumplimiento: 0,
        areasMejora: 0,
        totalResponsabilidades: 0,
        responsabilidadesEvaluadas: 0,
        cumplimientoGeneral: 0
      };
    }
  };

  const indicadoresCalculados = calcularIndicadoresSuperiores();

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}>
            Declaración de Cumplimiento Aduanero
          </Typography>
          <Typography variant="body1" sx={{ color: '#666' }}>
            Evaluación de responsabilidades según Artículos 95, 96, 97 y 98 - Agente Aduanal
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{ textTransform: 'none' }}
          >
            Exportar Mi Declaración
          </Button>
          <Button
            variant="contained"
            startIcon={<VerifiedUserIcon />}
            sx={{ textTransform: 'none' }}
            onClick={() => alert('Declaración enviada para validación')}
          >
            Enviar Declaración
          </Button>
        </Stack>
      </Box>

      {/* Stepper de progreso */}
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        <Step>
          <StepLabel>Artículo 95 - Principios Rectores</StepLabel>
        </Step>
        <Step>
          <StepLabel>Artículo 96 - Conocimiento del Mandato</StepLabel>
        </Step>
        <Step>
          <StepLabel>Artículo 97 - Materialidad</StepLabel>
        </Step>
        <Step>
          <StepLabel>Artículo 98 - Reglas de Seguridad</StepLabel>
        </Step>
      </Stepper>

      {/* Nivel de Cumplimiento con indicadores en la parte superior */}
      <Card sx={{ mb: 4, bgcolor: '#f5f5f5' }}>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, color: '#333' }}>
              Mi Nivel de Cumplimiento General
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ 
                  color: cumplimientoGeneral >= 70 ? '#4caf50' : '#ff9800',
                  fontWeight: 'bold'
                }}>
                  {cumplimientoGeneral}%
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Progreso Total
                </Typography>
              </Box>
              
              <LinearProgress 
                variant="determinate" 
                value={cumplimientoGeneral}
                sx={{ 
                  flexGrow: 1,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: cumplimientoGeneral >= 70 ? '#4caf50' : '#ff9800',
                    borderRadius: 10
                  }
                }}
              />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LawIcon sx={{ color: '#1976d2', fontSize: 20 }} />
                  <Typography variant="body2">
                    {indicadoresCalculados.guardados} de {indicadoresCalculados.totalApartados} artículos evaluados
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                  <Typography variant="body2">
                    {indicadoresCalculados.altoCumplimiento} artículos con excelente cumplimiento
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WarningIcon sx={{ color: '#f57c00', fontSize: 20 }} />
                  <Typography variant="body2">
                    {indicadoresCalculados.areasMejora} áreas identificadas para mejora
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          
          {/* Tabla de indicadores por apartado - ERROR CORREGIDO AQUÍ */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#333', display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrendingUpIcon /> Mi Cumplimiento por Artículo
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: '600' }}>Artículo</TableCell>
                    <TableCell sx={{ fontWeight: '600' }}>Descripción</TableCell>
                    <TableCell sx={{ fontWeight: '600' }} align="center">Mi Cumplimiento</TableCell>
                    <TableCell sx={{ fontWeight: '600' }} align="center">Estado</TableCell>
                    <TableCell sx={{ fontWeight: '600' }} align="center">Responsabilidades</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(apartadosData).map((apartado) => {
                    if (!apartado) return null;
                    
                    const cumplimiento = calcularCumplimientoApartado(apartado);
                    const preguntas = apartado.preguntas || [];
                    const preguntasContestadas = preguntas.filter(p => p && p.respuesta !== null).length;
                    const textoEstado = obtenerTextoEstado(apartado);
                    
                    return (
                      <TableRow key={apartado.id || 'unknown'} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ color: apartado.color || '#1976d2' }}>
                              {obtenerIcono(apartado.id)}
                            </Box>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: '600' }}>
                                Art. {apartado.articulo || ''}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#666' }}>
                                {apartado.titulo ? apartado.titulo.split(' - ')[1] : 'Artículo'}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {apartado.descripcion || 'Sin descripción'}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ 
                              color: cumplimiento >= 80 ? '#4caf50' : 
                                     cumplimiento >= 60 ? '#ff9800' : '#f44336',
                              fontWeight: '600'
                            }}>
                              {cumplimiento}%
                            </Typography>
                            <LinearProgress 
                              variant="determinate" 
                              value={cumplimiento}
                              sx={{ 
                                width: 60,
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: '#e0e0e0',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: cumplimiento >= 80 ? '#4caf50' : 
                                                 cumplimiento >= 60 ? '#ff9800' : '#f44336'
                                }
                              }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={textoEstado}
                            size="small"
                            color={obtenerColorEstado(apartado)}
                            sx={{ fontWeight: '500' }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {preguntasContestadas}/{preguntas.length}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
                            {apartado.puntuacionTotal || 0}/{apartado.maxPuntos || 100} pts
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Apartados principales con cuestionarios */}
      {Object.values(apartadosData).map((apartado) => (
        renderApartado(apartado)
      ))}

      {/* Información adicional */}
      <Alert 
        severity="info" 
        sx={{ mt: 4 }}
        icon={<HelpIcon />}
      >
        <Typography variant="body2">
          <strong>Instrucciones importantes:</strong> Esta declaración evalúa su cumplimiento como Agente Aduanal según los Artículos 95, 96, 97 y 98. 
          Responda con sinceridad cada responsabilidad. Las respuestas "No" deben incluir un plan de mejora específico. 
          La declaración completa será enviada para validación y registro oficial.
        </Typography>
      </Alert>
    </Box>
  );
};

export default DeclaracionesCumplimientoAduanero;