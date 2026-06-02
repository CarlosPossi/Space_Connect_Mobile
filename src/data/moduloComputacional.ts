import { api } from "../services/api";
import { ModuloComputacional } from "../types/ModuloComputacional";

export async function getModulosComputacionais(): Promise<ModuloComputacional[]> {
    const response = await api.get("/moduloscomputacionais");
    return response.data;
}

export async function getModuloComputacionais(id: number): Promise<ModuloComputacional> {
    const response = await api.get(`/moduloscomputacionais/${id}`);
    return response.data;
}

export async function createModuloComputacional(
    evento: Omit<ModuloComputacional, "id">
): Promise<ModuloComputacional> {
    const response = await api.post("/moduloscomputacionais", evento);
    return response.data;
}

export async function updateModuloComputacional(
    id: number,
    evento: ModuloComputacional
): Promise<ModuloComputacional> {
    const response = await api.put(`/moduloscomputacionais/${id}`, evento);
    return response.data;
}

export async function deleteModuloComputacional(id: number): Promise<void> {
    await api.delete(`/moduloscomputacionais/${id}`);
}