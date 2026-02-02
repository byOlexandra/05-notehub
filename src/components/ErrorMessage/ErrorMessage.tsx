import css from './ErrorMessage.module.css'

export default function ErrorMessage() {
    return (
        <h1 className={css.error}>Error! Try again.</h1>
    )
}