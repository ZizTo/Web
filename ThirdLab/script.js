let partsHash = {};

function addValue(key, value) {
    partsHash[key] = value;
    alert(`Добавлена запчасть: ${key} - ${value}`);
}

function deleteValue(key) {
    if (partsHash[key]) {
        delete partsHash[key];
        alert(`Запчасть "${key}" удалена.`);
    } else {
        alert(`Запчасть "${key}" не найдена.`);
    }
}

function getValueInfo(key) {
    return partsHash[key] || "нет информации";
}

function listValues() {
    return Object.entries(partsHash)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");
}

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