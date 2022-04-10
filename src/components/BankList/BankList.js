import { connect } from 'react-redux';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import operations from "../../redux/banksOperations";
import { addBankId, editModalMode, calculateModalMode } from '../../redux/banksReducer.js';
import s from './BankList.module.css'
const BankList = ({ dataFromState, isEditOpen, isCalculateModalOpen }) => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        setData(dataFromState)
    }, [dataFromState])
    useEffect(() => {
        dispatch(operations.getBank())
    }, [])
    const toogleEditModal = (bankId) => {
        dispatch(editModalMode(!isEditOpen))
        dispatch(addBankId(bankId))
    }
    const toogleCalculateModal = (bankId) => {
        dispatch(calculateModalMode(!isCalculateModalOpen))
        dispatch(addBankId(bankId))
    }
    return (
        <div>
            <ul className={s.list}>
                {data.map(el =>
                    <li
                        key={el.id}
                        className={s.item}
                    >
                        <p className={s.name}>Название : {el.name}</p>
                        <p className={s.percent}>Процентная ставка %: {el.percent}</p>
                        <p className={s.maxCredit}>Максимальный кредит : {el.maxCredit}</p>
                        <p className={s.minAvans}>Минимальный авансовый платёж : {el.minAvans} </p>
                        <p className={s.creditTerm}>Срок кредита : {el.creditTerm} </p>
                        <button
                            type="button"
                            className={s.button}
                            onClick={() => dispatch(operations.onDelete(el.id))}>Delete</button>
                        <button
                            type='button'
                            className={s.button}
                            onClick={() => toogleEditModal(el.id)}>Edit</button>
                        <button
                            type='button'
                            className={s.button}
                            onClick={() => toogleCalculateModal(el.id)}>Calculate mortgage</button>
                    </li>)}
            </ul>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        dataFromState: state.banks.data,
        isEditOpen: state.banks.isEditOpen,
        isCalculateModalOpen: state.banks.isCalculateModalOpen,
    };
};

export default connect(mapStateToProps)(BankList);
