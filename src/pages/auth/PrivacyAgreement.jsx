import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  PrivacyTip as PrivacyTipIcon,
  Description as DescriptionIcon,
  Download as DownloadIcon
} from '@mui/icons-material';

const PrivacyAgreement = () => {
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState({
    privacy: false,
    terms: false,
    communications: false,
    legalAge: false
  });
  const [expanded, setExpanded] = useState('panel1');

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCheckboxChange = (name) => (event) => {
    setAgreements({
      ...agreements,
      [name]: event.target.checked
    });
  };

  const handleAccept = () => {
    if (Object.values(agreements).every(value => value)) {
      // Simular aceptación
      localStorage.setItem('privacy_accepted', 'true');
      navigate('/dashboard');
    }
  };

  const allAccepted = Object.values(agreements).every(value => value);

  const sections = [
    {
      id: 'panel1',
      title: '1. Recopilación de Información',
      content: 'En SICAG, recopilamos información personal que usted nos proporciona directamente cuando utiliza nuestros servicios, incluyendo pero no limitado a: nombre completo, dirección de correo electrónico, información de contacto, datos profesionales y cualquier otra información que decida compartir con nosotros.'
    },
    {
      id: 'panel2',
      title: '2. Uso de la Información',
      content: 'Utilizamos la información recopilada para proporcionar, operar y mantener nuestros servicios, mejorar y personalizar nuestros servicios, comunicarnos con usted, enviarle actualizaciones y detectar y prevenir fraudes.'
    },
    {
      id: 'panel3',
      title: '3. Compartición de Información',
      content: 'No compartimos su información personal con terceros, excepto para cumplir con obligaciones legales, proteger derechos o en relación con una fusión o adquisición.'
    },
    {
      id: 'panel4',
      title: '4. Seguridad de los Datos',
      content: 'Implementamos medidas de seguridad técnicas y organizativas adecuadas para proteger su información personal contra el acceso no autorizado, la alteración, divulgación o destrucción.'
    },
    {
      id: 'panel5',
      title: '5. Sus Derechos',
      content: 'Usted tiene derecho a acceder, corregir, eliminar y oponerse al procesamiento de sus datos personales, así como a solicitar la portabilidad de sus datos y retirar su consentimiento en cualquier momento.'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h2" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
          SICAG
        </Typography>
        <Typography variant="h6" sx={{ color: '#7f8c8d' }}>
          Acuerdo de Privacidad y Términos de Uso
        </Typography>
      </Box>

      <Alert severity="warning" sx={{ mb: 4 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Por favor, lea atentamente los siguientes términos y condiciones antes de aceptar el acuerdo.
        </Typography>
      </Alert>

      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Header del acuerdo */}
        <Box sx={{ mb: 4, p: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PrivacyTipIcon sx={{ mr: 2, color: '#3498db', fontSize: 40 }} />
            <Box>
              <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                Política de Privacidad y Tratamiento de Datos
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                Última actualización: Enero 2026
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
            Este acuerdo describe cómo SICAG recopila, utiliza y protege su información personal en cumplimiento 
            con la Ley de Protección de Datos Personales y garantiza que su información será tratada con la 
            máxima confidencialidad y seguridad.
          </Typography>
        </Box>

        {/* Contenido del acuerdo */}
        <Box sx={{ mb: 4, maxHeight: 400, overflow: 'auto', p: 2, border: '1px solid #eee', borderRadius: 2 }}>
          {sections.map((section) => (
            <Accordion 
              key={section.id} 
              expanded={expanded === section.id}
              onChange={handleAccordionChange(section.id)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                  {section.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: '#7f8c8d', textAlign: 'justify' }}>
                  {section.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Documentos adicionales */}
        <Box sx={{ mb: 4, p: 3, bgcolor: '#f0f7ff', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
            Documentación complementaria
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <DescriptionIcon sx={{ color: '#3498db' }} />
              </ListItemIcon>
              <ListItemText primary="Política Integral de Protección de Datos (PDF)" />
              <Button size="small" startIcon={<DownloadIcon />}>Descargar</Button>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DescriptionIcon sx={{ color: '#3498db' }} />
              </ListItemIcon>
              <ListItemText primary="Manual de Buenas Prácticas en Tratamiento de Datos" />
              <Button size="small" startIcon={<DownloadIcon />}>Descargar</Button>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DescriptionIcon sx={{ color: '#3498db' }} />
              </ListItemIcon>
              <ListItemText primary="Procedimiento para Ejercicio de Derechos ARCO" />
              <Button size="small" startIcon={<DownloadIcon />}>Descargar</Button>
            </ListItem>
          </List>
        </Box>

        {/* Checkboxes de consentimiento */}
        <Box sx={{ mb: 4, p: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
            Declaraciones de Consentimiento
          </Typography>
          
          <Typography variant="body2" sx={{ color: '#e74c3c', mb: 3, fontStyle: 'italic' }}>
            * Todos los campos son obligatorios para continuar
          </Typography>

          <List>
            <ListItem sx={{ pl: 0 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreements.privacy}
                    onChange={handleCheckboxChange('privacy')}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      He leído y comprendo la Política de Privacidad de SICAG
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f8c8d', mt: 0.5 }}>
                      Acepto el tratamiento de mis datos personales conforme a lo establecido en la política de privacidad.
                    </Typography>
                  </Box>
                }
              />
            </ListItem>

            <ListItem sx={{ pl: 0 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreements.terms}
                    onChange={handleCheckboxChange('terms')}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      Acepto los Términos y Condiciones de Uso del sistema
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f8c8d', mt: 0.5 }}>
                      Acepto cumplir con las reglas y condiciones establecidas para el uso del sistema SICAG.
                    </Typography>
                  </Box>
                }
              />
            </ListItem>

            <ListItem sx={{ pl: 0 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreements.communications}
                    onChange={handleCheckboxChange('communications')}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      Autorizo el envío de comunicaciones y notificaciones
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f8c8d', mt: 0.5 }}>
                      Acepto recibir comunicaciones relacionadas con el servicio, actualizaciones y notificaciones importantes.
                    </Typography>
                  </Box>
                }
              />
            </ListItem>

            <ListItem sx={{ pl: 0 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreements.legalAge}
                    onChange={handleCheckboxChange('legalAge')}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      Confirmo que soy mayor de edad y tengo capacidad legal para otorgar este consentimiento
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f8c8d', mt: 0.5 }}>
                      Declaro que tengo al menos 18 años de edad y poseo la capacidad legal para aceptar estos términos.
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          </List>
        </Box>

        {/* Botones de acción */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              if (window.confirm('Al rechazar el acuerdo de privacidad, no podrás acceder al sistema SICAG. ¿Estás seguro?')) {
                navigate('/login');
              }
            }}
            sx={{ minWidth: 150 }}
          >
            Rechazar
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAccept}
            disabled={!allAccepted}
            startIcon={<CheckCircleIcon />}
            sx={{ minWidth: 200, py: 1.5 }}
          >
            Aceptar y Continuar
          </Button>
        </Box>

        {/* Información de contacto */}
        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #eee' }}>
          <Typography variant="body2" sx={{ color: '#7f8c8d', textAlign: 'center' }}>
            Para más información o para ejercer sus derechos, contacte a nuestro Oficial de Protección de Datos: 
            <Link href="mailto:dpd@sicag.com" sx={{ ml: 1 }}>dpd@sicag.com</Link>
          </Typography>
          <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', textAlign: 'center', mt: 2 }}>
            © 2026 SICAG - Sistema Integral de Consultoría y Asesoría Gremial. Todos los derechos reservados.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyAgreement;