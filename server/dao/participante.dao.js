class ParticipanteDao {
  nomeTabela = 'participante';

  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS ${this.nomeTabela} (
      id                  INTEGER PRIMARY KEY AUTO_INCREMENT,
      identificacao       VARCHAR(255) NOT NULL,
      nome                TEXT NOT NULL,
      telefone            TEXT,
      email               TEXT,
      senha               TEXT NOT NULL,
      senhaTentativa      INTEGER NOT NULL DEFAULT '0',
      senhaBloqueio       DATETIME DEFAULT NULL,
      senhaTotDesbloqueio INTEGER NOT NULL DEFAULT '0',
      votou               BOOLEAN NOT NULL,
      votacaoId           INTEGER NOT NULL,
      criadoEm            TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      atualizadoEm        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT    ${this.nomeTabela}_fk_votacaoId FOREIGN KEY (votacaoId)
      REFERENCES    votacao(id) ON UPDATE CASCADE ON DELETE CASCADE
    )`;
    return this.dao.run(sql);
  }

  create(identificacao, nome, telefone, email, senha, votou, votacaoId) {
    return this.dao.run(
      `INSERT INTO ${this.nomeTabela} (
        identificacao,
        nome,
        telefone,
        email,
        senha,
        votou,
        votacaoId)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [identificacao, nome, telefone, email, senha, 0, votacaoId]
    );
  }

  update(id, identificacao, nome, telefone, email, senha, votou, votacaoId) {
    return this.dao.run(
      `UPDATE ${this.nomeTabela}
       SET identificacao = ?,
           nome = ?,
           telefone = ?,
           email = ?,
           votacaoId = ?
      WHERE id = ?`,
      [identificacao, nome, telefone, email, votacaoId, id]
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

  getByVotacaoId(id, pagina = null) {
    var sql = `SELECT * FROM ${this.nomeTabela}
    WHERE votacaoId = ?
    ORDER BY nome
    ${pagina ? 'limit ' + (pagina * 100) + ', 100': '' }`;
    return this.dao.all(
      sql,
      [id]
    );
  }

  getByIdentificacao(valor) {
    return this.dao.get(
      `SELECT * FROM ${this.nomeTabela} WHERE identificacao = ?`,
      [valor]
    );
  }

  getPodeVotarByIdentificacaoAndVotacaoId(identificacao, votacaoId) {
    return this.dao.get(
      `
      SELECT p.id, p.senha
      FROM   ${this.nomeTabela} p
      JOIN   votacao v
      ON     v.id = p.votacaoId
      WHERE  (CONVERT_TZ(NOW(), @@session.time_zone, '-3:00') BETWEEN v.inicio AND v.termino)
      AND    p.votou = 0
      AND    p.senhaBloqueio IS NULL
      AND    p.identificacao = ?
      AND    v.id = ?`,
      [identificacao, votacaoId]
    );
  }

  votar(id) {
    return this.dao.run(
      `UPDATE ${this.nomeTabela}
       SET votou = 1
       WHERE id = ?`,
      [id]
    );
  }

  updateSenha(id, senhaNova) {
    return this.dao.run(
      `UPDATE ${this.nomeTabela}
       SET senha = ?
      WHERE id = ?`,
      [senhaNova, id]
    );
  }

  updateSenhaBloqueio(id, registro) {
    return this.dao.run(
      `UPDATE ${this.nomeTabela}
       SET senhaTentativa = ?,
           senhaBloqueio = ?
       WHERE id = ?`,
      [registro.senhaTentativa, registro.senhaBloqueio, id]
    );
  }

  senhaEmCarencia(votacaoId) {
    return this.dao.get(
      `
    SELECT IFNULL(senhaBloqueio > CONVERT_TZ(NOW(), @@SESSION .time_zone, '-3:00'), 0) AS bloqueado
    FROM ${this.nomeTabela}
    WHERE id = ?`,
      [votacaoId]
    );
  }

  updateDesbloqueiaSenha(id) {
    return this.dao.run(
      `UPDATE ${this.nomeTabela}
       SET senhaTentativa = 0,
           senhaBloqueio = null,
           senhaTotDesbloqueio = senhaTotDesbloqueio + 1
       WHERE id = ?`,
      [id]
    );
  }

  getSenhaStatus(id) {
    return this.dao.get(
      `
      SELECT
          id,
          senhaTentativa,
          senhaBloqueio,
          senhaTotDesbloqueio
      FROM
          ${this.nomeTabela}
      WHERE
          id = ?`,
      [id]
    );
  }
}

module.exports = ParticipanteDao;
