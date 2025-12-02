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
                `${balance} ₽ ➜ ${newBalance} ₽`;
        }
        

        const bankLogos = {
            'sber': 'sber.png',
            'tinkoff': 'tb.png',
            'ozon': 'ozon.png'
        };
 
        const logoFile = bankLogos[data.bank] || 'default-logo.png';
        const imgElement = document.querySelector('img');
        const imgBox = document.querySelector('.img-box');

        // Сначала проверяем, что элементы существуют
        if (!imgElement) {
            console.error('Элемент img не найден!');
        }
        if (!imgBox) {
            console.error('Элемент .img-box не найден!');
        }

        // Проверяем какой банк выбран
        console.log('Выбранный банк:', data.bank);

        // Меняем стили в зависимости от банка
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
        else if (data.bank === 'tinkoff') {
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
        
        // Устанавливаем логотип (это должно быть ВНЕ условий if для банков)
        if (imgElement) {
            imgElement.src = logoFile;
            imgElement.alt = cardType + ' логотип';
            console.log('Логотип установлен:', logoFile);
        }
        
        // Очищаем данные после использования
        localStorage.removeItem('checkData');
        
    } catch (error) {
        console.error('Ошибка парсинга данных:', error);
        if (document.querySelector('.text-name')) {
            document.querySelector('.text-name').textContent = 'Ошибка данных';
        }
    }
}); // ← ЭТА закрывающая скобка была пропущена

console.log('Банк из данных:', data.bank);
console.log('Тип:', typeof data.bank);
console.log('Длина:', data.bank.length);