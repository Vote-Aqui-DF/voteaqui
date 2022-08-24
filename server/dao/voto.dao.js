class VotoDao {

  nomeTabela = 'voto';

  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS ${this.nomeTabela} (
      id            INTEGER PRIMARY KEY AUTO_INCREMENT,
      valor         TEXT NOT NULL,
      votacaoId     INTEGER,
      criadoEm      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      atualizadoEm  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (votacaoId) REFERENCES votacao(id) ON DELETE CASCADE ON UPDATE CASCADE
    )`;
    return this.dao.run(sql);
  }

  create(valor, votacaoId) {
    return this.dao.run(
      `INSERT INTO ${this.nomeTabela} (
        valor, votacaoId)
      VALUES (?, ?)`,
      [valor, votacaoId]
    );
  }

  update(id, valor) {
    throw new Error('Não é permitido a alteração dos dados do voto');
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

  getByVotacaoId(votacaoId) {
    return this.dao.all(`SELECT * FROM ${this.nomeTabela} WHERE votacaoId = ?`, [votacaoId]);
  }

}

module.exports = VotoDao;
