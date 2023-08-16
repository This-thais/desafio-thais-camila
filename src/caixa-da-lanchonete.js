class CaixaDaLanchonete {
    constructor() {
        // Define os itens do cardápio e seus preços
        this.cardapio = {
            cafe: { descricao: 'Café', valor: 3.00 },
            chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
            suco: { descricao: 'Suco Natural', valor: 6.20 },
            sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
            queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            salgado: { descricao: 'Salgado', valor: 7.25 },
            combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
        };
        // Definir os métodos de pagamento aceitos
        this.formasDePagamento = ['dinheiro', 'debito', 'credito'];
        // Defina os descontos e taxas para cada forma de pagamento
        this.descontosETaxas = {
            dinheiro: -0.05, // Aplicar desconto de 5% para pagamento em dinheiro
            credito: 0.03 // Aplicar acréscimo de 3% para pagamento a crédito
        };
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        // Verifica se a forma de pagamento é válida
        if (!this.formasDePagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }
        // Verifica se tem algum item no carrinho
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }
        let valorTotal = 0;
        let temCafe = false;
        let temSanduiche = false;
        for (let i = 0; i < itens.length; i++) {
            let [codigo, quantidade] = itens[i].split(',');       
            quantidade = parseInt(quantidade);
            // Verifica se a quantidade é válida
            if (quantidade === 0) {
                return "Quantidade inválida!";
            }
            // Verifica se o código do item é válido
            if (!this.cardapio.hasOwnProperty(codigo)) {
                return "Item inválido!";
            }
            //Verifica se o item é café ou sanduíche
            if (codigo === 'cafe') {
                temCafe = true;
            }
            if (codigo === 'sanduiche') {
                temSanduiche = true;
            }
            //Adiciona o preço do item ao valor total
            valorTotal += this.cardapio[codigo].valor * quantidade;
        }
        //Verifica se há um café ou sanduíche no carrinho quando um item extra é pedido
        if (!temCafe && itens.some(item => item.startsWith('chantily'))) {
            return "Item extra não pode ser pedido sem o principal";
        }
        if (!temSanduiche && itens.some(item => item.startsWith('queijo'))) {
            return "Item extra não pode ser pedido sem o principal";
        }
        //Aplicar descontos ou taxas com base na forma de pagamento
        if (this.descontosETaxas.hasOwnProperty(metodoDePagamento)) {
            valorTotal *= 1 + this.descontosETaxas[metodoDePagamento];
        }
        //Formata e retorna o valor total
        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}
module.exports = { CaixaDaLanchonete };

