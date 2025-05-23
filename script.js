const contractAddress = "0xbd6a3104146b2dFd8C47dBf91C02636e354A0c2c";

// ABI reducido (solo las funciones que usa la dApp)
const abi = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function transfer(address,uint256) returns (bool)"
];

let provider, signer, contract;

document.getElementById('connectButton').onclick = async () => {
  if (!window.ethereum) {
    alert("Instala MetaMask primero"); return;
  }
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  provider = new ethers.BrowserProvider(window.ethereum);
  signer   = await provider.getSigner();
  document.getElementById('walletAddress').innerText = "Wallet: " + signer.address;
  contract = new ethers.Contract(contractAddress, abi, signer);
};

document.getElementById('getBalance').onclick = async () => {
  if (!contract) return alert("Conecta la wallet primero");
  const bal  = await contract.balanceOf(signer.address);
  const dec  = await contract.decimals();
  document.getElementById('balance').innerText =
    `${ethers.formatUnits(bal, dec)} MTJ`;
};

document.getElementById('transferButton').onclick = async () => {
  if (!contract) return alert("Conecta la wallet primero");
  const to   = document.getElementById('toAddress').value.trim();
  const amt  = document.getElementById('amount').value;
  const dec  = await contract.decimals();
  const tx   = await contract.transfer(to, ethers.parseUnits(amt, dec));
  alert("Tx enviada: " + tx.hash);
};
