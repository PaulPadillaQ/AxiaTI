const http = require('http');

// Función para hacer peticiones HTTP
function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          data: JSON.parse(data)
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Probar el API
async function testAPI() {
  console.log('🧪 Probando AxiaTI API...\n');

  try {
    // Probar endpoint principal
    console.log('1. Probando endpoint principal (/)...');
    const mainResponse = await makeRequest('/');
    console.log('✅ Status:', mainResponse.statusCode);
    console.log('📄 Response:', JSON.stringify(mainResponse.data, null, 2));
    console.log('');

    // Probar health check
    console.log('2. Probando health check (/api/health)...');
    const healthResponse = await makeRequest('/api/health');
    console.log('✅ Status:', healthResponse.statusCode);
    console.log('📄 Response:', JSON.stringify(healthResponse.data, null, 2));
    console.log('');

    // Probar usuarios
    console.log('3. Probando usuarios (/api/users)...');
    const usersResponse = await makeRequest('/api/users');
    console.log('✅ Status:', usersResponse.statusCode);
    console.log('📄 Response:', JSON.stringify(usersResponse.data, null, 2));
    console.log('');

    // Probar tickets
    console.log('4. Probando tickets (/api/tickets)...');
    const ticketsResponse = await makeRequest('/api/tickets');
    console.log('✅ Status:', ticketsResponse.statusCode);
    console.log('📄 Response:', JSON.stringify(ticketsResponse.data, null, 2));
    console.log('');

    console.log('🎉 ¡Todas las pruebas del API pasaron exitosamente!');

  } catch (error) {
    console.error('❌ Error probando el API:', error.message);
  }
}

testAPI();
