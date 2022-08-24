class VotacaoDao {
  nomeTabela = 'votacao';

  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS ${this.nomeTabela} (
      id                  INTEGER PRIMARY KEY AUTO_INCREMENT,
      codigo              VARCHAR(255) NOT NULL,
      nome                TEXT NOT NULL,
      descricao           TEXT NOT NULL,
      senha               VARCHAR(255) NOT NULL,
      senhaTentativa      INTEGER NOT NULL DEFAULT '0',
      senhaBloqueio       DATETIME DEFAULT NULL,
      senhaTotDesbloqueio INTEGER NOT NULL DEFAULT '0',
      inicio              DATETIME NOT NULL,
      termino             DATETIME NOT NULL,
      criadoEm            TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      atualizadoEm        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      resultado TEXT
    )`;
    return this.dao.run(sql);
  }

  create(codigo, nome, descricao, senha, inicio, termino) {
    return this.dao.run(
      `INSERT INTO ${this.nomeTabela} (
        codigo,
        nome,
        descricao,
        senha,
        inicio,
        termino)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [codigo, nome, descricao, senha, inicio, termino]
    );
  }

  update(id, codigo, nome, descricao, senha, inicio, termino) {
    return this.dao.run(
      `UPDATE ${this.nomeTabela}
       SET nome = ?,
           descricao = ?,
           inicio = ?,
           termino = ?
      WHERE id = ?`,
      [/*codigo, */ nome, descricao, /*senha, */inicio, termino, id]
    );
  }

  delete(id) {
    return this.dao.run(`DELETE FROM ${this.nomeTabela} WHERE id = ?`, [id]);
  }

  getById(id) {
    return this.dao.get(
      `SELECT *,
              DATE_FORMAT(inicio, '%Y-%m-%dT%H:%i') as inicioF,
              DATE_FORMAT(termino, '%Y-%m-%dT%H:%i') as terminoF,
              IF(inicio <= CONVERT_TZ(NOW(), @@SESSION .time_zone, '-3:00')
                    AND termino >= CONVERT_TZ(NOW(), @@SESSION .time_zone, '-3:00'),
                'E',
                IF(inicio > CONVERT_TZ(NOW(), @@SESSION .time_zone, '-3:00'),
                    'F',
                    IF(termino < CONVERT_TZ(NOW(), @@SESSION .time_zone, '-3:00'),
                        'X',
                        NULL))) AS situacao
      FROM ${this.nomeTabela}
      WHERE id = ?`, [id]);
  }

  getAll() {
    return this.dao.all(`SELECT * FROM ${this.nomeTabela}`);
  }

  getByCodigo(valor) {
    return this.dao.get(`SELECT * FROM ${this.nomeTabela} WHERE codigo = ?`, [
      valor,
    ]);
  }

  getByParticipanteIdentificacao(identificacao) {
    return this.dao.all(
      `SELECT   p.nome as participanteNome,
                v.id,
                v.codigo,
                v.nome,
                v.descricao,
                v.inicio,
                v.termino,
                IF(v.inicio <= CONVERT_TZ(NOW(), @@SESSION .time_zone, '-3:00')
                    AND v.termino >= CONVERT_TZ(NOW(), @@SESSION .time_zone, '-3:00'),
                'E',
                IF(v.inicio > CONVERT_TZ(NOW(), @@SESSION .time_zone, '-3:00'),
                    'F',
                    IF(v.termino < CONVERT_TZ(NOW(), @@SESSION .time_zone, '-3:00'),
                        'X',
                        NULL))) AS situacao,
                p.senhaBloqueio,
                p.votou
      FROM      ${this.nomeTabela} v
       JOIN     participante p
       ON       p.votacaoid = v.id
       WHERE    v.inicio BETWEEN DATE_ADD(CONVERT_TZ(NOW(), @@session.time_zone, '-3:00'), INTERVAL -1 MONTH) AND DATE_ADD(CONVERT_TZ(NOW(), @@session.time_zone, '-3:00'), INTERVAL +1 MONTH)
       AND      p.identificacao = ?
       ORDER BY v.inicio`,
      [identificacao]
    );
  }

  getResultado(id) {
    return this.dao.get(
      `SELECT v.resultado, CONVERT_TZ(NOW(), @@session.time_zone, '-3:00') > v.termino as encerrado
       FROM ${this.nomeTabela} v
       WHERE  id = ?`,
      [id]
    );
  }

  updateResultado(id, resultado) {
    return this.dao.run(
      `UPDATE ${this.nomeTabela}
       SET resultado = ?
      WHERE id = ?`,
      [resultado, id]
    );
  }

  getTotalVotantes(id) {
    return this.dao.get(`
    SELECT COUNT(*) AS total
    FROM   participante
    WHERE  votacaoId = ?
    AND    votou = 1`, [id]);
  }

  getTotalParticipantes(id) {
    return this.dao.get(`
    SELECT COUNT(*) AS total
    FROM   participante
    WHERE  votacaoId = ?`, [id]);
  }

  updateSenha(id, senhaNova) {
    return this.dao.run(
      `UPDATE ${this.nomeTabela}
       SET senha = ?
      WHERE id = ?`,
      [senhaNova, id]
    );
  }

  updateSenhaBloqueio(id, registro)  {
    return this.dao.run(
      `UPDATE ${this.nomeTabela}
       SET senhaTentativa = ?,
           senhaBloqueio = ?
       WHERE id = ?`,
      [registro.senhaTentativa, registro.senhaBloqueio, id]
    );
  }

  senhaEmCarencia(id) {
    return this.dao.get(`
    SELECT IFNULL(senhaBloqueio > CONVERT_TZ(NOW(), @@SESSION .time_zone, '-3:00'), 0) AS bloqueado
    FROM ${this.nomeTabela}
    WHERE id = ?`, [id]);
  }

  updateDesbloqueiaSenha(id)  {
    console.log('desbloqueando');
    return this.dao.run(
      `UPDATE ${this.nomeTabela}
       SET senhaTentativa = 0,
           senhaBloqueio = null,
           senhaTotDesbloqueio = senhaTotDesbloqueio + 1
       WHERE id = ?`,
      [id]
    );
  }

}

module.exports = VotacaoDao;
