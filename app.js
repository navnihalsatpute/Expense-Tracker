let balance = document.querySelector('#balance');
const editBalance = document.querySelector('#editBalance');
const newBalance = document.querySelector('#newBalance');
const newBalancePage = document.querySelector('#newBalancePage');
const saveBalance = document.querySelector('#saveBalance');

editBalance.addEventListener('click', function(){
    newBalancePage.classList.toggle('show');
})

newBalancePage.addEventListener('submit', function(e){e.preventDefault();});

saveBalance.addEventListener('click', function(){
    balance.textContent = parseInt(newBalance.value);
    newBalancePage.classList.toggle('show');
});

const dateInput = document.querySelector('#date');
const timeInput = document.querySelector('#time');

const currentDate = new Date();
const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
const formattedTime = `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;

dateInput.value = formattedDate;
timeInput.value = formattedTime;

const historyPage = document.querySelector('#historyPage');

const addExpenseForm = document.querySelector('#addExpenseForm');
addExpenseForm.addEventListener('submit', function(e){
    e.preventDefault();
    let currentBalance = parseInt(balance.textContent);
    const li = document.createElement('li');
    const b = document.createElement('b');
    const date = addExpenseForm.elements.date.value;
    const time = addExpenseForm.elements.time.value;
    const amount = parseInt(addExpenseForm.elements.amount.value);
    const type = addExpenseForm.elements.type.value;
    const description = addExpenseForm.elements.description.value;
    b.append(date);
    b.append(`- ${time}`);
    li.append(b);
    li.append(`- ${description} - `)
    const span = document.createElement('span');
    span.textContent = amount;
    if(type==='credit'){ 
        span.style.color = "green";
        currentBalance+=amount;balance.textContent = currentBalance;
    }
    else{
        span.style.color = "red";
        currentBalance -= amount;
        if (currentBalance >= 0) balance.textContent = currentBalance;
        else {
            const newli = document.createElement('li');
            newli.append(`Not enough funds, you need ${-currentBalance} more.`);
            historyPage.append(newli);
        }
    }
    li.append(span);
    li.append(`- ${currentBalance}`);
    currentBalance>=0 && historyPage.append(li);
});