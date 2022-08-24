const PautaDao = require('../dao/pauta.dao');
const OpcaoBo = require('./opcao.bo');
require('../util/funcoes');

class PautaBo {

  constructor(dao) {
    this.dbDao = dao;
    this.dao = new PautaDao(this.dbDao);
    this.opcaoBo = new OpcaoBo(this.dbDao);
  }

  novo(registro) {
    registro = {};
    return registro;
  }

  // API Pauta CREATE
  async create (registro, votacaoId) {

    registro.id = (
      await this.dao.create(
        registro.codigo,
        registro.nome,
        registro.descricao,
        registro.quantidadeEscolha,
        votacaoId
      )
    ).id;

    await this.opcaoBo.saveLista(registro.id, registro.opcaoLista);

    return registro.id;
  }

  // API Pauta RESTORE
  async restore (id) {
    var result = null;
    var registro = await this.dao.getById(id);
    if (registro) {
      result = registro;
      result.opcaoLista = await this.opcaoBo.getByPautaId(result.id);
    }
    return result;
  }

  // API Pauta UPDATE
  async update (registro, id) {

    // resgatar registro anterior
    var anterior = await this.restore(registro.id);

    if (!anterior) {
      throw new Error(`Registro inexistente (${registro.id})`);
    }

    await this.dao.update(
      registro.id,
      registro.codigo,
      registro.nome,
      registro.descricao,
      registro.quantidadeEscolha,
      id
    );

    await this.opcaoBo.saveLista(registro.id, registro.opcaoLista);

    await removeOrfaos(registro.opcaoLista, anterior.opcaoLista, this.opcaoBo);

    return registro.id;
  }

  // API Votacao DELETE
  async delete (id) {
    await this.dao.delete(id);
  }

  async saveLista(id, lista) {
    for (var registro of lista) {
      if (registro.id) {
        await this.update(registro, id);
      } else {
        registro.id = await this.create(registro, id);
      }
      await this.opcaoBo.saveLista(registro.id, registro.opcaoLista);
    }
  }

  async getByVotacaoId(id) {
    var result = await this.dao.getByVotacaoId(id);
    for (var registro of result) {
      delete registro.votacaoId;
      registro.opcaoLista = await this.opcaoBo.getByPautaId(registro.id);
    }
    return  result;
  }

}

module.exports = PautaBo;
