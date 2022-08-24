const ParticipanteDao = require(`../dao/participante.dao`);
const VotacaoDao = require(`../dao/votacao.dao`);

class ParticipanteBo {
  constructor(dao, votacaoBo) {
    this.dbDao = dao;
    this.dao = new ParticipanteDao(this.dbDao);

    this.votacaoBo = votacaoBo;
    this.votacaoDao = new VotacaoDao(this.dbDao);
  }

  novo(registro) {
    registro = {};
    return registro;
  }

  // API Participante CREATE
  async create(registro, votacaoId) {

    // GERAR SENHA AUTOMATICAMENTE
    registro.senha = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);

    registro.id = (
      await this.dao.create(
        registro.identificacao,
        registro.nome,
        registro.telefone,
        registro.email,
        registro.senha,
        false,
        votacaoId
      )
    ).id;

    return registro.id;
  }

  // API Participante RESTORE
  async restore(id, escondeSenha = true) {
    var result = null;
    var registro = await this.dao.getById(id);
    if (registro) {
      if (escondeSenha) {
        delete registro.senha;
      }
      result = registro;
    }
    return result;
  }

  // API Votacao UPDATE
  async update(registro, id) {

    // resgatar registro anterior
    var anterior = await this.dao.getById(registro.id);

    if (!anterior) {
      throw new Error(`Registro inexistente (${registro.id})`);
    }

    await this.dao.update(
      registro.id,
      registro.identificacao,
      registro.nome,
      registro.telefone,
      registro.email,
      registro.senha,
      false,
      id
    );

    return registro.id;
  }

  // API Votacao DELETE
  async delete(id) {
    await this.dao.delete(id);
  }

  async list(votacaoId, pagina) {
    return await this.getByVotacaoId(votacaoId, pagina);
  }

  async saveLista(id, lista) {
    for (var registro of lista) {
      if (registro.id) {
        await this.update(registro, id);
      } else {
        registro.id = await this.create(registro, id);
      }
    }
  }

  async getByVotacaoId(id, pagina = null) {
    var result = await this.dao.getByVotacaoId(id, pagina);
    for (var registro of result) {
      delete registro.senha;
      delete registro.votacaoId;
    }
    return result;
  }

  async getPodeVotarByIdentificacaoAndVotacaoId(identificacao, votacaoId) {
    var result = await this.dao.getPodeVotarByIdentificacaoAndVotacaoId(
      identificacao,
      votacaoId
    );
    return result;
  }

  async votar(participanteId) {
    var result = await this.dao.votar(participanteId);

    var participante = await this.dao.getById(participanteId);
    var votacao = await this.votacaoDao.getById(participante.votacaoId);

    // enviar email
    var mensagem = {
      senha: null,
      meio: 'email',
      votacao: { id: votacao.id, nome: votacao.nome },
      API_URL: null,
      participanteIdLista: [participante.id],
      msg:
        `<p>Olá ${participante.nome}!,</p>
<p></p>
<p>Obrigado por ter participado da votação <b><u>${votacao.nome}</u></b></p>`
    };
    this.votacaoBo.enviarMensagem(mensagem, false);

    // enviar sms
    mensagem.meio = 'sms';
    mensagem.msg = `Olá ${participante.nome}!. Obrigado por ter participado da votação ${votacao.nome}`.substr(0, 159);
    this.votacaoBo.enviarMensagem(mensagem, false);

    return result;
  }

  async alterarSenha(id, senhaAtual, senhaNova) {
    if (!(await this.validaSenha(id, senhaAtual))) {
      throw new Error('Senha inválida!');
    }
    if (!senhaNova || !senhaNova.trim().length) {
      throw new Error('Senha nula!');
    }
    // this.dao.updateSenha(id, bcrypt.hashSync(senhaNova, 10));
    this.dao.updateSenha(id, senhaNova);
    return true;
  }

  // API Votacao RESTORE
  async validaSenha(id, senha) {
    var registro = await this.dao.getById(id);
    var result = false;
    if (!registro) {
      return result;
    }
    if (senha === registro.senha) {
      result = true;
    } else {
      registro.senhaTentativa++;
      console.log('errou', registro.senhaTentativa);
    }
    if (registro.senhaTentativa >= 5) {
      var bloqueio = new Date(new Date().getTime() + (30 * 60000));
      registro.senhaBloqueio = bloqueio;
      console.log(
        'bloqueando senha ',
        registro.senhaTentativa,
        registro.senhaBloqueio
      );
    }
    console.log('atualizando bloqueio', id, registro);
    this.dao.updateSenhaBloqueio(id, registro);
    var bloqueadoPorTempo = await this.dao.senhaEmCarencia(id);
    console.log(`bloqueadoPorTempo`, JSON.stringify(bloqueadoPorTempo));
    if (bloqueadoPorTempo.bloqueado) {
      console.log(
        'Dentro da carencia do bloqueio ',
        registro.senhaTentativa,
        registro.senhaBloqueio
      );
      throw new Error('Senha BLOQUEADA, aguardando tempo de desbloqueio');
    }
    return result;
  }

  async updateDesbloqueiaSenha(id) {
    this.dao.updateDesbloqueiaSenha(id);
  }

  async getSenhaStatus(id) {
    return await this.dao.getSenhaStatus(id);
  }
}

module.exports = ParticipanteBo;
