import axios from 'axios';

let token = '';
const env = 'prod';
const url = env === 'dev' ? 'http://localhost:3000' : 'http://192.168.0.129';

const getSession = async () => {
  console.log(
    '          Iniciando configurações necessarias, aguarde...          \n\n'
  );
  console.log(
    '                            -----------                            \n\n'
  );

  try {
    const { data } = await axios.post(`${url}/login.fcgi`, {
      login: 'admin',
      password: 'admin',
    });

    token = data.session;
    setTimeout(() => {
      console.log(
        '            Iniciando ativação do monitor de acessos...            \n\n'
      );
      console.log(
        '                            -----------                            \n\n'
      );
      activateMonitor();
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      console.log(
        '   Falha na conexão com a catraca, certifique-se de estar em um    \n'
      );
      console.log(
        'computador conectado na mesma rede que a catraca e tente novamente!\n\n'
      );
      setTimeout(() => {}, 5000);
    }, 500);
  }
};

const activateMonitor = async () => {
  try {
    await axios.post(`${url}/set_configuration.fcgi?session=${token}`, {
      monitor: {
        request_timeout: '5000',
        hostname: 'ws.bios.inf.br',
        port: '80',
      },
    });

    setTimeout(() => {
      console.log(
        '        Iniciando redirecionamento do monitor de acessos...        \n\n'
      );
      console.log(
        '                            -----------                            \n\n'
      );
      changeUrl();
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      console.log(
        '   Não foi possivel ativar o monitor de acessos, tente novamente!  \n\n'
      );
      setTimeout(() => {}, 5000);
    }, 500);
  }
};

const changeUrl = async () => {
  try {
    await axios.post(`${url}/set_configuration.fcgi?session=${token}`, {
      monitor: {
        path: 'service',
      },
    });

    setTimeout(() => {
      console.log(
        ' Catraca configurada com sucesso, o programa irá encerrar sozinho \n\n'
      );
      setTimeout(() => {}, 5000);
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      console.log(
        '     Não foi possivel redirecionar o monitor, tente novamente!     \n\n'
      );
      setTimeout(() => {}, 5000);
    }, 500);
  }
};

console.log('\n\n');
console.log(
  '   CONFIGURADOR AUTOMATICO CATRACA CONTROL ID - BIOS INFORMATICA   \n'
);
console.log(
  '-------------------------------------------------------------------\n\n'
);
setTimeout(() => {
  getSession();
}, 1000);
