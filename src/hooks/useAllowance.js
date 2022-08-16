import { useEffect, useState } from "react"
import { BigNumber, ethers } from "ethers";
import { GUR_TOKEN, LOCK_ADDRESS } from "../constants/addresses";
import { ERC20 } from "../constants/abi";

export const useAllowance = () => {




const [allowance , setAllowance] = useState(BigNumber.from(0));

const [isApproving ,setIsApproving] = useState(false); // approve control 


const getAllowance = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const _contract = new ethers.Contract(GUR_TOKEN,ERC20,provider);
    const result = await _contract.allowance(signer.getAddress(), LOCK_ADDRESS);  
    setAllowance(result);

}

useEffect(() => {
    getAllowance();
},[])

const approve = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const _contract = new ethers.Contract(GUR_TOKEN,ERC20,signer);
    setIsApproving(true);
    try {
        const txn =  await _contract.approve(LOCK_ADDRESS,ethers.constants.MaxUint256) // Max value
        await  txn.wait(); // Transcation wait.
        getAllowance();
        
    } catch {
        setIsApproving(false);
        
    }
    

   
}

return {isApproving ,allowance,approve} // Export func

}