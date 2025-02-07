document.getElementById('transaction-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const crypto = document.getElementById('crypto').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const price = parseFloat(document.getElementById('price').value);
    const type = document.getElementById('transaction-type').value;

    // Ajouter la transaction à la liste
    addTransaction(crypto, amount, price, type);
    document.getElementById('transaction-form').reset();
    fetchPrices();
});

let transactions = [];

function addTransaction(crypto, amount, price, type) {
    transactions.push({ crypto, amount, price, type });
    displayPortfolio();
}

function displayPortfolio() {
    const portfolioDiv = document.getElementById('portfolio');
    portfolioDiv.innerHTML = '';
    const ul = document.createElement('ul');
    
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.textContent = `${transaction.type === 'achat' ? 'Achat' : 'Vente'}: ${transaction.amount} ${transaction.crypto} à ${transaction.price} USD`;
        ul.appendChild(li);
    });
    
    portfolioDiv.appendChild(ul);
}

async function fetchPrices() {
    const response = await fetch('/api/prices');
    const prices = await response.json();

    const pricesDiv = document.getElementById('prices');
    pricesDiv.innerHTML = '';
    const ul = document.createElement('ul');

    for (let crypto in prices) {
        const li = document.createElement('li');
        li.textContent = `${crypto.toUpperCase()}: ${prices[crypto]} USD`;
        ul.appendChild(li);
    }

    pricesDiv.appendChild(ul);
}

fetchPrices();
