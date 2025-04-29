const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'data.json');

function getAll(options = {}) {
    try {
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        let data = JSON.parse(rawData);
        
        // Search functionality
        if (options.search) {
            const searchQuery = options.search.toLowerCase();
            data = data.filter(item => 
                item.name.toLowerCase().includes(searchQuery)
            );
        }
        
        // Sorting functionality
        if (options.sort) {
            const sortDir = options.sortDir === 'desc' ? -1 : 1;
            data.sort((a, b) => {
                if (a[options.sort].toLowerCase() < b[options.sort].toLowerCase()) return -1 * sortDir;
                if (a[options.sort].toLowerCase() > b[options.sort].toLowerCase()) return 1 * sortDir;
                return 0;
            });
        }
        
        // Calculate pagination data
        const totalItems = data.length;
        const page = parseInt(options.page) || 1;
        const limit = parseInt(options.limit) || 10;
        const totalPages = Math.ceil(totalItems / limit);
        const offset = (page - 1) * limit;
        
        // Get paginated items
        const paginatedItems = data.slice(offset, offset + limit);
        
        return {
            items: paginatedItems,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages
            }
        };
    } catch (error) {
        return {
            items: [],
            pagination: {
                page: 1,
                limit: 10,
                totalItems: 0,
                totalPages: 0
            }
        };
    }
}

function saveData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

function create(item) {
    const data = getAll().items;
    item.id = Date.now().toString();
    data.push(item);
    saveData(data);
}

function update(id, updatedItem) {
    const data = getAll().items;
    const index = data.findIndex(item => item.id === id);
    if (index === -1) return false;
    data[index] = { ...data[index], ...updatedItem };
    data[index].id = id;
    saveData(data);
    return true;
}

function remove(id) {
    const data = getAll().items;
    const filteredData = data.filter(item => item.id !== id);
    if (data.length === filteredData.length) return false;
    saveData(filteredData);
    return true;
}

module.exports = { getAll, create, update, remove };