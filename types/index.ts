export interface Order {
    processed: boolean
    enderecoCliente: object
    whatsappCliente: string
    nomeCliente: string
    reqCode: string
    cart: object
    process: object
}

export interface Profile {
    name: number
    whats: number
    endereco: object
}

export interface Users {
    username: number
    password: number
}

export interface Messaging {
    whatsapp: string
    message: string
}

export interface Itens {
    nome: string;
    nome_url: string;
    descricao: string;
    valor: number;
    preco_por_quilo: boolean;
    galeria: [];
    ativo: boolean;
    agrupador: string;
    _id: string;
}

export interface Categorias {
    nome: string;
    _id: string;
    ordem: number;
    ativo: boolean;
}