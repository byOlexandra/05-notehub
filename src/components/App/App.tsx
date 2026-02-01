import css from './App.module.css'
import NoteList from '../NoteList/NoteList'
import SearchBox from '../SearchBox/SearchBox'
import NoteForm from '../NoteForm/NoteForm'
import Modal from '../Modal/Modal'
import { useQuery } from '@tanstack/react-query'
import { fetchNotes } from '../../services/noteService'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'


export default function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedSetSearchQuery = useDebouncedCallback(setSearchQuery, 300);
    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const { data, isLoading } = useQuery({
        queryKey: ['notes', searchQuery, currentPage],
        queryFn: () => fetchNotes(searchQuery, currentPage)
    })

    return (
        <div className={css.app}>
            <header className={css.toolbar}>

                <SearchBox text={searchQuery} onSearch={debouncedSetSearchQuery} />
                {/* Пагінація */}
                <button className={css.button} onClick={handleOpenModal}>Create note +</button>
            </header>
            {data && data.length > 0 ? (
                <NoteList notes={data} />
            ) : (
                !isLoading && <p>Нотаток поки немає. Створіть першу!</p>
            )}
            {openModal && (
                <Modal onClose={() => setOpenModal(false)}>
                    <NoteForm onClose={() => setOpenModal(false)} />
                </Modal>
            )}
        </div>

    )
}

