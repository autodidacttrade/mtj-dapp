window.onload = function () {
  const contractAddress = "0xbd6a3104146b2dFd8C47dBf91C02636e354A0c2c"; // reemplaza
  const abi = [
    "function balanceOf(address) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function transfer(address,uint256) returns (bool)"
  ];

  let provider, signer, contract;

document.getElementById('connectButton').onclick = async () => {
  if (window.ethereum) {
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
  } else {
    alert("Please install MetaMask");
  }
};

  document.getElementById('transferButton').onclick = async () => {
    if (!contract) return alert("Connect wallet first.");
    const to = document.getElementById('toAddress').value;
    const amount = document.getElementById('amount').value;
    const decimals = await contract.decimals();
    const tx = await contract.transfer(to, ethers.parseUnits(amount, decimals));
    alert("Transaction sent: " + tx.hash);
  };
};

