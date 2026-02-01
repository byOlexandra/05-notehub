import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import NoteForm from "../NoteForm/NoteForm";
import Modal from "../Modal/Modal";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { keepPreviousData } from "@tanstack/react-query";

export default function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
        setSearchQuery(value)
        setCurrentPage(1);
    }, 300);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModal = () => setIsOpenModal(true);
    const closeModal = () => setIsOpenModal(false);

    const { data, isFetching } = useQuery({
        queryKey: ["notes", searchQuery, currentPage],
        queryFn: () => fetchNotes(searchQuery, currentPage),
        placeholderData: keepPreviousData,
    });

    const notes = data?.notes || [];
    const totalPages = data?.totalPages || 0;

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox text={searchQuery} onSearch={debouncedSetSearchQuery} />
                {totalPages > 0 && (
                    <Pagination
                        changePage={setCurrentPage}
                        page={currentPage}
                        totalPg={totalPages}
                    />
                )}
                <button className={css.button} onClick={openModal}>
                    Create note +
                </button>
            </header>
            {isFetching && <Loader />}
            {notes.length > 0 && (
                <NoteList notes={notes} />
            )}
            {isOpenModal && (
                <Modal onClose={closeModal}>
                    <NoteForm onClose={closeModal} />
                </Modal>
            )}
        </div>
    );
}
