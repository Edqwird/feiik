document.querySelector('.button-message').onclick = function() {
    const name = document.querySelector('.box-name').value;
    const balance = document.querySelector('.box-balance').value;
    const sum = document.querySelector('.box-sum').value;
    const number = document.querySelector('.box-number').value;
    
    const bankRadio = document.querySelector('input[name="bank"]:checked');
    const bank = bankRadio ? bankRadio.value : null;
    
    if (!name || !balance || !sum || !number || !bank) {
        alert('Пожалуйста, заполните все поля и выберите банк!');
        return;
    }
    
    const data = {
        name: name,
        balance: balance,
        sum: sum,
        number: number,
        bank: bank
    };
    

    localStorage.setItem('checkData', JSON.stringify(data));
 
    window.location.href = 'src.html';
};