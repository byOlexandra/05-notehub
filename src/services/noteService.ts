import type { Note } from "../types/note";
import axios from "axios";

interface FetchNotesResponse {
    results: Note[]
}

export async function fetchNotes(query: string, page: number): Promise<Note[]> {
    const response = await axios.get<FetchNotesResponse>('https://notehub-public.goit.study/api/notes', {
        params: {
            query,
            page,
        },
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    })

    const results = response.data.results;
    return results
}