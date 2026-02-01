import css from "./NoteForm.module.css";
import { Formik, type FormikHelpers, Field, ErrorMessage } from "formik";
import { createNote } from "../../services/noteService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";

interface NoteFormProps {
    onClose: () => void;
}

interface NoteFormValues {
    title: string;
    content: string;
    tag: string;
}

const initialValues: NoteFormValues = {
    title: "",
    content: "",
    tag: "ToDo",
};

export default function NoteForm({ onClose }: NoteFormProps) {
    const queryClient = useQueryClient();

    const { mutate: createMutate } = useMutation({
        mutationFn: createNote,

        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            onClose();
        },
    });
    const handleSubmit = (
        values: Note,
        actions: FormikHelpers<NoteFormValues>,
    ) => {
        createMutate(values, {
            onSuccess: () => {
                actions.resetForm();
            },
        });
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor="title">Title</label>
                    <Field id="title" type="text" name="title" className={css.input} />
                    <ErrorMessage name="title" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="content">Content</label>
                    <Field
                        as="textarea"
                        id="content"
                        name="content"
                        rows={8}
                        className={css.textarea}
                    />
                    <ErrorMessage name="content" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="tag">Tag</label>
                    <Field as="select" id="tag" name="tag" className={css.select}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage name="tag" className={css.error} />
                </div>

                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className={css.submitButton} disabled={false}>
                        Create note
                    </button>
                </div>
            </form>
        </Formik>
    );
}
