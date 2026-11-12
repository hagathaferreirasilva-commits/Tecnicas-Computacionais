
// ========================================
// CONFIGURAÇÕES DE PERSONALIZAÇÃO
// ========================================

const nomes = [
    "Fernanda",
    "Giuliana",
    "Lucas",
    "Eduardo",
    "Gabriel",
    "Juliana"
];

// ========================================
// FUNÇÃO DE SORTEIO
// ========================================

export function aleatorio(lista) {

    if (!Array.isArray(lista) || lista.length === 0) {
        throw new Error("Não foi possível realizar o sorteio: lista vazia ou inválida.");
    }

    const posicao = Math.floor(Math.random() * lista.length);

    return lista[posicao];
}

// ========================================
// IDENTIDADE DO JOGADOR
// ========================================

// O nome é escolhido uma única vez por partida.
export const nome = aleatorio(nomes);
