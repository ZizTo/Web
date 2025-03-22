class THashMap {
    #keys = {}
    Reset() {
        this.#keys = {};
    }
    Add(Key, Value) {
        this.#keys[Key] = Value;
        alert("Запчасть " + Key + " - " + Value + " добавлена");
    }
    GetValue(Key) {
        return (this.#keys[Key] || undefined);
    }
    DeleteValue(Key) {
    	delete this.#keys[Key];
    	alert("Запись " + Key + " удалена");
    }
    GetKeys() {
    	return Object.keys(this.#keys);
    }
}

Storage = new THashMap();

function addPart() {
    const key = prompt("Введите название запчасти:");
    const value = prompt("Введите описание запчасти:");
    if (key && value) {
        Storage.Add(key, value);
    } else {
        alert("Название и описание не могут быть пустыми!");
    }
}

function deletePart() {
    const key = prompt("Введите название запчасти для удаления:");
    if (key) {
    	if (Storage.GetValue(key) != undefined) {
        	Storage.DeleteValue(key);
    	}
    	else {alert("Запись не найдена");}
    } else {
        alert("Название не может быть пустым!");
    }
}

function getPartInfo() {
    const key = prompt("Введите название запчасти для получения информации:");
    if (key) {
        const info = Storage.GetValue(key);
        if (info == undefined) {
        	alert("Запись не найдена");
        }
        else {
        	alert(info);
    	}
    } else {
        alert("Название не может быть пустым!");
    }
}

function listAllParts() {
	str = "";
    list = Storage.GetKeys();
    for (var i = 0; i < list.length; i++) {
    	str += "Запчасть " + list[i] + ": " + Storage.GetValue(list[i]) + "\n";
    }
    alert(str || "Нет данных о запчастях.");
}

class TLocalStorage {
    #keys = {}
    Reset() {
        localStorage.clear();
    }
    Add(Key, Value) {
        localStorage.setItem(Key, Value);
        alert("Запчасть " + Key + " - " + Value + " добавлена");
    }
    GetValue(Key) {
        return (localStorage.getItem(Key) || undefined);
    }
    DeleteValue(Key) {
        localStorage.removeItem(Key);
        alert("Запись " + Key + " удалена");
    }
    GetKeys() {
        return Object.keys(localStorage);
    }
}

LocalStor = new TLocalStorage();

function LaddPart() {
    const key = prompt("Введите название запчасти:");
    const value = prompt("Введите описание запчасти:");
    if (key && value) {
        LocalStor.Add(key, value);
    } else {
        alert("Название и описание не могут быть пустыми!");
    }
}

function LdeletePart() {
    const key = prompt("Введите название запчасти для удаления:");
    if (key) {
        if (LocalStor.GetValue(key) != undefined) {
            LocalStor.DeleteValue(key);
        }
        else {alert("Запись не найдена");}
    } else {
        alert("Название не может быть пустым!");
    }
}

function LgetPartInfo() {
    const key = prompt("Введите название запчасти для получения информации:");
    if (key) {
        const info = LocalStor.GetValue(key);
        if (info == undefined) {
            alert("Запись не найдена");
        }
        else {
            alert(info);
        }
    } else {
        alert("Название не может быть пустым!");
    }
}

function LlistAllParts() {
    str = "";
    list = LocalStor.GetKeys();
    for (var i = 0; i < list.length; i++) {
        str += "Запчасть " + list[i] + ": " + LocalStor.GetValue(list[i]) + "\n";
    }
    alert(str || "Нет данных о запчастях.");
}