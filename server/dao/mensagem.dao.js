    class MensagemDao {

        nomeTabela = 'mensagem';

        constructor(dao) {
          this.dao = dao;
        }

        createTable() {
          const sql = `
          CREATE TABLE IF NOT EXISTS ${this.nomeTabela} (
            id            INTEGER PRIMARY KEY AUTO_INCREMENT,
            data          TIMESTAMP NOT NULL DEFAULT current_timestamp,
            meio          ENUM('whatsapp', 'email', 'sms') NOT NULL,
            requisicao    TEXT NOT NULL,
            criadoEm      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            atualizadoEm  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            resposta      TEXT NULL
          )`;
          return this.dao.run(sql);
        }

        create(meio, requisicao) {
          return this.dao.run(
            `INSERT INTO ${this.nomeTabela} (
              meio, requisicao)
            VALUES (?, ?)`,
            [meio, requisicao]
          );
        }

        update(id, resposta) {
          return this.dao.run(
            `UPDATE ${this.nomeTabela}
                SET resposta = ?
                WHERE id = ?`,
            [resposta, id]
          );
        }

        delete(id) {
          return this.dao.run(`DELETE FROM ${this.nomeTabela} WHERE id = ?`, [id]);
        }

        getById(id) {
          return this.dao.get(`SELECT * FROM ${this.nomeTabela} WHERE id = ?`, [id]);
        }

        getAll() {
          return this.dao.all(`SELECT * FROM ${this.nomeTabela}`);
        }

      }

      module.exports = MensagemDao;
