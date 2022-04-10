import { useState } from "react"
import { useDispatch } from "react-redux";
import { connect } from 'react-redux';
import Modal from "../modal/Modal";
import operations from "../../redux/banksOperations";
import { modalMode, editModalMode, calculateModalMode } from '../../redux/banksReducer.js';
import s from './BankAdd.module.css'
import EditModal from "../modal/EditModal";
import CalculateModal from "../modal/CalculateModal";
const BankAdd = ({ isOpen, isEditOpen, isCalculateModalOpen }) => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name': setData({ ...data, name: value });
        break;
      case 'percent': setData({ ...data, percent: value });
        break;
      case 'maxCredit': setData({ ...data, maxCredit: value });
        break;
      case 'minAvans': setData({ ...data, minAvans: value });
        break;
      case 'creditTerm': setData({ ...data, creditTerm: value })
        break;
      default: return
    }
  }
  const addBank = (e) => {
    e.preventDefault()
    const newData = data;
    dispatch(operations.addBank(newData))
    dispatch(modalMode(!isOpen))
  }
  const toogleModal = () => {
    dispatch(modalMode(!isOpen))
  }
  const toogleEditModal = () => {
    dispatch(editModalMode(!isEditOpen))
  }
  const toogleCalculateModal = () => {
    dispatch(calculateModalMode(!isCalculateModalOpen))
  }
  return <div>
    <button
      type="button"
      onClick={toogleModal}
      className={s.button}>Add bank</button>
    {isOpen &&
      <Modal
        isOpen={isOpen}
        onChange={onChangeInputHandler}
        addBank={addBank}
        closeModal={toogleModal}
      />}
    {isEditOpen &&
      <EditModal
        closeModal={toogleEditModal}
        isEditOpen={isEditOpen}
      />
    }
    {isCalculateModalOpen &&
      <CalculateModal
        closeModal={toogleCalculateModal}
      />
    }
  </div>
}
const mapStateToProps = state => {
  return {
    isOpen: state.banks.isOpen,
    isEditOpen: state.banks.isEditOpen,
    isCalculateModalOpen: state.banks.isCalculateModalOpen,
  };
};

export default connect(mapStateToProps)(BankAdd);
