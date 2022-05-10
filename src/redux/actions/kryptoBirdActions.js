import * as actionTypes from "./constants/ActionTypes";
import * as KryptoBirdApi from "../../data/KryptoBirdApi";

//action creators
export const setAddress = (address) => {
  return {
    type: actionTypes.SET_ACCOUNT,
    payLoad: address,
  };
};

export const setContract = (contract) => {
  return {
    type: actionTypes.SET_CONTRACT,
    payLoad: contract,
  };
};

export const setNfts = (nfts) => {
  return {
    type: actionTypes.SET_NFT_ARRAY,
    payLoad: nfts,
  };
};

export const setTotalSupply = (totalSupply) => {
  return {
    type: actionTypes.SET_TOTAL_SUPPLY,
    payLoad: totalSupply,
  };
};

export const addMintedNFT = (kbird) => {
  return {
    type: actionTypes.MINT_NFT,
    payLoad: kbird,
  };
};

export const setCurrentKbird = (kbird) => {
  return {
    type: actionTypes.SET_CURRENT_KBIRD,
    payLoad: kbird,
  };
};

export const updateCurrentKbird = (to) => {
  return {
    type: actionTypes.TRANSFER_NFT,
    payLoad: to,
  };
};

//dispatching actions
export const getAddress = () => {
  return async (dispatch) => {
    try {
      const accounts = await KryptoBirdApi.getAccounts();
      dispatch(setAddress(accounts[0]));
    } catch (err) {
      console.error(err);
    }
  };
};

export const getContract = () => {
  return async (dispatch) => {
    try {
      const contract = await KryptoBirdApi.getContract();
      dispatch(setContract(contract));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getNfts = () => {
  return async (dispatch) => {
    try {
      const contract = await KryptoBirdApi.getContract();
      const kryptoBirdz = await contract.methods.getKryptoBirdz().call();
      dispatch(setNfts(kryptoBirdz));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getTotalSupply = () => {
  return async (dispatch) => {
    try {
      const contract = await KryptoBirdApi.getContract();
      const totalSupply = await contract.methods.totalSupply().call();
      dispatch(setTotalSupply(parseInt(totalSupply)));
    } catch (err) {
      console.log(err);
    }
  };
};

export const mintNFT = (kryptoBird) => {
  return async (dispatch) => {
    try {
      const contract = await KryptoBirdApi.getContract();
      const accounts = await KryptoBirdApi.getAccounts();
      const account = accounts[0];
      await contract.methods
        .mint(kryptoBird)
        .send({
          from: account,
          gas: "1000000",
        })
        .once("receipt", (receipt) => {
          dispatch(addMintedNFT(kryptoBird));
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const setNFTDetails = (index, name) => {
  return async (dispatch) => {
    try {
      const contract = await KryptoBirdApi.getContract();
      const tokenId = await contract.methods.tokenByIndex(index).call();
      const owner = await contract.methods.ownerOf(tokenId).call();
      const approved = await contract.methods.getApproved(tokenId).call();
      const kbird = {
        name,
        tokenId,
        owner,
        approved,
      };
      dispatch(setCurrentKbird(kbird));
    } catch (err) {
      console.log(err);
    }
  };
};

export const transferNFT = (kryptoBird, to) => {
  return async (dispatch) => {
    try {
      const contract = await KryptoBirdApi.getContract();
      const accounts = await KryptoBirdApi.getAccounts();
      const account = accounts[0];

      await contract.methods
        .transferFrom(kryptoBird.owner, to, kryptoBird.tokenId)
        .send({
          from: account,
        })
        .once("receipt", (receipt) => {
          dispatch(updateCurrentKbird(to));
        });
    } catch (err) {
      console.log(err);
    }
  };
};
