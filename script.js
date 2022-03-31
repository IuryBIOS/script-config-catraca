const querystring = require('querystring');
const { Curl } = require('node-libcurl');

let token = '';

const getSession = () => {
  const curlTest = new Curl();
  const terminate = curlTest.close.bind(curlTest);

  console.log('Aguarde. Fazendo login...\n\n----\n');
  curlTest.setOpt(Curl.option.POST, true);
  curlTest.setOpt(Curl.option.URL, 'http://localhost:3000/test');
  curlTest.setOpt(
    Curl.option.POSTFIELDS,
    querystring.stringify({
      login: 'admin',
      password: 'admin',
    })
  );

  curlTest.on('end', function (statusCode, data, headers) {
    const { session } = JSON.parse(data);
    if (session) {
      token = session;
      setTimeout(() => {
        console.log('Login feito com sucesso!\n\n----\n');
      }, 500);
      setTimeout(() => {
        activateMonitor();
      }, 1000);
    } else {
      console.log('Não foi possivel fazer login. Tente novamente.');
    }
    this.close();
  });

  curlTest.on('error', terminate);
  curlTest.perform();
};

const activateMonitor = () => {
  const curlTest = new Curl();
  const terminate = curlTest.close.bind(curlTest);

  console.log('Aguarde. Direcionando a catraca ao servidor da bios\n\n----\n');
  curlTest.setOpt(Curl.option.POST, true);
  curlTest.setOpt(Curl.option.URL, 'http://localhost:3000/monitor');
  curlTest.setOpt(
    Curl.option.POSTFIELDS,
    querystring.stringify({
      monitor: {
        request_timeout: '5000',
        hostname: 'ws.bios.inf.br',
        port: '8083',
      },
    })
  );

  curlTest.on('end', function (statusCode, data, headers) {
    if (statusCode === 200) {
      setTimeout(() => {
        console.log('Catraca direcionada com sucesso!\n\n----\n');
      }, 500);
      setTimeout(() => {
        changeBaseURL();
      }, 1000);
    } else {
      console.log('Não foi possivel direcionar a catraca. Tente novamente.');
    }
    this.close();
  });

  curlTest.on('error', () => {
    console.log('Não foi possivel direcionar a catraca. Tente novamente.');
    terminate;
  });
  curlTest.perform();
};

const changeBaseURL = () => {
  const curlTest = new Curl();
  const terminate = curlTest.close.bind(curlTest);

  console.log('Aguarde. Configurando a rota de envio de informações\n\n----\n');
  curlTest.setOpt(Curl.option.POST, true);
  curlTest.setOpt(Curl.option.URL, 'http://localhost:3000/changeurl');
  curlTest.setOpt(
    Curl.option.POSTFIELDS,
    querystring.stringify({
      monitor: {
        path: 'service',
      },
    })
  );

  curlTest.on('end', function (statusCode, data, headers) {
    if (statusCode === 200) {
      setTimeout(() => {
        console.log('Rota configurada com sucesso!\n\n----\n');
      }, 500);
      setTimeout(() => {
        console.log('Fim de configuração!');
      }, 1000);
    } else {
      console.log('Não foi possivel configurar a rota. Tente novamente.');
    }
    this.close();
  });

  curlTest.on('error', terminate);
  curlTest.perform();
};

getSession();
