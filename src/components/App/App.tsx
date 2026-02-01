import css from './App.module.css'
import NoteList from '../NoteList/NoteList'
import { useQuery } from '@tanstack/react-query'
import { fetchNotes, createNote, deleteNote } from '../../services/noteService'
import { useState } from 'react'

export default function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isFetching, isError } = useQuery({
        queryKey: ['noteList', searchQuery, currentPage],
        queryFn: () => fetchNotes(searchQuery, currentPage)
    })

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <NoteList />
                {/* Компонент SearchBox */}
                {/* Пагінація */}
                {/* Кнопка створення нотатки */}
            </header>
        </div>

    )
}

