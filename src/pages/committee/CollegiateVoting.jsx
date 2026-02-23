// src/pages/committee/CollegiateVoting.jsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  TextField,
  IconButton,
  Tooltip,
  Avatar,
  Divider,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Badge,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material';
import {
  HowToVote as HowToVoteIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Gavel as GavelIcon,
  Schedule as ScheduleIcon,
  Timer as TimerIcon,
  Verified as VerifiedIcon,
  Visibility as VisibilityIcon,
  Assignment as AssignmentIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const colors = {
  primary: {
    dark: '#0D2A4D',
    main: '#133B6B',
    light: '#3A6EA5'
  },
  secondary: {
    main: '#00A8A8',
    light: '#00C2D1'
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
    secondary: '#3A6EA5'
  }
};

const CollegiateVoting = () => {
  const { user, canVote } = useAuth();
  const [votingItems, setVotingItems] = useState([
    {
      id: 1,
      certification: 'PA-2026-00145',
      type: 'PATENTE ADUANAL',
      applicant: 'Luis Rodríguez',
      region: 'Norte',
      priority: 'ALTA',
      technicalReview: {
        completed: true,
        reviewer: 'Carlos Ruiz',
        date: '15/01/2026',
        comments: 'Documentación completa, autenticidad verificada'
      },
      votes: {
        presidente: { status: null, comment: '', votedAt: null },
        vocalA: { status: null, comment: '', votedAt: null },
        vocalB: { status: null, comment: '', votedAt: null }
      },
      status: 'pending',
      expiresAt: '17/01/2026 18:00'
    },
    {
      id: 2,
      certification: 'OS-2025-03421',
      type: 'OPINIÓN SAT',
      applicant: 'Carlos Martínez',
      region: 'Sur',
      priority: 'ALTA',
      technicalReview: {
        completed: true,
        reviewer: 'Carlos Ruiz',
        date: '14/01/2026',
        comments: 'Revisión técnica completada, pendiente validación colegiada'
      },
      votes: {
        presidente: { status: 'approve', comment: 'Cumple con todos los requisitos', votedAt: '14/01/2026 16:30' },
        vocalA: { status: null, comment: '', votedAt: null },
        vocalB: { status: 'reject', comment: 'Fechas inconsistentes', votedAt: '14/01/2026 17:15' }
      },
      status: 'voting',
      expiresAt: '16/01/2026 18:00'
    },
    {
      id: 3,
      certification: 'CP-2024-56789',
      type: 'CÉDULA PROFESIONAL',
      applicant: 'Ana López',
      region: 'Centro',
      priority: 'MEDIA',
      technicalReview: {
        completed: true,
        reviewer: 'Carlos Ruiz',
        date: '13/01/2026',
        comments: 'Documentos verificados, procede validación colegiada'
      },
      votes: {
        presidente: { status: 'approve', comment: 'Procede', votedAt: '13/01/2026 15:20' },
        vocalA: { status: 'approve', comment: 'De acuerdo', votedAt: '13/01/2026 16:00' },
        vocalB: { status: 'approve', comment: 'Sin observaciones', votedAt: '13/01/2026 16:45' }
      },
      status: 'approved',
      result: 'approved',
      completedAt: '13/01/2026 17:00'
    },
    {
      id: 4,
      certification: 'PN-2025-12345',
      type: 'PODER NOTARIAL',
      applicant: 'Pedro Sánchez',
      region: 'Metropolitana',
      priority: 'ALTA',
      technicalReview: {
        completed: true,
        reviewer: 'Carlos Ruiz',
        date: '12/01/2026',
        comments: 'Documentación incompleta, se recomienda revisión colegiada'
      },
      votes: {
        presidente: { status: 'reject', comment: 'Falta documentación notarial', votedAt: '12/01/2026 12:10' },
        vocalA: { status: 'reject', comment: 'No cumple requisitos', votedAt: '12/01/2026 13:30' },
        vocalB: { status: 'reject', comment: 'Documento no válido', votedAt: '12/01/2026 14:45' }
      },
      status: 'rejected',
      result: 'rejected',
      completedAt: '12/01/2026 15:00'
    }
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [voteDialog, setVoteDialog] = useState(false);
  const [voteValue, setVoteValue] = useState('');
  const [voteComment, setVoteComment] = useState('');
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  const pendingVotes = votingItems.filter(item => {
    if (item.status !== 'pending' && item.status !== 'voting') return false;
    
    // Verificar si el usuario ya votó
    if (user?.subRole === 'presidente' && item.votes.presidente.status !== null) return false;
    if (user?.subRole === 'vocal' && user?.name?.includes('Juan') && item.votes.vocalA.status !== null) return false;
    if (user?.subRole === 'vocal' && user?.name?.includes('Laura') && item.votes.vocalB.status !== null) return false;
    
    return true;
  });

  const completedVotes = votingItems.filter(item => item.status === 'approved' || item.status === 'rejected');

  const handleVote = () => {
    if (!voteValue) return;

    const updatedItems = votingItems.map(item => {
      if (item.id === selectedItem.id) {
        const updatedVotes = { ...item.votes };
        
        if (user?.subRole === 'presidente') {
          updatedVotes.presidente = { 
            status: voteValue, 
            comment: voteComment, 
            votedAt: new Date().toLocaleString() 
          };
        } else if (user?.subRole === 'vocal' && user?.name?.includes('Juan')) {
          updatedVotes.vocalA = { 
            status: voteValue, 
            comment: voteComment, 
            votedAt: new Date().toLocaleString() 
          };
        } else if (user?.subRole === 'vocal' && user?.name?.includes('Laura')) {
          updatedVotes.vocalB = { 
            status: voteValue, 
            comment: voteComment, 
            votedAt: new Date().toLocaleString() 
          };
        }

        // Verificar si todos votaron
        const allVoted = 
          updatedVotes.presidente.status !== null &&
          updatedVotes.vocalA.status !== null &&
          updatedVotes.vocalB.status !== null;

        if (allVoted) {
          const approveCount = [
            updatedVotes.presidente.status,
            updatedVotes.vocalA.status,
            updatedVotes.vocalB.status
          ].filter(s => s === 'approve').length;

          return {
            ...item,
            votes: updatedVotes,
            status: 'completed',
            result: approveCount >= 2 ? 'approved' : 'rejected',
            completedAt: new Date().toLocaleString()
          };
        }

        return {
          ...item,
          votes: updatedVotes,
          status: 'voting'
        };
      }
      return item;
    });

    setVotingItems(updatedItems);
    setVoteDialog(false);
    setVoteValue('');
    setVoteComment('');
    
    setNotification({
      show: true,
      type: 'success',
      message: 'Voto registrado exitosamente'
    });
    setTimeout(() => setNotification({ show: false, type: '', message: '' }), 3000);
  };

  const getVoteProgress = (item) => {
    const votes = [
      item.votes.presidente.status,
      item.votes.vocalA.status,
      item.votes.vocalB.status
    ];
    const voted = votes.filter(v => v !== null).length;
    return (voted / 3) * 100;
  };

  const getVoteResult = (item) => {
    if (item.status === 'approved') return 'APROBADA';
    if (item.status === 'rejected') return 'RECHAZADA';
    
    const votes = [
      item.votes.presidente.status,
      item.votes.vocalA.status,
      item.votes.vocalB.status
    ].filter(v => v !== null);
    
    if (votes.length < 3) return 'EN VOTACIÓN';
    
    const approveCount = votes.filter(v => v === 'approve').length;
    return approveCount >= 2 ? 'APROBADA (Mayoría)' : 'RECHAZADA (Mayoría)';
  };

  // Si no tiene permisos de votación
  if (!canVote()) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <LockIcon sx={{ fontSize: 60, color: colors.primary.light, mb: 2 }} />
        <Typography variant="h6" sx={{ color: colors.text.secondary, mb: 1 }}>
          Acceso restringido
        </Typography>
        <Typography variant="body2" sx={{ color: colors.primary.light }}>
          Solo los miembros con derecho a voto (Presidente y Vocales) pueden acceder a este panel.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      height: 'calc(100vh - 64px)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      p: 2,
      bgcolor: '#f8fafc'
    }}>
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ color: colors.primary.dark, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
          <HowToVoteIcon sx={{ color: colors.primary.main }} />
          Votación Colegiada
        </Typography>
        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
          Emite tu voto en las certificaciones validadas técnicamente
        </Typography>
      </Box>

      {/* Notificación */}
      {notification.show && (
        <Alert severity={notification.type} sx={{ mb: 2 }}>
          {notification.message}
        </Alert>
      )}

      {/* Grid de dos columnas */}
      <Grid container spacing={2} sx={{ flex: 1, overflow: 'hidden' }}>
        {/* Columna izquierda - Pendientes de votar */}
        <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Paper elevation={1} sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            overflow: 'hidden',
            border: `1px solid ${colors.primary.light}20`
          }}>
            <Box sx={{ 
              p: 2, 
              borderBottom: `1px solid ${colors.primary.light}`,
              bgcolor: colors.background.subtle
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: colors.primary.dark, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Badge badgeContent={pendingVotes.length} color="error">
                  <GavelIcon sx={{ color: colors.primary.main }} />
                </Badge>
                Pendientes de Votación
              </Typography>
            </Box>

            <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
              <Stack spacing={2}>
                {pendingVotes.map((item) => (
                  <Card 
                    key={item.id}
                    variant="outlined"
                    sx={{ 
                      borderColor: selectedItem?.id === item.id ? colors.primary.main : colors.primary.light,
                      bgcolor: selectedItem?.id === item.id ? 'rgba(19, 59, 107, 0.04)' : 'transparent',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedItem(item)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                            {item.certification}
                          </Typography>
                          <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                            {item.type} • {item.applicant}
                          </Typography>
                        </Box>
                        <Chip 
                          label={item.priority}
                          size="small"
                          sx={{ 
                            bgcolor: item.priority === 'ALTA' ? colors.status.error : colors.status.warning,
                            color: 'white',
                            fontWeight: 600
                          }}
                        />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                            Progreso de votación
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 'bold', color: colors.primary.main }}>
                            {Object.values(item.votes).filter(v => v.status !== null).length}/3 votos
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={getVoteProgress(item)}
                          sx={{ 
                            height: 6, 
                            borderRadius: 3,
                            bgcolor: colors.primary.light,
                            '& .MuiLinearProgress-bar': {
                              bgcolor: colors.primary.main
                            }
                          }}
                        />
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Tooltip title="Presidenta">
                          <Avatar 
                            sx={{ 
                              width: 28, 
                              height: 28, 
                              bgcolor: item.votes.presidente.status === 'approve' ? colors.status.success :
                                       item.votes.presidente.status === 'reject' ? colors.status.error :
                                       colors.primary.light
                            }}
                          >
                            MG
                          </Avatar>
                        </Tooltip>
                        <Tooltip title="Vocal A">
                          <Avatar 
                            sx={{ 
                              width: 28, 
                              height: 28, 
                              bgcolor: item.votes.vocalA.status === 'approve' ? colors.status.success :
                                       item.votes.vocalA.status === 'reject' ? colors.status.error :
                                       colors.primary.light
                            }}
                          >
                            JP
                          </Avatar>
                        </Tooltip>
                        <Tooltip title="Vocal B">
                          <Avatar 
                            sx={{ 
                              width: 28, 
                              height: 28, 
                              bgcolor: item.votes.vocalB.status === 'approve' ? colors.status.success :
                                       item.votes.vocalB.status === 'reject' ? colors.status.error :
                                       colors.primary.light
                            }}
                          >
                            LS
                          </Avatar>
                        </Tooltip>
                      </Box>

                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<HowToVoteIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem(item);
                          setVoteDialog(true);
                        }}
                        disabled={(
                          (user?.subRole === 'presidente' && item.votes.presidente.status !== null) ||
                          (user?.subRole === 'vocal' && user?.name?.includes('Juan') && item.votes.vocalA.status !== null) ||
                          (user?.subRole === 'vocal' && user?.name?.includes('Laura') && item.votes.vocalB.status !== null)
                        )}
                        sx={{ 
                          bgcolor: colors.primary.main,
                          '&:hover': { bgcolor: colors.primary.dark },
                          '&.Mui-disabled': {
                            bgcolor: colors.primary.light
                          }
                        }}
                      >
                        {(
                          (user?.subRole === 'presidente' && item.votes.presidente.status !== null) ||
                          (user?.subRole === 'vocal' && user?.name?.includes('Juan') && item.votes.vocalA.status !== null) ||
                          (user?.subRole === 'vocal' && user?.name?.includes('Laura') && item.votes.vocalB.status !== null)
                        ) ? 'Ya has votado' : 'Emitir Voto'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          </Paper>
        </Grid>

        {/* Columna derecha - Completadas */}
        <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Paper elevation={1} sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            overflow: 'hidden',
            border: `1px solid ${colors.primary.light}20`
          }}>
            <Box sx={{ 
              p: 2, 
              borderBottom: `1px solid ${colors.primary.light}`,
              bgcolor: colors.background.subtle
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: colors.primary.dark, display: 'flex', alignItems: 'center', gap: 1 }}>
                <VerifiedIcon sx={{ color: colors.status.success }} />
                Votaciones Completadas
              </Typography>
            </Box>

            <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
              <Stack spacing={2}>
                {completedVotes.map((item) => (
                  <Card key={item.id} variant="outlined" sx={{ borderColor: colors.primary.light }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                            {item.certification}
                          </Typography>
                          <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                            {item.type} • {item.applicant}
                          </Typography>
                        </Box>
                        <Chip 
                          label={item.result === 'approved' ? 'APROBADA' : 'RECHAZADA'}
                          size="small"
                          sx={{ 
                            bgcolor: item.result === 'approved' ? colors.status.success : colors.status.error,
                            color: 'white',
                            fontWeight: 600
                          }}
                          icon={item.result === 'approved' ? <CheckCircleIcon /> : <CancelIcon />}
                        />
                      </Box>

                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Box>
                          <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                            Presidente
                          </Typography>
                          <Avatar 
                            sx={{ 
                              width: 32, 
                              height: 32,
                              bgcolor: item.votes.presidente.status === 'approve' ? colors.status.success : colors.status.error
                            }}
                          >
                            MG
                          </Avatar>
                          <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mt: 0.5 }}>
                            {item.votes.presidente.status === 'approve' ? 'A favor' : 'En contra'}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                            Vocal A
                          </Typography>
                          <Avatar 
                            sx={{ 
                              width: 32, 
                              height: 32,
                              bgcolor: item.votes.vocalA.status === 'approve' ? colors.status.success : colors.status.error
                            }}
                          >
                            JP
                          </Avatar>
                          <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mt: 0.5 }}>
                            {item.votes.vocalA.status === 'approve' ? 'A favor' : 'En contra'}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                            Vocal B
                          </Typography>
                          <Avatar 
                            sx={{ 
                              width: 32, 
                              height: 32,
                              bgcolor: item.votes.vocalB.status === 'approve' ? colors.status.success : colors.status.error
                            }}
                          >
                            LS
                          </Avatar>
                          <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mt: 0.5 }}>
                            {item.votes.vocalB.status === 'approve' ? 'A favor' : 'En contra'}
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ mb: 2 }} />

                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                        Completada: {item.completedAt}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                        Resultado: {getVoteResult(item)}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Diálogo de votación */}
      <Dialog open={voteDialog} onClose={() => setVoteDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: colors.primary.dark }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HowToVoteIcon sx={{ color: colors.primary.main }} />
            Emitir Voto
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedItem && (
            <>
              <Card variant="outlined" sx={{ p: 2, mb: 3, borderColor: colors.primary.light }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.primary.dark, mb: 1 }}>
                  {selectedItem.certification} - {selectedItem.type}
                </Typography>
                <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                  Solicitante: {selectedItem.applicant}
                </Typography>
                <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                  Revisión técnica: {selectedItem.technicalReview.comments}
                </Typography>
              </Card>

              <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
                <FormLabel component="legend" sx={{ color: colors.primary.dark, mb: 1 }}>
                  Sentido de tu voto:
                </FormLabel>
                <RadioGroup value={voteValue} onChange={(e) => setVoteValue(e.target.value)}>
                  <FormControlLabel 
                    value="approve" 
                    control={<Radio />} 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ThumbUpIcon sx={{ color: colors.status.success }} />
                        <Typography>A FAVOR</Typography>
                      </Box>
                    } 
                  />
                  <FormControlLabel 
                    value="reject" 
                    control={<Radio />} 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ThumbDownIcon sx={{ color: colors.status.error }} />
                        <Typography>EN CONTRA</Typography>
                      </Box>
                    } 
                  />
                </RadioGroup>
              </FormControl>

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Fundamentación del voto"
                placeholder="Explica las razones de tu voto (opcional)"
                value={voteComment}
                onChange={(e) => setVoteComment(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Alert severity="info">
                Tu voto quedará registrado en el historial de auditoría y será parte del acta colegiada.
              </Alert>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVoteDialog(false)}>Cancelar</Button>
          <Button 
            variant="contained" 
            onClick={handleVote}
            disabled={!voteValue}
            sx={{ bgcolor: colors.primary.main }}
          >
            Confirmar Voto
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CollegiateVoting;