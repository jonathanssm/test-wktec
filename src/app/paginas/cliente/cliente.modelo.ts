interface Endereco {
    cep: number;
    logradouro: string;
    numero: string;
    bairro: string;
    compplemento: string;
    cidade: string;
}

interface Cliente {
    codigo: number;
    nome: string;
    documento: number;
    endereco: Endereco;
    email: string;
    dataNascimento: string;
}

export {
    Cliente,
    Endereco
};
