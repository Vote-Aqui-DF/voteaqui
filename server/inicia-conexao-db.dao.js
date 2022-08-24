
const Dao = require('./dao/dao');
const UsuarioDao = require('./dao/usuario.dao');
const VotacaoDao = require('./dao/votacao.dao');
const PautaDao = require('./dao/pauta.dao');
const OpcaoDao = require('./dao/opcao.dao');
const ParticipanteDao = require('./dao/participante.dao');
const VotoDao = require('./dao/voto.dao');
const MensagemDao = require('./dao/mensagem.dao');

const dao = new Dao();

function iniciarBancoDeDados() {
  console.log('iniciando banco de dados');
  const usuarioDao = new UsuarioDao(dao);
  const votacaoDao = new VotacaoDao(dao);
  const pautaDao = new PautaDao(dao);
  const opcaoDao = new OpcaoDao(dao);
  const participanteDao = new ParticipanteDao(dao);
  const votoDao = new VotoDao(dao);
  const mensagemDao = new MensagemDao(dao);

  usuarioDao.createTable()
    .then(() => console.log(`Tabela Usuário verificada!`))
    .catch((err) => {
      console.log(`Error: ${JSON.stringify(err)}`);
    });
  votacaoDao
    .createTable()
    .then(() => {
      console.log(`Tabela Votacao verificada!`);
      votacaoDao.dao
        .get(
          `SELECT COUNT(*) AS EXISTE
           FROM information_schema.statistics
           WHERE TABLE_SCHEMA = DATABASE()
           AND TABLE_NAME = ?
           AND INDEX_NAME = ?`,
          ['votacao', 'VotacaoUq']
        )
        .then((r) => {
          if (!r.EXISTE) {
            votacaoDao.dao
              .run(`CREATE UNIQUE INDEX VotacaoUq ON votacao(codigo)`)
              .then(() => console.log(`Indice VotacaoUq verificado!`))
              .catch((err) => {
                console.log(`Error: ${JSON.stringify(err)}`);
              });
          }
        });
    })
    .catch((err) => {
      console.log(`Error: ${JSON.stringify(err)}`);
    });
  pautaDao
    .createTable()
    .then(() => {
      console.log(`Tabela Pauta verificada!`);
      pautaDao.dao
        .get(
          `SELECT COUNT(*) AS EXISTE
           FROM information_schema.statistics
           WHERE TABLE_SCHEMA = DATABASE()
           AND TABLE_NAME = ?
           AND INDEX_NAME = ?`,
          ['pauta', 'PautaUq']
        )
        .then((r) => {
          if (!r.EXISTE) {
            pautaDao.dao
              .run(`CREATE UNIQUE INDEX PautaUq ON pauta(votacaoId, codigo)`)
              .then(() => console.log(`Indice PautaUq verificado!`))
              .catch((err) => {
                console.log(`Error: ${JSON.stringify(err)}`);
              });
          }
        });
    })
    .catch((err) => {
      console.log(`Error: ${JSON.stringify(err)}`);
    });
  opcaoDao
    .createTable()
    .then(() => {
      console.log(`Tabela Opcao verificada!`);
      pautaDao.dao
        .get(
          `SELECT COUNT(*) AS EXISTE
           FROM information_schema.statistics
           WHERE TABLE_SCHEMA = DATABASE()
           AND TABLE_NAME = ?
           AND INDEX_NAME = ?`,
          ['pauta', 'PautaUq']
        )
        .then((r) => {
          if (!r.EXISTE) {
            opcaoDao.dao
              .run(`CREATE UNIQUE INDEX OpcaoUq ON opcao(pautaId, codigo)`)
              .then(() => console.log(`Indice OpcaoUq criado com sucesso!`))
              .catch((err) => {
                console.log(`Error: ${JSON.stringify(err)}`);
              });
          }
        });
    })
    .catch((err) => {
      console.log(`Error: ${JSON.stringify(err)}`);
    });
  participanteDao
    .createTable()
    .then(() => console.log(`Tabela Participante verificada!`))
    .catch((err) => {
      console.log(`Error: ${JSON.stringify(err)}`);
    });
  votoDao
    .createTable()
    .then(() => console.log(`Tabela Voto verificada!`))
    .catch((err) => {
      console.log(`Error: ${JSON.stringify(err)}`);
    });
  mensagemDao
    .createTable()
    .then(() => console.log(`Tabela Mensagem verificada!`))
    .catch((err) => {
      console.log(`Error: ${JSON.stringify(err)}`);
    });
}

iniciarBancoDeDados();

module.exports = dao;
