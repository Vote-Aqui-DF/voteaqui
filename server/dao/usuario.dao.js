class UsuarioDao {
  nomeTabela = 'usuario';

  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS ${this.nomeTabela} (
      id                   int NOT NULL AUTO_INCREMENT,
      login                varchar(255) NOT NULL,
      senha                varchar(255) DEFAULT NULL,
      foto                 longblob,
      email                varchar(255) DEFAULT NULL,
      perfil               set('Admin','Parceiro','Cliente') NOT NULL DEFAULT 'Cliente',
      ativo                enum('S','N') NOT NULL DEFAULT 'S',
      recuperarSenhaToken  char(6) DEFAULT NULL,
      recuperarSenhaExpira bigint DEFAULT NULL,
      criadoEm             TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      atualizadoEm         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY login_UNIQUE (login),
      UNIQUE KEY email_UNIQUE (email)
    )`;
    return this.dao.run(sql);
  }

  create(
    login,
    senha,
    foto,
    email,
    perfil,
    ativo,
    recuperarSenhaToken,
    recuperarSenhaExpira
  ) {
    return this.dao.run(
      `INSERT INTO ${this.nomeTabela} (
          login,
          senha,
          foto,
          email,
          perfil,
          ativo,
          recuperarSenhaToken,
          recuperarSenhaExpira)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        login,
        senha,
        foto,
        email,
        perfil,
        ativo,
        recuperarSenhaToken,
        recuperarSenhaExpira,
      ]
    );
  }

  update(
    id,
    login,
    senha,
    foto,
    email,
    perfil,
    ativo,
    recuperarSenhaToken,
    recuperarSenhaExpira
  ) {
    return this.dao.run(
      `UPDATE ${this.nomeTabela}
       SET
          login = ?,
          senha = ?,
          foto = ?,
          email = ?,
          perfil = ?,
          ativo = ?,
          recuperarSenhaToken = ?,
          recuperarSenhaExpira = ?
      WHERE id = ?`,
      [
        login,
        senha,
        foto,
        email,
        perfil,
        ativo,
        recuperarSenhaToken,
        recuperarSenhaExpira,
        id,
      ]
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

  getByLogin(valor) {
    return this.dao.get(`SELECT * FROM ${this.nomeTabela} WHERE login = ?`, [
      valor,
    ]);
  }
}

module.exports = UsuarioDao;
