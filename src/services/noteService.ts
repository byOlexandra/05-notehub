import type { Note } from "../types/note";
import axios from "axios";

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

interface FetchNotesResponse {
    notes: Note[]
}

export async function fetchNotes(query: string, page: number): Promise<Note[]> {
    try {
        const { data } = await axios.get<FetchNotesResponse>("/notes", {
            params: {
                search: query,
                page: page,
            },
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
            }
        })
        console.log(data)
        return data.notes || [];
    } catch (error) {
        console.error("Помилка при завантаженні нотаток:", error);
        throw error;
    }
}

interface CreateNoteResponse {
    title: string;
    content: string;
    tag: string
}

export async function createNote(noteData: Note) {
    const { data } = await axios.post<CreateNoteResponse>("/notes", noteData);
    return data;
}

interface DeleteNoteResponse {
    note: Note;
}

export async function deleteNote(id: string) {
    try {
        const { data } = await axios.delete<DeleteNoteResponse>(`/notes/${id}`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
            }
        });
        return data

    } catch (error) {
        console.log(error)
    }

}