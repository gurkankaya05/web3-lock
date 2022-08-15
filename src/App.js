
import './App.css';
import { useState } from 'react';
import {BigNumber, ethers} from 'ethers';
import './index.css'
import { useLockContract } from './hooks/useLockContract';

function App() {

  const lockContract = useLockContract(); // Custom Hook


  const [totalLockedAmount , setTotalLockedAmount] = useState(BigNumber.from(0));
  const [totalLocker , setTotalLocker] = useState(BigNumber.from(0));
  const [lockerBalance, setLockerBalance] = useState(BigNumber.from(0));
  


  const getTotalLocked = async () => {

    if(!lockContract) return;


  const result =   await lockContract?.totalLocked(); // Contract function
  setTotalLockedAmount(result); 
  console.log(result);
  }

  const lockerCountFn = async() => {
    if(!lockContract) return;

    const lockerCount = await lockContract?.lockerCount();
    setTotalLocker(lockerCount);
    console.log(lockerCount);
  }

  const LockerBalanceFn = async() => {
    if(!lockContract)return;

    const lockerBalance = await lockContract?.lockers("0x45F03039677B9d4eA2579fab8D2D9720e698C93a")
    setLockerBalance(lockerBalance);
    console.log(lockerBalance);
  }
  





 
  return (
    <div className='App'>
      <button onClick={getTotalLocked}>Get Total Locked</button>
      <button onClick={lockerCountFn}>Locker Count</button>
      <button onClick={LockerBalanceFn}>Locker Balance</button>
      {/* 10^18 Format */}
      <h1> Total Locked amount is : {ethers.utils.formatEther(totalLockedAmount)}</h1>   
      <h1> Locker Count is :{ethers.utils.formatEther(totalLocker)} </h1>
      <h1> Locker Balance is : {ethers.utils.formatEther(lockerBalance)}</h1>
    </div>
  );
}

export default App;
