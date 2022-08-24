class OpcaoDao {
  nomeTabela = 'opcao';

  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS ${this.nomeTabela} (
      id           INTEGER PRIMARY KEY AUTO_INCREMENT,
      codigo       VARCHAR(255) NOT NULL,
      nome         TEXT NOT NULL,
      descricao    TEXT NOT NULL,
      pautaId      INTEGER NOT NULL,
      criadoEm     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      atualizadoEm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT ${this.nomeTabela}_fk_pautaId FOREIGN KEY (pautaId)
      REFERENCES pauta(id) ON UPDATE CASCADE ON DELETE CASCADE
    )`;
    return this.dao.run(sql);
  }

  create(codigo, nome, descricao, pautaId) {
    return this.dao.run(
      `INSERT INTO ${this.nomeTabela} (
        codigo,
        nome,
        descricao,
        pautaId)
      VALUES (?, ?, ?, ?)`,
      [codigo, nome, descricao, pautaId]
    );
  }

  update(id, codigo, nome, descricao, pautaId) {
    return this.dao.run(
      `UPDATE ${this.nomeTabela}
       SET nome = ?,
           descricao = ?,
           pautaId = ?
      WHERE id = ?`,
      [/*codigo, */nome, descricao, pautaId, id]
    );
  }

  delete(id) {
    return this.dao.run(`DELETE FROM ${this.nomeTabela} WHERE id = ?`, [id]);
  }

  getById(id) {
    return this.dao.get(`SELECT * FROM ${this.nomeTabela} WHERE id = ? ORDER BY 2`, [id]);
  }

  getAll() {
    return this.dao.all(`SELECT * FROM ${this.nomeTabela} ORDER BY 2`);
  }

  getByPautaId(id) {
    return this.dao.all(`SELECT * FROM ${this.nomeTabela} WHERE pautaId = ? ORDER BY 2`, [id]);
  }

  getByCodigo(valor) {
    return this.dao.get(`SELECT * FROM ${this.nomeTabela} WHERE codigo = ? ORDER BY 2`, [valor]);
  }

}

module.exports = OpcaoDao;
