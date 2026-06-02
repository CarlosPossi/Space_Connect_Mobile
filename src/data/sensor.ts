import { api } from "../services/api";
import { Sensor } from "../types/Sensor";

export async function getSensores(): Promise<Sensor[]> {
    const response = await api.get("/sensores");
    return response.data;
}

export async function getSensor(id: number): Promise<Sensor> {
    const response = await api.get(`/sensores/${id}`);
    return response.data;
}

export async function createSensor(
    evento: Omit<Sensor, "id">
): Promise<Sensor> {
    const response = await api.post("/sensores", evento);
    return response.data;
}

export async function updateSensor(
    id: number,
    evento: Sensor
): Promise<Sensor> {
    const response = await api.put(`/sensores/${id}`, evento);
    return response.data;
}

export async function deleteSensor(id: number): Promise<void> {
    await api.delete(`/sensores/${id}`);
}