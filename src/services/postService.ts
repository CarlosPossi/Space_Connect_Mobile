import { api } from "./api";

export async function criarSensor(data: {
    nome: string;
    tipo: string;
    status: string;
    valorAtual: number;
    unidade: string;
}) {
    const response = await api.post(
        "/sensores",
        data
    );

    return response.data;
}

export async function criarEvento(data: {
    descricao: string;
    dataHora: string;
    severidade: string;
    sistemaMonitorado: {
        id: number;
    };
}) {
    const response = await api.post(
        "/eventosoperacionais",
        data
    );

    return response.data;
}

export async function criarSistema(data: {
    nome: string;
    status: string;
    descricao: string;
    sensor: {
        id: number;
    };
}) {
    const response = await api.post(
        "/sistemasmonitorados",
        data
    );

    return response.data;
}

export async function criarModulo(data: {
    nome: string;
    versao: string;
    status: string;
    sistemaMonitorado: {
        id: number;
    };
}) {
    const response = await api.post(
        "/moduloscomputacionais",
        data
    );

    return response.data;
}

export async function criarAlerta(data: {
    mensagem: string;
    nivel: string;
    dataHora: string;
    ativo: boolean;
}) {
    const response = await api.post(
        "/alertascriticos",
        data
    );

    return response.data;
}