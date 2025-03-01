// Хэш для хранения информации о запчастях
let partsHash = {};

// Функция для добавления записи
function addValue(key, value) {
    partsHash[key] = value;
    console.log(`Добавлена запчасть: ${key} - ${value}`);
}

// Функция для удаления записи
function deleteValue(key) {
    if (partsHash[key]) {
        delete partsHash[key];
        console.log(`Запчасть "${key}" удалена.`);
    } else {
        console.log(`Запчасть "${key}" не найдена.`);
    }
}

// Функция для получения информации по ключу
function getValueInfo(key) {
    return partsHash[key] || "нет информации";
}

// Функция для получения списка всех записей
function listValues() {
    return Object.entries(partsHash)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");
}

// Функции для взаимодействия с пользователем
function addPart() {
    const key = prompt("Введите название запчасти:");
    const value = prompt("Введите описание запчасти:");
    if (key && value) {
        addValue(key, value);
    } else {
        alert("Название и описание не могут быть пустыми!");
    }
}

function deletePart() {
    const key = prompt("Введите название запчасти для удаления:");
    if (key) {
        deleteValue(key);
    } else {
        alert("Название не может быть пустым!");
    }
}

function getPartInfo() {
    const key = prompt("Введите название запчасти для получения информации:");
    if (key) {
        const info = getValueInfo(key);
        alert(info);
    } else {
        alert("Название не может быть пустым!");
    }
}

function listAllParts() {
    const list = listValues();
    alert(list || "Нет данных о запчастях.");
}