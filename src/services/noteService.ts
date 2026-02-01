import type { Note } from "../types/note";
import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export async function fetchNotes(
    query: string,
    page: number,
): Promise<FetchNotesResponse> {
    try {
        const { data } = await axios.get<FetchNotesResponse>("/notes", {
            params: {
                search: query,
                page: page,
            },
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
            },
        });
        console.log(data);
        return {
            notes: data.notes || [],
            totalPages: data.totalPages || 1,
        };
    } catch (error) {
        console.error("Помилка при завантаженні нотаток:", error);
        throw error;
    }
}

export type CreateNoteInForm = Omit<Note, "id" | "createdAt" | "updatedAt">;

export async function createNote(noteData: CreateNoteInForm): Promise<Note> {
    try {
        const { data } = await axios.post<Note>("/notes", noteData, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
            },
        });
        return data;
    } catch (error) {
        console.error("Error creating note:", error);
        throw error;
    }
}

export async function deleteNote(id: string): Promise<Note> {
    try {
        const { data } = await axios.delete<Note>(`/notes/${id}`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
            },
        });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
