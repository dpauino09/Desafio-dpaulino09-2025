// Estrutura dos brinquedos válidos
const brinquedosValidos = ['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE'];

// Estrutura dos animais
const animais = {
  Rex: { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
  Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
  Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
  Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
  Bola: { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
  Bebe: { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
  Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
};

// Função para validar brinquedos
function validaBrinquedos(brinquedosArray, brinquedosValidos) {
  if (!brinquedosArray || new Set(brinquedosArray).size !== brinquedosArray.length) {
    return { erro: 'Brinquedo inválido' };
  }

  const todosValidos = brinquedosArray.every(b => brinquedosValidos.includes(b));
  if (!todosValidos) {
    return { erro: 'Brinquedo inválido' };
  }

  return brinquedosArray;
}

// Função para validar animais
function validaAnimais(nomesArray, animaisMap) {
  if (!nomesArray || new Set(nomesArray).size !== nomesArray.length) {
    return { erro: 'Animal inválido' };
  }

  const todosValidos = nomesArray.every(nome => animaisMap[nome]);
  if (!todosValidos) {
    return { erro: 'Animal inválido' };
  }

  return nomesArray;
}

// Função para verificar compatibilidade
function verificaCompatibilidade(animal, brinquedosPessoa) {
  const favoritos = animal.brinquedos;
  
  // A regra de compatibilidade original é a ordem dos brinquedos.
  // Gatos não gostam de dividir, mas isso é verificado depois.
  let indexFavorito = 0;
  for (let i = 0; i < brinquedosPessoa.length; i++) {
    if (brinquedosPessoa[i] === favoritos[indexFavorito]) {
      indexFavorito++;
    }
    if (indexFavorito === favoritos.length) {
      return true; // Encontrou todos os brinquedos favoritos na ordem
    }
  }

  return false;
}

// Classe principal
class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1Array, brinquedosPessoa2Array, ordemAnimaisArray) {
    const brinquedos1 = validaBrinquedos(brinquedosPessoa1Array, brinquedosValidos);
    if (brinquedos1.erro) return brinquedos1;

    const brinquedos2 = validaBrinquedos(brinquedosPessoa2Array, brinquedosValidos);
    if (brinquedos2.erro) return brinquedos2;

    const nomesAnimais = validaAnimais(ordemAnimaisArray, animais);
    if (nomesAnimais.erro) return nomesAnimais;

    const adotadosPessoa1 = [];
    const adotadosPessoa2 = [];
    const resultado = [];

    for (const nome of nomesAnimais) {
      const animal = { ...animais[nome], nome }; // inclui nome no objeto

      // Bloco de regras especiais para o Loco
      if (animal.nome === 'Loco') {
        // Se estiver com companhia (mais de um animal na fila), ele pode ser adotado por quem tiver vaga.
        if (ordemAnimaisArray.length > 1) {
          if (adotadosPessoa1.length < 3) {
            resultado.push(`${nome} - pessoa 1`);
            adotadosPessoa1.push(nome);
          } else if (adotadosPessoa2.length < 3) {
            resultado.push(`${nome} - pessoa 2`);
            adotadosPessoa2.push(nome);
          } else {
            resultado.push(`${nome} - abrigo`);
          }
        } 
        // Se estiver sozinho, ele SEMPRE fica no abrigo.
        else {
          resultado.push(`${nome} - abrigo`);
        }
        continue; // Pula o resto do loop, pois a lógica do Loco já foi tratada
      }
      
      // Lógica para todos os outros animais
      const podePessoa1 = verificaCompatibilidade(animal, brinquedos1);
      const podePessoa2 = verificaCompatibilidade(animal, brinquedos2);
      
      // Regra: Gatos não dividem brinquedos (se ambos podem, ele vai pro abrigo)
      if (animal.tipo === 'gato' && podePessoa1 && podePessoa2) {
        resultado.push(`${nome} - abrigo`);
        continue;
      }
      
      // Regra: se ambos podem adotar, ninguém fica com o animal
      if (podePessoa1 && podePessoa2) {
          resultado.push(`${nome} - abrigo`);
      } else if (podePessoa1 && adotadosPessoa1.length < 3) {
          resultado.push(`${nome} - pessoa 1`);
          adotadosPessoa1.push(nome);
      } else if (podePessoa2 && adotadosPessoa2.length < 3) {
          resultado.push(`${nome} - pessoa 2`);
          adotadosPessoa2.push(nome);
      } else {
          resultado.push(`${nome} - abrigo`);
      }
    }

    return { lista: resultado.sort() };
  }
}

export default AbrigoAnimais;








