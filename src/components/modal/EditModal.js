import s from './Modal.module.css';
import banksSelectors from '../../redux/selectors/bankSelector';
import operations from '../../redux/banksOperations';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { editModalMode } from '../../redux/banksReducer';
const EditModal = ({ closeModal, isEditOpen }) => {
  const bankId = useSelector(banksSelectors.getCurrentBankId);
  const dispatch = useDispatch();
  const banks = useSelector(banksSelectors.getBanks);
  const currentBanks = banks.filter(el => el.id === bankId);
  const [bank, setBank] = useState(currentBanks[0]);
  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name': setBank({ ...bank, name: value });
        break;
      case 'percent': setBank({ ...bank, percent: value });
        break;
      case 'maxCredit': setBank({ ...bank, maxCredit: value });
        break;
      case 'minAvans': setBank({ ...bank, minAvans: value });
        break;
      case 'creditTerm': setBank({ ...bank, creditTerm: value })
        break;
      default: return
    }
  }
  const changeBank = (e) => {
    e.preventDefault();
    const newData = { bankId: bankId, newData: bank };
    dispatch(operations.patchBank(newData))
    dispatch(editModalMode(!isEditOpen))
    setTimeout(dispatch(operations.getBank()), 4000)

  }
  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <form
          type="submit"
          onSubmit={changeBank}
          className={s.form}>
          <label htmlFor="name">Название :</label>
          <input
            id="name"
            placeholder="Имя"
            name='name'
            onChange={onChangeInputHandler}
            value={bank.name} />
          <label htmlFor="percent">Процентная ставка % :</label>
          <input
            id="percent"
            type='number'
            placeholder="Процентная ставка"
            name='percent'
            onChange={onChangeInputHandler}
            value={bank.percent} />
          <label htmlFor="maxCredit">Максимальный кредит :</label>
          <input
            id="maxCredit"
            type='number'
            placeholder="Макс.керидт"
            name='maxCredit'
            onChange={onChangeInputHandler}
            value={bank.maxCredit} />
          <label htmlFor="minAvans">Минимальный авансовый платёж :</label>
          <input
            id="minAvans"
            type='number'
            placeholder="Минимальный авансовый платёж"
            name='minAvans'
            onChange={onChangeInputHandler}
            value={bank.minAvans} />
          <label htmlFor='creditTerm'>Срок кредита :</label>
          <input
            id='creditTerm'
            placeholder='Срок кредита'
            name='creditTerm'
            onChange={onChangeInputHandler}
            value={bank.creditTerm} />
          <button
            type='submit'
            onSubmit={changeBank}
            className={s.button}>Изменить</button>
        </form>
        <button
          type='button'
          onClick={closeModal}
          className={s.button}>Закрыть окно</button>
      </div>
    </div>)
}
export default EditModal;