const axios = require('axios');

let token = '';
const getSession = async () => {
  console.log('Iniciando configurações necessarias, aguarde...\n\n');
  console.log('----------\n\n');

  try {
    const { data } = await axios.post('http://localhost:3000/login.fcgi', {
      login: 'admin',
      password: 'admin',
    });

    token = data.session;
    setTimeout(() => {
      console.log('Iniciando ativação do monitor de acessos...\n\n');
      console.log('----------\n\n');
      activateMonitor();
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      console.log('Falha na configuração da catraca, tente novamente!\n\n');
      setTimeout(() => {}, 5000);
    }, 500);
  }
};

const activateMonitor = async () => {
  try {
    const { data } = await axios.post(
      'http://localhost:3000/set_configuration.fcgi?session=' + token,
      {
        monitor: {
          request_timeout: '5000',
          hostname: 'https://ws.bios.inf.br',
          port: '8083',
        },
      }
    );

    setTimeout(() => {
      console.log('Iniciando redirecionamento do monitor de acessos...\n\n');
      console.log('----------\n\n');
      changeUrl();
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      console.log(
        'Não foi possivel ativar o monitor de acessos, tente novamente!\n\n'
      );
      setTimeout(() => {}, 5000);
    }, 500);
  }
};

const changeUrl = async () => {
  try {
    const { data } = await axios.post(
      'http://localhost:3000/set_configuration.fcgi?session=' + token,
      {
        monitor: {
          path: 'service',
        },
      }
    );

    setTimeout(() => {
      console.log(
        'Catraca configurada com sucesso, o programa irá fechar em alguns instantes!\n\n'
      );
      setTimeout(() => {}, 5000);
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      console.log(
        'Não foi possivel redirecionar o monitor, tente novamente!\n\n'
      );
      setTimeout(() => {}, 5000);
    }, 500);
  }
};

console.log('CONFIGURADOR AUTOMATICO CATRACA CONTROL ID - BIOS INFORMATICA\n');
console.log(
  '-------------------------------------------------------------\n\n'
);
setTimeout(() => {
  getSession();
}, 1000);
