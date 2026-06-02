import { api } from "../services/api";
import { EventoOperacional } from "../types/EventoOperacional";

export async function getEventosOperacionais(): Promise<EventoOperacional[]> {
    const response = await api.get("/eventosoperacionais");
    return response.data;
}

export async function getEventoOperacionais(id: number): Promise<EventoOperacional> {
    const response = await api.get(`/eventosoperacionais/${id}`);
    return response.data;
}

export async function createEventosOperacionais(
    evento: Omit<EventoOperacional, "id">
): Promise<EventoOperacional> {
    const response = await api.post("/eventosoperacionais", evento);
    return response.data;
}

export async function updateEventosOperacionais(
    id: number,
    evento: EventoOperacional
): Promise<EventoOperacional> {
    const response = await api.put(`/eventosoperacionais/${id}`, evento);
    return response.data;
}

export async function deleteEventosOperacionais(id: number): Promise<void> {
    await api.delete(`/eventosoperacionais/${id}`);
}