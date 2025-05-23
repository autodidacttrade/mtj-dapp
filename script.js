const contractAddress = "0xbd6a3104146b2dFd8C47dBf91C02636e354A0c2c";
const abi = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function transfer(address,uint256) returns (bool)"
];

let provider, signer, contract;

document.getElementById('connectButton').onclick = async () => {
  try {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }
    provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    signer = await provider.getSigner();
    const address = await signer.getAddress();
    document.getElementById('walletAddress').innerText = "Wallet: " + address;
    contract = new ethers.Contract(contractAddress, abi, signer);

    // Mostrar balance automáticamente al conectar wallet
    const balance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    const formatted = ethers.formatUnits(balance, decimals);
    document.getElementById('balance').innerText = `${formatted} MTJ`;
  } catch (error) {
    console.error("Error al conectar wallet o mostrar balance:", error);
    alert("Error: " + error.message);
  }
};

document.getElementById('getBalance').onclick = async () => {
  try {
    if (!contract) {
      alert("Connect wallet first.");
      return;
    }
    const address = await signer.getAddress();
    const balance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    const formatted = ethers.formatUnits(balance, decimals);
    document.getElementById('balance').innerText = `${formatted} MTJ`;
  } catch (error) {
    console.error("Error al obtener balance:", error);
    alert("Error: " + error.message);
  }
};

document.getElementById('transferButton').onclick = async () => {
  try {
    if (!contract) {
      alert("Connect wallet first.");
      return;
    }
    const to = document.getElementById('toAddress').value;
    const amount = document.getElementById('amount').value;
    if (!to || !amount) {
      alert("Please enter recipient address and amount.");
      return;
    }
    const decimals = await contract.decimals();
    const tx = await contract.transfer(to, ethers.parseUnits(amount, decimals));
    alert("Transaction sent: " + tx.hash);
  } catch (error) {
    console.error("Error al enviar tokens:", error);
    alert("Error: " + error.message);
  }
};