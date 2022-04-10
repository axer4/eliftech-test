import s from './Modal.module.css';
import banksSelectors from '../../redux/selectors/bankSelector';
import { useSelector } from 'react-redux';
import { useState } from 'react';
const CalculateModal = ({ closeModal }) => {
  const bankId = useSelector(banksSelectors.getCurrentBankId);
  const banks = useSelector(banksSelectors.getBanks);
  const currentBanks = banks.filter(el => el.id === bankId);
  const [bank, setBank] = useState(currentBanks[0]);
  const date = new Date();
  const creditTerm = new Date(bank.creditTerm);
  // Расчет разницы в месяцах между датами
  let diff = (creditTerm.getDate() - date.getDate()) / 30 +
    creditTerm.getMonth() - date.getMonth() +
    (12 * (creditTerm.getFullYear() - date.getFullYear()));
  // 
  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'takeCredit': setBank({ ...bank, takeCredit: value });
        break;
      case 'firstAvans': setBank({ ...bank, firstAvans: value });
        break;
      case 'creditTerm': setBank({ ...bank, creditTerm: value })
        break;
      default: return
    }
  }
  const calculateMonthlyPayment = (e, amountBorrowed, percent, firstAvans, diff) => {
    e.preventDefault();
    if (amountBorrowed > bank.maxCredit) {
      return alert(`Вы просите больше, чем банк может дать. введите сумму не превыщающую${bank.maxCredit}`)
    }
    else if (firstAvans < bank.minAvans) {
      return alert(`Вы вносите слишком маленкий первый взнос, введите сумму больше чем ${bank.minAvans}`)
    }
    const rate = amountBorrowed * percent / 100;
    const n = Math.round(diff)
    const monthlyPayment = ((amountBorrowed - firstAvans) / n) + rate;
    closeModal();
    return alert(`Ежемесячый платёж составляет:${monthlyPayment}`)
  }
  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <form type="submit"
          onSubmit={(e) =>
            calculateMonthlyPayment(e,
              bank.takeCredit,
              bank.percent,
              bank.firstAvans
              , diff)}
          className={s.form}>
          <label htmlFor="name">Название :</label>
          <input
            id="name"
            placeholder="Имя"
            name='name'
            onChange={onChangeInputHandler}
            value={bank.name}
            readOnly />
          <label htmlFor="percent">Процентная ставка % :</label>
          <input
            id="percent"
            type='number'
            placeholder="Процентная ставка"
            name='percent'
            onChange={onChangeInputHandler}
            value={bank.percent}
            readOnly />
          <label htmlFor="takeCredit">Взятый кредит: не больше чем : {bank.maxCredit}</label>
          <input
            id="takeCredit"
            type='number'
            placeholder={bank.maxCredit}
            name='takeCredit'
            onChange={onChangeInputHandler}
            value={bank.takeCredit}
            required />
          <label htmlFor="firstAvans">Первый взнос: не меньше чем : {bank.minAvans}</label>
          <input
            id="firstAvans"
            type='number'
            placeholder={bank.minAvans}
            name='firstAvans'
            onChange={onChangeInputHandler}
            value={bank.firstAvans}
            required />
          <label htmlFor='creditTerm'>Срок кредита :</label>
          <input
            id='creditTerm'
            placeholder='Срок кредита'
            name='creditTerm'
            onChange={onChangeInputHandler}
            value={bank.creditTerm}
            readOnly />
          <button
            type='submit'
            className={s.button}>Рассчитать</button>
        </form>
        <button
          type='button'
          onClick={closeModal}
          className={s.button}>Закрыть окно</button>
      </div>
    </div>
  )
}
export default CalculateModal;