import css from './App.module.css'
import NoteList from '../NoteList/NoteList'
import SearchBox from '../SearchBox/SearchBox'
import { useQuery } from '@tanstack/react-query'
import { fetchNotes } from '../../services/noteService'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'


export default function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedSetSearchQuery = useDebouncedCallback(setSearchQuery, 300)


    const { data, isLoading } = useQuery({
        queryKey: ['noteList', searchQuery, currentPage],
        queryFn: () => fetchNotes(searchQuery, currentPage)
    })

    return (
        <div className={css.app}>
            <header className={css.toolbar}>

                <SearchBox text={searchQuery} onSearch={debouncedSetSearchQuery} />
                {/* Пагінація */}
                {/* Кнопка створення нотатки */}
            </header>
            {data && data.length > 0 ? (
                <NoteList notes={data} />
            ) : (
                !isLoading && <p>Нотаток поки немає. Створіть першу!</p>
            )}
        </div>

    )
}

