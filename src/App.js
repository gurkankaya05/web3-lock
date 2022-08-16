
import './App.css';
import { useEffect, useState } from 'react';
import {BigNumber, Contract, ethers} from 'ethers';
import './index.css'
import { useLockContract } from './hooks/useLockContract';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { useAllowance } from './hooks/useAllowance';

function App() {

  const lockContract = useLockContract(); // Custom Hook

  const [value,setValue] =useState("")
  const[isLocking,setIsLocking] = useState(false);
  const[account,setCurrentAccount] = useState("")

  const {approve,allowance,isApproving} = useAllowance();

  
  const connectWallet = async () => {
    try {
            if (!window.ethereum) return alert("Please install Metamask!");
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const accounts = await provider.send("eth_requestAccounts");
            console.log("Current Account :", accounts[0]);
            setCurrentAccount(accounts[0]);


    } catch (error) {
            console.log(error);
            throw new Error("No ethereum Object");

    }

  
}
const checkIfWalletConnected = async () => {
  try {
  if (!window.ethereum) return alert("Plase install Metamask");
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const accounts = await provider.send("eth_accounts");
  if (accounts.length) {
  setCurrentAccount(accounts[0])
  }
  else {
  console.log("No Accounts Found.")
  }
  } catch (error) {
  console.log(error)

  }
}

  const lock = async() =>{
    const _value = ethers.utils.parseEther(value);
    setIsLocking(true);
    try {
    const txn = await lockContract.lockTokens(_value);
    await txn.wait();
    setIsLocking(false);
    } catch{
      setIsLocking(false);
      
    }
    console.log(_value);
    
   // await lockContract.lockTokens
  }


  const withdrawToken = async() =>{

    const txn = await lockContract.withdrawTokens();
    await txn.wait();


    
   // await lockContract.lockTokens
  }

  useEffect(() => {
    checkIfWalletConnected();
  },[account])

  return (
    <div className='App'>
    <h1> Lock Project </h1>
      <div><input value={value}  placeholder="Enter value"  onChange={(e) => setValue(e.target.value)} /></div>
      <br/>
      <div><button onClick={connectWallet}>{!account ? "Connect Wallet 🔑" : account}</button></div>
      <br/>
    <div> <button onClick={lock}> Lock Tokens 🔒</button></div>
    <br/>
     <div> <button onClick={approve}>Approve ✅  </button></div>
    <br/>
     <div><button onClick={withdrawToken}>Withdraw 💸</button></div>

      <div>
        <h4>Allowance : {formatEther(allowance)}</h4>
      <p>  {isApproving ? "Approving ☑️ " :""}</p>
      <p>  {isLocking ? "Locking ... 🔐 " :""}</p>
     
      </div>
   </div>
  );
}

export default App;
