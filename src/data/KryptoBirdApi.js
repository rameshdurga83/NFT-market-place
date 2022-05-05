import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from "../abis/KryptoBird.json";


export const getWeb3 = async()=>{
    const provider = await detectEthereumProvider();

    if (provider) {
      window.web3 = provider;
      const web3 = new Web3(provider);
      return Promise.resolve(web3);
    } else {
      console.log("no provider detetcted");
    }
    return null;
}

export const getAccounts = async () =>{
    const web3 = await getWeb3();

    if(web3){
        return await web3.eth.getAccounts()
    }
    return null;
}

export const getContract = async () =>{
    const web3 = await getWeb3();
    const networkId = await web3.eth.net.getId();
    const networkData = KryptoBird.networks[networkId];
    let contract;

    if (networkData) {
        const abi = KryptoBird.abi;
        const address = networkData.address;
        contract = new web3.eth.Contract(abi, address);
      } else {
        window.alert("Smart contract not deployed");
      }
      return Promise.resolve(contract);
}



