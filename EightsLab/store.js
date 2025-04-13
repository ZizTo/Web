const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'data.json');

function getAll() {
    try {
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(rawData);
    } catch (error) {
        return [];
    }
}

function saveData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

function create(item) {
    const data = getAll();
    item.id = Date.now().toString();
    data.push(item);
    saveData(data);
}

function update(id, updatedItem) {
    const data = getAll();
    const index = data.findIndex(item => item.id === id);
    if (index === -1) return false;
    data[index] = { ...data[index], ...updatedItem };
    data[index].id = id;
    saveData(data);
    return true;
}

function remove(id) {
    const data = getAll();
    const filteredData = data.filter(item => item.id !== id);
    if (data.length === filteredData.length) return false;
    saveData(filteredData);
    return true;
}

module.exports = { getAll, create, update, remove };