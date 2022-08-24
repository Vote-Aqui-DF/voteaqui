(function () {
  removeOrfaos = async function (atualLista, anteriorLista, bo) {
    //console.log(`removendo orfaos => atualLista(${atualLista}), anteriorLista(${anteriorLista})`);
    for (var anterior of anteriorLista) {
      encontrou = false;
      for (var atual of atualLista) {
        if (atual.id === anterior.id) {
          encontrou = true;
          break;
        }
      }
      if (!encontrou) {
        await bo.delete(anterior.id);
      }
    }
  };
})();
