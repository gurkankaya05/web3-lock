
import './App.css';
import { useState } from 'react';
import {BigNumber, Contract, ethers} from 'ethers';
import './index.css'
import { useLockContract } from './hooks/useLockContract';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { useAllowance } from './hooks/useAllowance';

function App() {

  const lockContract = useLockContract(); // Custom Hook

  const [value,setValue] =useState("")
  const[isLocking,setIsLocking] = useState(false);

  const {approve,allowance,isApproving} = useAllowance();


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


  return (
    <div className='App'>
    <h1> Lock Project </h1>
      <div><input value={value}  placeholder="Enter value"  onChange={(e) => setValue(e.target.value)} /></div>
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
