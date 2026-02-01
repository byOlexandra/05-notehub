import type { Note } from "../types/note";
import axios from "axios";

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

interface FetchNotesResponse {
    results: Note[]
}

export async function fetchNotes(query: string, page: number): Promise<Note[]> {
    const response = await axios.get<FetchNotesResponse>("/notes", {
        params: {
            query: query,
            page: page,
        },
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    })

    const results = response.data.results;
    return results
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

export async function deleteNote({ id }: Note) {
    const { data } = await axios.delete<Note>(`/notes/${id}`);
    return data
}