import s from './Modal.module.css';
const Modal = ({ closeModal, onChange, addBank }) => {
    return (
        <div className={s.overlay}>
            <div className={s.modal}>
                <form
                    type="submit"
                    onSubmit={addBank}
                    className={s.form}>
                    <label htmlFor="name">Название :</label>
                    <input
                        id="name"
                        placeholder="Имя"
                        name='name'
                        onChange={onChange}
                        required />
                    <label htmlFor="percent">Процентная ставка % :</label>
                    <input
                        id="percent"
                        type='number'
                        placeholder="Процентная ставка"
                        name='percent'
                        onChange={onChange}
                        required />
                    <label htmlFor="maxCredit">Максимальный кредит :</label>
                    <input
                        id="maxCredit"
                        type='number'
                        placeholder="Макс.керидт"
                        name='maxCredit'
                        onChange={onChange}
                        required />
                    <label htmlFor="minAvans">Минимальный авансовый платёж :</label>
                    <input
                        id="minAvans"
                        type='number'
                        placeholder="Минимальный авансовый платёж"
                        name='minAvans'
                        onChange={onChange}
                        required />
                    <label htmlFor='creditTerm'>Срок кредита :</label>
                    <input
                        type='date'
                        id='creditTerm'
                        placeholder='Срок кредита'
                        name='creditTerm'
                        onChange={onChange}
                        required />
                    <button
                        type='submit'
                        onSubmit={addBank}
                        className={s.button}>Добавить</button>
                </form>
                <button
                    type='button'
                    onClick={closeModal}
                    className={s.button}>Закрыть окно</button>
            </div>
        </div>
    )
}
export default Modal;