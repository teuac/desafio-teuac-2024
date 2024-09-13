import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico', () => {

    test('Deve rejeitar animal inválido', () => {
            const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
            expect(resultado.erro).toBe("Animal inválido");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve rejeitar quantidade inválida', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
            expect(resultado.erro).toBe("Quantidade inválida");
            expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
            expect(resultado.erro).toBe("Não há recinto viável");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {

        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });

    test('Deve retornar erro ao passar quantidade inválida (0)', () => {
        const recintosZoo = new RecintosZoo();
        const resultado = recintosZoo.analisaRecintos('macaco', 0);
        expect(resultado.erro).toBe('Quantidade inválida');
    });
    test('Deve retornar erro ao passar quantidade inválida (número negativo)', () => {
        const recintosZoo = new RecintosZoo();
        const resultado = recintosZoo.analisaRecintos('macaco', -2);
        expect(resultado.erro).toBe('Quantidade inválida');
    });
    test('Deve retornar erro ao passar um animal inválido', () => {
        const recintosZoo = new RecintosZoo();
        const resultado = recintosZoo.analisaRecintos('girafa', 2);
        expect(resultado.erro).toBe('Animal inválido');
    });
    test('Deve impedir que macaco seja colocado em recinto com leão', () => {
        const recintosZoo = new RecintosZoo();
        const resultado = recintosZoo.analisaRecintos('macaco', 2);
        expect(resultado.recintosViaveis).not.toContain('Recinto 5');
    });
    
    test('Deve colocar o macaco no recinto 2, que está vazio e tem bioma compatível', () => {
        const recintosZoo = new RecintosZoo();
        const resultado = recintosZoo.analisaRecintos('macaco', 2);
        expect(resultado.recintosViaveis).toContain('Recinto 2 (espaço livre: 3 total: 5)');
    });
    
    test('Deve retornar erro se tentar colocar leão em recinto com gazelas', () => {
        const recintosZoo = new RecintosZoo();
        const resultado = recintosZoo.analisaRecintos('leao', 1);
        expect(resultado.recintosViaveis).not.toContain('Recinto 3');
    });

});

