import { createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/';
const getBank = createAsyncThunk(
    'banks/getBanks',
    async (_, thunkAPI) => {
        try { const {data} = await axios.get('/banks/')
        return data
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
      }});
      const addBank = createAsyncThunk(
          'banks/addBanks',
          async(bank,thunkAPI) => {
              try {
                  const {data} = await axios.post('banks',bank);
                  return data
              }
              catch (error) {
                return thunkAPI.rejectWithValue(error);
              }
          }
      )
      const onDelete = createAsyncThunk(
          'banks/deleteBanks',
          async(bankId,thunkAPI) => {
              try {
                   await axios.delete(`banks/${bankId}`);
                  return bankId
                
              }
              catch(error) {
                  return thunkAPI.rejectWithValue(error)
              }
          }
      )
      const patchBank = createAsyncThunk(
          'banks/patchBanks',
          async({bankId,newData},thunkAPI) => {
              try {
                  const response = await axios.patch(`banks/${bankId}`,newData)
                  console.log(response)
              }
              catch (error) {
                  return thunkAPI.rejectWithValue(error)
              }
          }
      )
const operations = {
    getBank,
    addBank,
    onDelete,
    patchBank
}
export default operations;