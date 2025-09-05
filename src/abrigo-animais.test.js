import AbrigoAnimais from './abrigo-animais';

describe('Abrigo de Animais', () => {
  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      ['CAIXA', 'RATO'],
      ['RATO', 'BOLA'],
      ['Lulu']
    );
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      ['RATO', 'BOLA'],
      ['RATO', 'NOVELO'],
      ['Rex', 'Fofo']
    );
    expect(resultado.lista).toContain('Fofo - abrigo');
    expect(resultado.lista).toContain('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      ['BOLA', 'LASER'],
      ['BOLA', 'NOVELO', 'RATO', 'LASER'],
      ['Mimi', 'Fofo', 'Rex', 'Bola']
    );
    expect(resultado.lista).toContain('Bola - abrigo');
    expect(resultado.lista).toContain('Fofo - pessoa 2');
    expect(resultado.lista).toContain('Mimi - abrigo');
    expect(resultado.lista).toContain('Rex - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test('Gato não deve dividir brinquedos com outro gato', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      ['BOLA'],
      ['BOLA'],
      ['Mimi', 'Zero']
    );
    expect(resultado.lista).toContain('Mimi - abrigo');
    expect(resultado.lista).toContain('Zero - abrigo');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Pessoa não pode adotar mais de três animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      ['BOLA', 'RATO', 'LASER', 'CAIXA'],
      [],
      ['Rex', 'Mimi', 'Fofo', 'Zero']
    );
    const adotadosPessoa1 = resultado.lista.filter(l => l.includes('pessoa 1'));
    expect(adotadosPessoa1.length).toBeLessThanOrEqual(3);
    expect(resultado.erro).toBeFalsy();
  });

  test('Loco aceita brinquedos fora de ordem se tiver companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      ['RATO', 'SKATE'],
      [],
      ['Loco', 'Rex']
    );
    expect(resultado.lista).toContain('Loco - pessoa 1');
    expect(resultado.erro).toBeFalsy();
  });

  test('Loco rejeita brinquedos fora de ordem se estiver sozinho', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      ['SKATE', 'RATO'],
      [],
      ['Loco']
    );
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.lista.length).toBe(1);
    expect(resultado.erro).toBeFalsy();
  });
});