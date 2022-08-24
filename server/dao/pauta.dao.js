class PautaDao {

  nomeTabela = 'pauta';

  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS ${this.nomeTabela} (
      id                INTEGER PRIMARY KEY AUTO_INCREMENT,
      codigo            VARCHAR(255) NOT NULL,
      nome              TEXT NOT NULL,
      descricao         TEXT NOT NULL,
      quantidadeEscolha INTEGER NOT NULL,
      votacaoId         INTEGER NOT NULL,
      criadoEm          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      atualizadoEm      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT        ${this.nomeTabela}_fk_votacaoId FOREIGN KEY (votacaoId)
      REFERENCES        votacao(id) ON UPDATE CASCADE ON DELETE CASCADE
    )`;
    return this.dao.run(sql);
  }

  create(codigo, nome, descricao, quantidadeEscolha, votacaoId) {
    return this.dao.run(
      `INSERT INTO ${this.nomeTabela} (
        codigo,
        nome,
        descricao,
        quantidadeEscolha,
        votacaoId)
      VALUES (?, ?, ?, ?, ?)`,
      [codigo, nome, descricao, quantidadeEscolha, votacaoId]
    );
  }

  update(id, codigo, nome, descricao, quantidadeEscolha, votacaoId) {
    return this.dao.run(
      `UPDATE ${this.nomeTabela}
       SET nome = ?,
           descricao = ?,
           quantidadeEscolha = ?,
           votacaoId = ?
      WHERE id = ?`,
      [/*codigo, */nome, descricao, quantidadeEscolha, votacaoId, id]
    )
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

  getByVotacaoId(id) {
    return this.dao.all(`SELECT * FROM ${this.nomeTabela} WHERE votacaoId = ? ORDER BY 2`, [id]);
  }

  getByCodigo(valor) {
    return this.dao.get(`SELECT * FROM ${this.nomeTabela} WHERE codigo = ? ORDER BY 2`, [valor]);
  }

}

module.exports = PautaDao;
