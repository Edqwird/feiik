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
        
        // ОТЛАДКА: добавьте здесь
        console.log('Банк из данных:', data.bank);
        console.log('Тип:', typeof data.bank);
        console.log('Длина:', data.bank ? data.bank.length : 'нет данных');
        
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
                `${balance} ₽ ➜ ${newBalance} ₽`;
        }
        
        // Определите cardType до использования
        let cardType = 'Black';
        if (data.bank) {
            const bankCards = {
                'sber': 'SberBlack',
                'tinkoff': 'Tinkoff Black', 
                
                'ozon': 'Ozon Карта'
            };
            cardType = bankCards[data.bank] || 'Black';
        }

        const bankLogos = {
            'sber': 'sber.png',
            'tinkoff': 'tb.png',
            'ozon': 'ozon.png'
        };
 
        const logoFile = bankLogos[data.bank] || 'default-logo.png';
        const imgElement = document.querySelector('img');
        const imgBox = document.querySelector('.img-box');

        console.log('Логотип файл:', logoFile);
        console.log('imgElement найден:', !!imgElement);
        console.log('imgBox найден:', !!imgBox);

        if (!imgElement) {
            console.error('Элемент img не найден!');
        }
        if (!imgBox) {
            console.error('Элемент .img-box не найден!');
        }

        console.log('Выбранный банк:', data.bank);

        if (data.bank === 'sber') {
            if (imgElement) {
                imgElement.style.width = '110px';
                imgElement.style.height = '110px';
            }
            if (imgBox) {
                imgBox.style.background = 'green';
                console.log('Установлен цвет: green');
            }
        } 
        else if (data.bank === 'tinkoff' || data.bank === 'tb') {
            if (imgElement) {
                imgElement.style.width = '90px';
                imgElement.style.height = '90px';
            }
            if (imgBox) {
                imgBox.style.background = 'rgb(255, 221, 45)';
                console.log('Установлен цвет: yellow');
            }
        }
        else if (data.bank === 'ozon') {
            if (imgElement) {
                imgElement.style.width = '60px';
                imgElement.style.height = '60px';
            }
            if (imgBox) {
                imgBox.style.background = 'rgb(0, 91, 255)';
                console.log('Установлен цвет: rgb(0, 91, 255)');
            }
        }
        
        if (imgElement) {
            imgElement.src = logoFile;
            imgElement.alt = cardType + ' логотип';
            console.log('Логотип установлен:', logoFile);
        }
        
        localStorage.removeItem('checkData');
        
    } catch (error) {
        console.error('Ошибка парсинга данных:', error);
        console.error('Сырые данные:', rawData);
        
        if (document.querySelector('.text-name')) {
            document.querySelector('.text-name').textContent = 'Ошибка данных';
        }
    }
    
});