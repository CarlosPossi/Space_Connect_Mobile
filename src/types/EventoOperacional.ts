import { SistemaMonitorado } from "./SistemaMonitorado";

export interface EventoOperacional {
    id: number;
    descricao: string;
    dataHora: number;
    severidade: "CRITICA" | "ALTA" | "MEDIA"
    sistemaMonitorado: SistemaMonitorado;
}