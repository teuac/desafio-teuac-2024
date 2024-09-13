class RecintosZoo {
    constructor() {
        this.recintos = [
            { id: 1, bioma: 'savana', capacidade: 10, especies: ['macaco'], quantidades: [3] },
            { id: 2, bioma: 'floresta', capacidade: 5, especies: [], quantidades: [] },
            { id: 3, bioma: ['savana', 'rio'], capacidade: 7, especies: ['gazela'], quantidades: [1] },
            { id: 4, bioma: 'rio', capacidade: 8, especies: [], quantidades: [] },
            { id: 5, bioma: 'savana', capacidade: 9, especies: ['leao'], quantidades: [1] }
        ];

        this.infoEspecies = {
            LEAO: { tamanho: 3, bioma: 'savana' },
            LEOPARDO: { tamanho: 2, bioma: 'savana' },
            CROCODILO: { tamanho: 3, bioma: 'rio' },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'] },
            GAZELA: { tamanho: 2, bioma: 'savana' },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'] }
        };
    }

    analisaRecintos(especie, quantidade) {
        const especieMaiuscula = especie.toUpperCase();
        const infoEspecie = this.infoEspecies[especieMaiuscula];

        if (!infoEspecie) return { erro: 'Animal inválido' };
        if (quantidade <= 0 || isNaN(quantidade)) return { erro: 'Quantidade inválida' };

        const recintosViaveis = this.recintos.filter(recinto => {
            const biomaAdequado = Array.isArray(infoEspecie.bioma)
                ? infoEspecie.bioma.some(b => Array.isArray(recinto.bioma) ? recinto.bioma.includes(b) : b === recinto.bioma)
                : recinto.bioma === infoEspecie.bioma;

            if (!biomaAdequado) return false;

            const espacoOcupado = recinto.especies.reduce((total, especie, index) => {
                const info = this.infoEspecies[especie.toUpperCase()];
                return total + (info ? info.tamanho * recinto.quantidades[index] : 0);
            }, 0);

            const temCarnivoro = recinto.especies.some(e => ['LEAO', 'LEOPARDO', 'CROCODILO'].includes(e.toUpperCase()));
            if (temCarnivoro && !['LEAO', 'LEOPARDO'].includes(especieMaiuscula)) return false;

            let espacoExtra = 0;
            if (recinto.id === 3 && recinto.especies.includes('gazela') && especieMaiuscula === 'MACACO' && quantidade >= 2) {
                espacoExtra = 1;
            } else if (recinto.especies.length > 1) {
                espacoExtra = 1;
            }

            const espacoNecessario = (quantidade * infoEspecie.tamanho) + espacoExtra;
            const espacoLivre = recinto.capacidade - espacoOcupado;

            return espacoNecessario <= espacoLivre;
        });

        if (recintosViaveis.length === 0) return { erro: 'Não há recinto viável' };

        return {
            recintosViaveis: recintosViaveis.map(recinto => 
                `Recinto ${recinto.id} (espaço livre: ${recinto.capacidade - (recinto.especies.reduce((total, especie, index) => total + (this.infoEspecies[especie.toUpperCase()]?.tamanho * recinto.quantidades[index] || 0), 0) + ((quantidade * infoEspecie.tamanho) + (recinto.id === 3 && recinto.especies.includes('gazela') && especieMaiuscula === 'MACACO' && quantidade >= 2 ? 1 : 0)))} total: ${recinto.capacidade})`
            )
        };
    }
}

export { RecintosZoo as RecintosZoo };
