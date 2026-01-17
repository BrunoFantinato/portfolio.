const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// 1. Tenta pegar as transações salvas no LocalStorage.
// Se não tiver nada, cria um array vazio [].
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Função para adicionar transação
function addTransaction(e) {
  e.preventDefault(); // Evita que o formulário recarregue a página

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Por favor, adicione um texto e um valor');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value // O "+" converte string para número
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage(); // Salva sempre que adiciona

    text.value = '';
    amount.value = '';
  }
}

// Gera um ID aleatório simples
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Adiciona a transação na lista HTML (Visual)
function addTransactionDOM(transaction) {
  // Se for menor que 0 é despesa (-), senão é receita (+)
  const sign = transaction.amount < 0 ? '-' : '+';
  
  const item = document.createElement('li');

  // Adiciona classe baseada no valor (para ficar verde ou vermelho)
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}R$${Math.abs(transaction.amount).toFixed(2)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

// Atualiza o saldo, receitas e despesas
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  balance.innerText = `R$ ${total}`;
  money_plus.innerText = `+ R$ ${income}`;
  money_minus.innerText = `- R$ ${expense}`;
}

// Remove transação pelo ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage(); // Atualiza a memória após remover
  init(); // Recarrega a tela
}

// O SEGREDO: Salva no navegador
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Inicia a aplicação
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);