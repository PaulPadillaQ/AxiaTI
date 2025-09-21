const http = require('http');

const PORT = 3001;

const server = http.createServer((req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  // Rutas básicas
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({
      message: 'AxiaTI API está funcionando!',
      version: '1.0.0',
      status: 'OK',
      timestamp: new Date().toISOString()
    }));
  } else if (req.method === 'GET' && req.url === '/api/health') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }));
  } else if (req.method === 'GET' && req.url === '/api/users') {
    res.writeHead(200);
    res.end(JSON.stringify({
      users: [
        { id: 1, name: 'Usuario Test 1', email: 'test1@example.com' },
        { id: 2, name: 'Usuario Test 2', email: 'test2@example.com' }
      ]
    }));
  } else if (req.method === 'GET' && req.url === '/api/tickets') {
    res.writeHead(200);
    res.end(JSON.stringify({
      tickets: [
        { id: 1, title: 'Ticket Test 1', status: 'open', priority: 'high' },
        { id: 2, title: 'Ticket Test 2', status: 'closed', priority: 'medium' }
      ]
    }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Endpoint no encontrado' }));
  }
});

server.listen(PORT, () => {
  console.log(`🚀 AxiaTI API ejecutándose en http://localhost:${PORT}`);
  console.log(`📚 Endpoints disponibles:`);
  console.log(`   GET / - Información del API`);
  console.log(`   GET /api/health - Health check`);
  console.log(`   GET /api/users - Lista de usuarios`);
  console.log(`   GET /api/tickets - Lista de tickets`);
});

module.exports = server;
