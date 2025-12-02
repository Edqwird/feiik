document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, начинаем обработку...');

    console.log('Все ключи в LocalStorage:');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(key + ':', localStorage.getItem(key));
    }
    
    const rawData = localStorage.getItem('checkData');
    console.log('checkData raw:', rawData);
    
    if (!rawData) {
        console.error('Нет данных в checkData!');
        document.querySelector('.text-name').textContent = 'Нет данных';
        return;
    }
    
    try {
        const data = JSON.parse(rawData);
        console.log('Распарсенные данные:', data);
        
        if (document.querySelector('.text-name')) {
            document.querySelector('.text-name').textContent = data.name || 'Не указано';
            console.log('Имя установлено:', data.name);
        }
        
        if (document.querySelector('.text-number')) {
            document.querySelector('.text-number').textContent = data.number || 'Не указано';
        }
        
        if (document.querySelector('.sum')) {
            document.querySelector('.sum').textContent = '-' + (data.sum || '0') + ' ₽';
        }
        
        if (document.querySelector('.sum-text')) {
            const balance = parseFloat(data.balance) || 0;
            const sum = parseFloat(data.sum) || 0;
            const newBalance = balance - sum;
            document.querySelector('.sum-text').textContent = 
                `${balance} ₽ → ${newBalance} ₽`;
        }
        
        if (document.querySelector('.sch-card')) {
            const bankCards = {
                'sber': 'sber',
                'tinkoff': 'Tinkoff Black', 
                'ozon': 'Ozon Карта'
            };
            const cardType = bankCards[data.bank] || 'Black';
            document.querySelector('.sch-card').textContent = cardType;
        }

        const bankLogos = {
        'sber': 'sber.png',
        'tinkoff': 'tinkoff-logo.png',
        'ozon': 'ozon-logo.png'
        };
    
        const logoFile = bankLogos[data.bank] || 'default-logo.png';
        const imgElement = document.querySelector('img'); // или другой селектор
        if (imgElement) {
           imgElement.src = logoFile;
           imgElement.alt = cardType + ' логотип';
        }
        

        localStorage.removeItem('checkData');
        console.log('Данные очищены');
        
    } catch (error) {
        console.error('Ошибка парсинга данных:', error);
        document.querySelector('.text-name').textContent = 'Ошибка данных';
    }
});