import { SistemaMonitorado } from "./SistemaMonitorado";

export interface ModuloComputacional{
    id: number;
    nome: string;
    versao: string;
    status: string;
    sistemaMonitorado: SistemaMonitorado;
}