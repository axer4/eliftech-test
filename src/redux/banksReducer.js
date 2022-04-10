import { createSlice } from "@reduxjs/toolkit";
import operations from "./banksOperations";
const banksSlice  = createSlice({
    name:'product',
    initialState:{
        data: [],
        isOpen: false,
        isEditOpen: false,
        isCalculateModalOpen:false,
        loading: false,
        error:null,
        currentBankId: null,
    },
    reducers: {
        modalMode : (state,action) => {
            return {...state, isOpen: action.payload}
        },
        editModalMode : (state,action) => {
            return {...state, isEditOpen: action.payload}
        },
        addBankId : (state,action) => {
            return {...state, currentBankId: action.payload}
        },
        calculateModalMode: (state,action) => {
            return {...state,isCalculateModalOpen: action.payload}
        }
    },
    extraReducers: {
 [operations.getBank.pending](state,action) {
     return {
         ...state,
         loading:true,
         error:null,
     }
 },
 [operations.getBank.fulfilled](state,action) {
    return {
        ...state,
        data:action.payload,
        loading:false,
        error:null,
    }
},
[operations.getBank.rejected](state,action) {
    return {
        ...state,
        loading:false,
        error:action.payload,
    }
},
[operations.addBank.pending](state,action) {
    return {
        ...state,
        loading:true,
        error:null,
    }
},
[operations.addBank.fulfilled](state,action) {
    return {
        ...state,
        data: [...state.data, action.payload],
        loading:false,
        error:null,
    }
},
[operations.addBank.rejected](state,action) {
    return {
        ...state,
        loading:false,
        error:action.payload,
    }
},
[operations.onDelete.pending](state,action) {
    return {
        ...state,
        loading:true,
        error:null,
    }
},
[operations.onDelete.fulfilled](state,action) {
    return {
        ...state,
         data:state.data.filter(bank => bank.id !== action.payload),
        loading:false,
        error:null,
    }
},
[operations.onDelete.rejected](state,action) {
    return {
        ...state,
        loading:false,
        error:action.payload,
    }
},
// [operations.patchBank.pending](state,action) {
//     return {
//         ...state,
//         loading:true,
//         error:null,
//     }
// },
// [operations.patchBank.fulfilled](state,action) {
//     return {
//         ...state,
//         data: [...state.data],
//         loading:false,
//         error:null,
//     }
// },
// [operations.patchBank.rejected](state,action) {
//     return {
//         ...state,
//         loading:false,
//         error:action.payload,
//     }
// },
    }
});
export const {modalMode,editModalMode,addBankId,calculateModalMode} = banksSlice.actions;
export default banksSlice.reducer