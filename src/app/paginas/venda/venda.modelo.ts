import { Produto } from '../produto/produto.modelo';

interface Venda {
    codigo: number;
    dataHora: string;
    documentoCliente: number;
    listaProduto: Array<Produto>;
    total: number;
}

export {
    Venda
};
