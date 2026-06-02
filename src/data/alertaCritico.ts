import { api } from "../services/api";
import { AlertaCritico } from "../types/AlertaCritico";

export async function getAlertasCriticos(): Promise<AlertaCritico[]> {
    const response = await api.get("/alertascriticos");
    return response.data;
}

export async function getAlertaCriticos(id: number): Promise<AlertaCritico> {
    const response = await api.get(`/alertascriticos/${id}`);
    return response.data;
}

export async function createAlertasCriticos(
    evento: Omit<AlertaCritico, "id">
): Promise<AlertaCritico> {
    const response = await api.post("/alertascriticos", evento);
    return response.data;
}

export async function updateAlertasCriticos(
    id: number,
    evento: AlertaCritico
): Promise<AlertaCritico> {
    const response = await api.put(`/alertascriticos/${id}`, evento);
    return response.data;
}

export async function deleteAlertasCriticos(id: number): Promise<void> {
    await api.delete(`/alertascriticos/${id}`);
}