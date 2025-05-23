const contractAddress = "TU_DIRECCION_DEL_CONTRATO"; // reemplaza
const abi = [ 0xbd6a3104146b2dFd8C47dBf91C02636e354A0c2c ];

let provider, signer, contract;

document.getElementById('connectButton').onclick = async () => {
  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    signer = await provider.getSigner();
    document.getElementById('walletAddress').innerText = "Wallet: " + signer.address;
    contract = new ethers.Contract(contractAddress, abi, signer);
  } else {
    alert("Please install MetaMask");
  }
};

document.getElementById('getBalance').onclick = async () => {
  if (!contract) return alert("Connect wallet first.");
  const balance = await contract.balanceOf(signer.address);
  const decimals = await contract.decimals();
  const formatted = ethers.formatUnits(balance, decimals);
  document.getElementById('balance').innerText = `${formatted} MTJ`;
};

document.getElementById('transferButton').onclick = async () => {
  if (!contract) return alert("Connect wallet first.");
  const to = document.getElementById('toAddress').value;
  const amount = document.getElementById('amount').value;
  const decimals = await contract.decimals();
  const tx = await contract.transfer(to, ethers.parseUnits(amount, decimals));
  alert("Transaction sent: " + tx.hash);
};
