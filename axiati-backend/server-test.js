const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas básicas para probar el API
app.get('/', (req, res) => {
  res.json({
    message: 'AxiaTI API está funcionando!',
    version: '1.0.0',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/users', (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'Usuario Test 1', email: 'test1@example.com' },
      { id: 2, name: 'Usuario Test 2', email: 'test2@example.com' }
    ]
  });
});

app.get('/api/tickets', (req, res) => {
  res.json({
    tickets: [
      { id: 1, title: 'Ticket Test 1', status: 'open', priority: 'high' },
      { id: 2, title: 'Ticket Test 2', status: 'closed', priority: 'medium' }
    ]
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 AxiaTI API ejecutándose en http://localhost:${PORT}`);
  console.log(`📚 Documentación disponible en http://localhost:${PORT}/api/docs`);
  console.log(`🔍 Health check en http://localhost:${PORT}/api/health`);
});

module.exports = app;
