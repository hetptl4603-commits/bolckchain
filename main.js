let web3;
let contract;
let adminAccount;

const contractAddress = "0x89FBC6ca8EeaCe332F13585a1B4dAc4C3549539f";  // Replace with deployed contract address
const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "ProductAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "ProductDeleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        }
      ],
      "name": "ProductUpdated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "productCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "products",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "currentOwner",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "addProduct",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "updateProduct",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "deleteProduct",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getProduct",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

window.onload = async function() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        // await window.ethereum.enable();
        loadContract();
        loadAccounts();
    } else {
        alert('Please install MetaMask!');
    }
};

async function loadContract() {
    contract = new web3.eth.Contract(contractABI, contractAddress);
    adminAccount = await contract.methods.admin().call();
    console.log(adminAccount)
}

async function loadAccounts() {
    const accounts = await web3.eth.getAccounts();
    const accountSelect = document.getElementById('account');

    accounts.forEach(account => {
        let option = document.createElement('option');
        option.value = account;
        option.text = account;
        accountSelect.appendChild(option);
    });

    updateAccount();
}

async function updateAccount() {
    const selectedAccount = document.getElementById('account').value;
    const roleSpan = document.getElementById('role-span');
    
    if (selectedAccount.toLowerCase() === adminAccount.toLowerCase()) {
        roleSpan.innerText = 'Admin';
        document.getElementById('admin-actions').style.display = 'block';
    } else {
        roleSpan.innerText = 'Customer';
        document.getElementById('admin-actions').style.display = 'none';
    }
}

async function addProduct() {
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const quantity = document.getElementById('product-quantity').value;
    const account = document.getElementById('account').value;

    try {
        const gas = await contract.methods.addProduct(name, description, quantity).estimateGas({ from: account });
        await contract.methods.addProduct(name, description, quantity)
            .send({ from: account, gas })
            .then(() => alert('Product added successfully'));
    } catch (error) {
        alert(error.message);
    }
}
async function updateProduct() {
    const id = document.getElementById('update-id').value;
    const name = document.getElementById('update-name').value;
    const description = document.getElementById('update-description').value;
    const quantity = document.getElementById('update-quantity').value;
    const account = document.getElementById('account').value;

    try {
        const gas = await contract.methods.updateProduct(id, name, description, quantity).estimateGas({ from: account });
        await contract.methods.updateProduct(id, name, description, quantity)
            .send({ from: account, gas })
            .then(() => alert('Product updated successfully'));
    } catch (error) {
        alert(error.message);
    }
}

async function deleteProduct() {
    const id = document.getElementById('delete-id').value;
    const account = document.getElementById('account').value;

    try {
        const gas = await contract.methods.deleteProduct(id).estimateGas({ from: account });
        await contract.methods.deleteProduct(id)
            .send({ from: account, gas })
            .then(() => alert('Product deleted successfully'));
    } catch (error) {
        alert(error.message);
    }
}

// Get product (Customer/Admin)
async function getProduct() {
    const id = document.getElementById('view-id').value;

    try {
        await contract.methods.getProduct(id)
            .call()
            .then(product => {
                document.getElementById('product-details').innerText =
                    `ID: ${product[0]}, Name: ${product[1]}, Description: ${product[2]}, Quantity: ${product[3]}, Owner: ${product[4]}`;
            });
    } catch (error) {
        alert(error.message);
    }
}
