import { api } from "../services/api";
import { SistemaMonitorado } from "../types/SistemaMonitorado";

export async function getSistemasMonitorados(): Promise<SistemaMonitorado[]> {
    const response = await api.get("/sistemasmonitorados");
    return response.data;
}

export async function getSistemaMonitorados(id: number): Promise<SistemaMonitorado> {
    const response = await api.get(`/sistemasmonitorados/${id}`);
    return response.data;
}

export async function createSistemaMonitorado(
    evento: Omit<SistemaMonitorado, "id">
): Promise<SistemaMonitorado> {
    const response = await api.post("/sistemasmonitorados", evento);
    return response.data;
}

export async function updateSistemaMonitorado(
    id: number,
    evento: SistemaMonitorado
): Promise<SistemaMonitorado> {
    const response = await api.put(`/sistemasmonitorados/${id}`, evento);
    return response.data;
}

export async function deleteSistemaMonitorado(id: number): Promise<void> {
    await api.delete(`/sistemasmonitorados/${id}`);
}