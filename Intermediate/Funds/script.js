'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Donald Ashikem Abua',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-12-08T17:01:17.194Z',
    '2021-12-12T23:36:17.929Z',
    '2021-12-14T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-GB',
};

const account2 = {
  owner: 'Desmond Abua',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'David U Abua',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-12-08T17:01:17.194Z',
    '2021-12-12T23:36:17.929Z',
    '2021-12-14T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-GB',
};

const account4 = {
  owner: 'Adafu Abua',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentAcc, bal;
let seconds = 30;

//Computing usernames

const users = function () {
  accounts.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

users();

const formatDate = function (arg) {
  const calcDaysPassed = (date1, date2) =>
    Math.abs(date1 - date2) / (24 * 60 * 60 * 1000);

  const days = calcDaysPassed(new Date(), arg);

  const day = `${arg.getDate()}`.padStart(2, 0);
  const month = `${arg.getMonth()}`.padStart(2, 0);
  const year = `${arg.getFullYear()}`.padStart(2, 0);

  if (days <= 1) return 'Today';
  else if (days > 1 && days <= 2) return 'Yesterday';
  else if (days >= 2 && days <= 7) return `${Math.trunc(days)} days ago`;
  else return `${day}/${month}/${year}`;
};

// Transaction History
const displayMovements = function (acc) {
  const currency = new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  });

  containerMovements.innerHTML = '';
  acc.movements.forEach((mov, index) => {
    const state = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[index]);

    const displayDate = formatDate(date);

    const tabs = `<div class="movements__row">
          <div class="movements__type movements__type--${state}">${
      index + 1
    } ${state}</div>
    <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${currency.format(mov)}</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', tabs);
  });
};

// Current Balance

const currBalance = function (acc) {
  const currency = new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  });
  bal = acc.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${currency.format(bal)}`;
};

// Money In

const moneyIn = function (acc) {
  const currency = new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  });
  const sumIn = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${currency.format(sumIn)}`;
};

// Money out
const moneyOut = function (acc) {
  const currency = new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  });
  const sumOut = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${currency.format(Math.abs(sumOut))}`;
};

// Interest
const interest = function (acc) {
  const currency = new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  });

  const rate = currentAcc.interestRate;
  const int = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * (rate / 100))
    .filter(int => int >= 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = `${currency.format(Math.round(int))}`;
};

// Update UI
const updateUI = function () {
  displayMovements(currentAcc);
  currBalance(currentAcc);
  moneyIn(currentAcc);
  moneyOut(currentAcc);
  interest(currentAcc);
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
  const client = currentAcc.owner.split(' ')[0];
  labelWelcome.textContent = `Welcome back, ${client}`;
};

// Event Handlers
// Login

const now = new Date();

const login = function (e) {
  e.preventDefault();

  currentAcc = accounts.find(
    acc =>
      acc.username === inputLoginUsername.value &&
      acc.pin === +inputLoginPin.value
  );

  if (currentAcc) {
    containerApp.style.opacity = 1;
    const options = {
      minute: 'numeric',
      hour: 'numeric',
      day: 'numeric',
      // weekday: 'short',
      month: 'numeric', //2-digit
      year: 'numeric', //2-digit
    };

    const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAcc.locale,
      options
    ).format(now);

    document.querySelector('.user-details').classList.add('hide');
    if (tick()) {
      clearInterval(timer);
      startTimer();
    } else startTimer();

    updateUI();
  } else {
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }

  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
};

btnLogin.addEventListener('click', login);

// Transfer funds

const transfer = function (e) {
  e.preventDefault();
  const beneficiary = accounts.find(
    acc => inputTransferTo.value === acc?.username
  );

  if (
    inputTransferTo.value !== currentAcc.username &&
    inputTransferAmount.value <= bal &&
    inputTransferAmount.value > 1
  ) {
    beneficiary.movements.push(+inputTransferAmount.value);
    beneficiary.movementsDates.push(now.toISOString());
    currentAcc.movements.push(-inputTransferAmount.value);
    currentAcc.movementsDates.push(now.toISOString());
    updateUI();
  }
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();
};

btnTransfer.addEventListener('click', transfer);

// Loan

const loan = function (e) {
  e.preventDefault();
  const eligibility = currentAcc.movements.some(
    mov => mov >= +inputLoanAmount.value * 0.1
  );
  if (eligibility && +inputLoanAmount.value > 0) {
    currentAcc.movements.push(+inputLoanAmount.value);
    currentAcc.movementsDates.push(now.toISOString());

    updateUI();
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
};

btnLoan.addEventListener('click', loan);

// Close Account

const closeAcc = function (e) {
  e.preventDefault();
  const index = accounts.findIndex(
    acc =>
      acc.username === inputCloseUsername.value &&
      acc.pin === +inputClosePin.value
  );
  accounts.splice(index, 1);
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';
  console.log(accounts);
};

// console.log(closeAcc());

btnClose.addEventListener('click', closeAcc);

// Timer

let timer;
function tick() {
  labelTimer.textContent = '';
  seconds--;
  let mins = String(Math.floor(seconds / 60)).padStart(2, 0);
  let secs = String(seconds % 60).padStart(2, 0);
  if (+secs === 0) {
    clearInterval(timer);
    labelWelcome.textContent = 'Log in to get started';
    containerApp.style.opacity = 0;
  }
  // console.log(secs);
  labelTimer.textContent = `${mins}:${secs}`;
  return true;
}

function startTimer() {
  seconds = 60;
  tick();
  timer = setInterval(tick, 1000);
}

const details = document.querySelector('.user-details');
const lists = document.querySelectorAll('.user-details ul li');
const deets = {
  1: {
    user: 'daa',
    pass: 1111,
  },
  2: {
    user: 'da',
    pass: 2222,
  },
  3: {
    user: 'dua',
    pass: 3333,
  },
  4: {
    user: 'aa',
    pass: 4444,
  },
};

console.log(deets[1]);

details.addEventListener('click', e => {
  if (e.target.matches('.user-details-button'))
    document.querySelector('.user-details').classList.toggle('hide');

  if (e.target.matches('.user-details ul li')) {
    // console.log(e.target);

    lists.forEach(list => {
      if (e.target.dataset.details === list.dataset.details) {
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginUsername.value = deets[+list.dataset.details].user;
        inputLoginPin.value = deets[+list.dataset.details].pass;
        btnLogin.click();
      }
    });
  }
});

//////////////////////
