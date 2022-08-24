const express = require('express');
const cors = require('cors');
const path = require('path');
// const bodyParser = require('body-parser');
const nomeApp = process.env.npm_package_name;

const conexaoDbDao = require('./inicia-conexao-db.dao');
const conexaoEmail = require('./inicia-conexao-email');

const UsuarioBo = require('./bo/usuario.bo');
const usuarioBo = new UsuarioBo(conexaoDbDao);
const VotacaoBo = require('./bo/votacao.bo');
const votacaoBo = new VotacaoBo(conexaoDbDao, conexaoEmail);
const ParticipanteBo = require('./bo/participante.bo');
const participanteBo = new ParticipanteBo(conexaoDbDao, votacaoBo);
const VotoBo = require('./bo/voto.bo');
const votoBo = new VotoBo(conexaoDbDao);

const app = express();

// Ativar o CORS
app.use(cors());

// Serve os arquivos estáticos da pasta dist (gerada pelo ng build)
app.use(express.static(`${__dirname}/../dist/${nomeApp}`));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// ampliar o tamanho dos pacotes
// app.use(bodyParser.json({
//   limit: '100mb'

// }));
// app.use(bodyParser.urlencoded({
//   limit: '100mb',
//   parameterLimit: 1000000
// }));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));

// ROTAS DA API

// API Usuario
app.post('/api/usuario/novo', async function (req, res) {
  var registro = req.body;
  res.write(JSON.stringify(await usuarioBo.novo(registro)));
  res.end();
});
app.post('/api/usuario', async function (req, res) {
  var registro = req.body;
  try {
    getConexaoMySql().query('BEGIN');
    var result = await usuarioBo.create(registro);
    res.write(`${result}`);
    getConexaoMySql().query('COMMIT');
  } catch (e) {
    // rollback
    getConexaoMySql().query('ROLLBACK');
    var msg = `Erro ao inserir registro (${e})`;
    console.log(msg);
    res.status(500);
    res.statusMessage = msg;
    res.write(JSON.stringify({ msg }));
  }
  res.end();
});
app.get('/api/usuario/:id', async function (req, res) {
  try {
    var result = await usuarioBo.restore(req.params.id);
    if (result) {
      res.write(JSON.stringify(result));
    } else {
      var msg = `Registro não encontrado`;
      res.statusMessage = msg;
      res.sendStatus(404);
    }
  } catch (e) {
    var msg = `Erro ao carregar registro (${e})`;
    console.log(msg);
    res.status(500);
    res.statusMessage = msg;
    res.write(JSON.stringify({ msg }));
  }
  res.end();
});
app.put('/api/usuario', async function (req, res) {
  var registro = req.body;
  try {
    getConexaoMySql().query('BEGIN');
    var result = await usuarioBo.update(registro);
    res.write(`${result}`);
    getConexaoMySql().query('COMMIT');
  } catch (e) {
    // rollback
    getConexaoMySql().query('ROLLBACK');
    var msg = `Erro ao atualizar registro (${e})`;
    console.log(msg);
    res.status(500);
    res.statusMessage = msg;
    res.write(JSON.stringify({ msg }));
  }
  res.end();
});
app.delete('/api/usuario/:id', async function (req, res) {
  try {
    getConexaoMySql().query('BEGIN');
    await usuarioBo.delete(req.params.id);
    getConexaoMySql().query('COMMIT');
    res.write(`true`);
  } catch (e) {
    getConexaoMySql().query('ROLLBACK');
    var msg = `Erro ao apagar registro (${e})`;
    console.log(msg);
    res.status(500);
    res.statusMessage = msg;
    res.write(JSON.stringify({ msg }));
  }
  res.end();
});
app.get('/api/usuario', async function (req, res) {
  try {
    var result = await usuarioBo.list();
    if (result) {
      res.write(JSON.stringify(result));
    } else {
      var msg = `Registro não encontrado`;
      console.log(msg);
      res.sendStatus(404);
    }
  } catch (e) {
    var msg = `Erro ao carregar registros (${e})`;
    console.log(msg);
    res.status(500);
    res.statusMessage = msg;
    res.write(JSON.stringify({ msg }));
  }
  res.end();
});

// API Votacao
app.post('/api/votacao/novo', async function (req, res) {
  var registro = req.body;
  res.write(JSON.stringify(await votacaoBo.novo(registro)));
  res.end();
});
app.post('/api/votacao', async function (req, res) {
  var registro = req.body;
  try {
    getConexaoMySql().query('BEGIN');
    var result = await votacaoBo.create(registro);
    res.write(`${result}`);
    getConexaoMySql().query('COMMIT');
  } catch (e) {
    // rollback
    getConexaoMySql().query('ROLLBACK');
    var msg = `Erro ao inserir registro (${e})`;
    console.log(msg);
    res.status(500);
    res.statusMessage = msg;
    res.write(JSON.stringify({ msg }));
  }
  res.end();
});
app.get('/api/votacao/resultado/:votacaoId', async function (req, res) {
  try {
    var result = await votacaoBo.resultado(req.params.votacaoId);
    if (result) {
      res.write(JSON.stringify(result));
    } else {
      var msg = `Registro não encontrado`;
      console.log(msg);
      res.sendStatus(404);
    }
  } catch (e) {
    var msg = `Erro ao carregar registro (${e})`;
    console.log(msg);
    res.status(500);
    res.statusMessage = msg;
    res.write(JSON.stringify({ msg }));
  }
  res.end();
});
app.get('/api/votacao/:id/:senha', async function (req, res) {
  try {
    var result = await votacaoBo.restore(req.params.id);
    if (result) {
      if (!(await votacaoBo.validaSenha(req.params.id, req.params.senha))) {
        var msg = `Senha inválida`;
        res.statusMessage = msg;
        res.sendStatus(500);
      } else {
        delete result.senha;
        res.write(JSON.stringify(result));
      }
    } else {
      var msg = `Registro não encontrado`;
      res.statusMessage = msg;
      res.sendStatus(404);
    }
  } catch (e) {
    var msg = `Erro ao carregar registro (${e})`;
    console.log(msg);
    res.status(500);
    res.statusMessage = msg;
    res.write(JSON.stringify({ msg }));
  }
  res.end();
});
app.put('/api/votacao/desbloquear', async function (req, res) {
  var registro = req.body;
  try {
    getConexaoMySql().query('BEGIN');
    console.log(`desbloqueando votacao ${registro.id}`);
    var result = await votacaoBo.updateDesbloqueiaSenha(registro.id);
    console.log(`votacao ${registro.id} desbloqueada`);
    res.write(`${result}`);
    getConexaoMySql().query('COMMIT');
  } catch (e) {
    // rollback
    getConexaoMySql().query('ROLLBACK');
    var msg = `Erro ao atualizar registro (${e})`;
    console.log(msg);
    res.status(500);
    res.statusMessage = msg;
    res.write(JSON.stringify({ msg }));
  }
  res.end();
});
app.put('/api/votacao/:senha', async function (req, res) {
  var registro = req.body;
  try {
    if (!(await votacaoBo.validaSenha(registro.id, req.params.senha))) {
      var msg = `Senha inválida`;
      res.statusMessage = msg;
      res.sendStatus(500);
    } else {
      getConexaoMySql().query('BEGIN');
      var result = await votacaoBo.update(registro);
      res.write(`${result}`);
      getConexaoMySql().query('COMMIT');
    }
  } catch (e) {
    // rollback
    getConexaoMySql().query('ROLLBACK');
    var msg = `Erro ao atualizar registro (${e})`;
    console.log(msg);
    res.status(500);
    res.statusMessage = msg;
    res.write(JSON.stringify({ msg }));
  }
  res.end();
});
app.delete('/api/votacao/:id/:senha', async function (req, res) {
  try {
    if (!(await votacaoBo.validaSenha(req.params.id, req.params.senha))) {
      var msg = `Senha inválida`;
      res.statusMessage = msg;
      res.sendStatus(500);
    } else {
      getConexaoMySql().query('BEGIN');
      await votacaoBo.delete(req.params.id);
      getConexaoMySql().query('COMMIT');
      res.write(`true`);
    }
  } catch (e) {
    getConexaoMySql().query('ROLLBACK');
    var msg = `Erro ao apagar registro (${e})`;
    console.log(msg);
    res.status(500);
    res.statusMessage = msg;
    res.write(JSON.stringify({ msg }));
  }
  res.end();
});
app.get('/api/votacao', async function (req, res) {
  try {
    var result = await votacaoBo.list();
    if (result) {
      res.write(JSON.stringify(result));
    } else {
      var msg = `Registro não encontrado`;
      console.log(msg);
      res.sendStatus(404);
    }
  } catch (e) {
    var msg = `Erro ao carregar registros (${e})`;
    console.log(msg);
    res.status(500);
    res.statusMessage = msg;
    res.write(JSON.stringify({ msg }));
  }
  res.end();
});
app.put(
  '/api/votacao/:id/alterar-senha/:senhaAtual/:senhaNova',
  async function (req, res) {
    try {
      getConexaoMySql().query('BEGIN');
      var result = await votacaoBo.alterarSenha(
        req.params.id,
        req.params.senhaAtual,
        req.params.senhaNova
      );
      res.write(`${result}`);
      getConexaoMySql().query('COMMIT');
    } catch (e) {
      // rollback
      getConexaoMySql().query('ROLLBACK');
      var msg = `Erro ao alterar senha (${e})`;
      console.log(msg);
      res.status(500);
      res.statusMessage = msg;
      res.write(JSON.stringify({ msg }));
    }
    res.end();
  }
);
app.post('/api/votacao/mensagem', async function (req, res) {
  var registro = req.body;
  try {
    var result = await votacaoBo.enviarMensagem(registro);
    console.log(`mensagem ==> [${JSON.stringify(result)}]`);
    res.write(JSON.stringify(result));
  } catch (e) {
    console.log(e);
    res.status(500);
    res.statusMessage = 'Erro no envio das cédulas [' + JSON.stringify(e) + ']';
    res.write(res.statusMessage);
  }
  res.end();
});

// API Participante
app.get('/api/participante/votacao/:votacaoId/pag/:pagina', async function (req, res) {
  try {
      var result = await participanteBo.list(req.params.votacaoId, req.params.pagina);
      if (result) {
          res.write(JSON.stringify(result));
      } else {
          var msg = `Registro não encontrado`;
          console.log(msg);
          res.sendStatus(404);
      }
  } catch (e) {
      var msg = `Erro ao carregar registros (${e})`;
      console.log(msg);
      res.status(500);
      res.statusMessage = msg;
      res.write(JSON.stringify({ msg }));
  }
  res.end();
});
app.get('/api/participante/:identificacao/:votacao', async function (req, res) {
  try {
    var result = await votacaoBo.getByParticipanteIdentificacao(
      req.params.identificacao
    );
    if (result) {
      for (var i = result.votacaoLista.length - 1; i >= 0; i--) {
        if (result.votacaoLista[i].id !== parseInt(req.params.votacao)) {
          result.votacaoLista.splice(i, 1);
        }
      }
      if (result.votacaoLista.length === 1) {
        res.write(JSON.stringify(result));
      } else {
        res.write('');
      }
    }
  } catch (e) {
    var msg = `Erro ao carregar registros (${e})`;
    console.log(msg);
    res.status(500);
    res.statusMessage = msg;
    res.write(JSON.stringify({ msg }));
  }
  res.end();
});
app.get('/api/participante/:identificacao', async function (req, res) {
  try {
    var result = await votacaoBo.getByParticipanteIdentificacao(
      req.params.identificacao
    );
    console.log('result', result);
    if (result) {
      console.log(JSON.stringify(result));
      res.write(JSON.stringify(result));
    } else {
      res.write('');
    }
  } catch (e) {
    var msg = `Erro ao carregar registros (${e})`;
    console.log(msg);
    res.status(500);
    res.statusMessage = msg;
    res.write(JSON.stringify({ msg }));
  }
  res.end();
});
app.put('/api/participante/desbloquear', async function (req, res) {
  var registro = req.body;
  try {
    getConexaoMySql().query('BEGIN');
    console.log(`desbloqueando participante ${registro.id}`);
    await participanteBo.updateDesbloqueiaSenha(registro.id);
    console.log(`participante ${registro.id} desbloqueado`);
    res.write(`true`);
    getConexaoMySql().query('COMMIT');
  } catch (e) {
    // rollback
    getConexaoMySql().query('ROLLBACK');
    var msg = `Erro ao atualizar registro (${e})`;
    console.log(msg);
    res.status(500);
    res.statusMessage = msg;
    res.write(JSON.stringify({ msg }));
  }
  res.end();
});
app.post('/api/participante/:votacaoId', async function (req, res) {
  var registro = req.body;
  try {
      getConexaoMySql().query('BEGIN');
      var result = await participanteBo.create(registro, req.params.votacaoId);
      res.write(`${result}`);
      getConexaoMySql().query('COMMIT');
  } catch (e) {
      getConexaoMySql().query('ROLLBACK');
      var msg = `Erro ao inserir registro (${e})`;
      console.log(msg);
      res.status(500);
      res.statusMessage = msg;
      res.write(JSON.stringify({ msg }));
  }
  res.end();
});
app.put('/api/participante/:votacaoId', async function (req, res) {
  var registro = req.body;
  try {
      getConexaoMySql().query('BEGIN');
      var result = await participanteBo.update(registro, req.params.votacaoId);
      res.write(`${result}`);
      getConexaoMySql().query('COMMIT');
  } catch (e) {
      // rollback
      getConexaoMySql().query('ROLLBACK');
      var msg = `Erro ao atualizar registro (${e})`;
      console.log(msg);
      res.status(500);
      res.statusMessage = msg;
      res.write(JSON.stringify({ msg }));
  }
  res.end();
});
app.delete('/api/participante/:id', async function (req, res) {
  try {
      getConexaoMySql().query('BEGIN');
      await participanteBo.delete(req.params.id);
      getConexaoMySql().query('COMMIT');
      res.write(`true`);
  } catch (e) {
      getConexaoMySql().query('ROLLBACK');
      var msg = `Erro ao apagar registro (${e})`;
      console.log(msg);
      res.status(500);
      res.statusMessage = msg;
      res.write(JSON.stringify({ msg }));
  }
  res.end();
});

// API Voto

app.post('/api/voto/novo', async function (req, res) {
  var registro = req.body;
  res.write(JSON.stringify(await votacaoBo.novo(registro)));
  res.end();
});
app.post('/api/voto/:identificacao/:votacaoId/:senha', async function (
  req,
  res
) {
  var registro = req.body;
  try {
    var participante = await participanteBo.getPodeVotarByIdentificacaoAndVotacaoId(
      req.params.identificacao,
      req.params.votacaoId
    );
    if (!participante) {
      throw new Error('Voto não autorizado!');
    }
    if (
      !(await participanteBo.validaSenha(participante.id, req.params.senha))
    ) {
      const tentativa = await participanteBo.getSenhaStatus(participante.id);
      if (tentativa.senhaBloqueio) {
        throw new Error(`Senha Bloqueada!`);
      } else {
        throw new Error(`Senha inválida! Tentativa ${tentativa.senhaTentativa} de 5`);
      }
    }
    getConexaoMySql().query('BEGIN');
    var result = await votoBo.create(registro);
    await participanteBo.votar(participante.id);
    res.write(`${result}`);
    getConexaoMySql().query('COMMIT');
  } catch (e) {
    // rollback
    getConexaoMySql().query('ROLLBACK');
    var msg = `Erro ao inserir registro (${e})`;
    console.log(msg);
    res.status(500);
    res.statusMessage = msg;
    res.write(JSON.stringify({ msg }));
  }
  res.end();
});

// baixar front-end
app.get('/*', function (req, res) {
  console.log('executando cliente', req.path);
  res.sendFile(path.join(`${__dirname}/../dist/${nomeApp}/index.html`));
});

// Inicia a aplicação pela porta configurada
app.listen(process.env.PORT || 8080);
