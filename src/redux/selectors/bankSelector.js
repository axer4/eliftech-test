const getBanks = (state) => state.banks.data;
const getCurrentBankId = (state) => state.banks.currentBankId;
const banksSelectors = {
    getBanks,
    getCurrentBankId
}
export default banksSelectors;