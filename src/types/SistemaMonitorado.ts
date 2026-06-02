import { Sensor } from "./Sensor";

export interface SistemaMonitorado {
    id: number;
    nome: string;
    status: string;
    descricao: string;
    sensor: Sensor;
}