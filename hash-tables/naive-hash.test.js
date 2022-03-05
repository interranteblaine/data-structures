const HashTable = require('./naive-hash');

describe('hash >', () => {
    let hash;

    beforeEach(() => {
        hash = new HashTable();
    });
  
    test('should have a keyMap property that is an array', () => {
        expect(hash.hasOwnProperty(`keyMap`)).toBe(true);
        expect(hash.keyMap.length).toBe(53);
    });

    test('hash function should return the same output for a given input', () => {
        const output = hash.hash('cow');
        expect(hash.hash('cow')).toBe(output);
        const otherOutput = hash.hash('cartagrapher');
        expect(hash.hash('cartagrapher')).toBe(otherOutput);
    });

    test('set should insert a new item to the hash table', () => {
        hash.set('key', 'value');
        const index = hash.hash('key');
        expect(hash.keyMap[index][0]).toMatchObject(['key', 'value']);
    });

    test('get should return a value corresponding to a key', () => {
        hash.set('testKey', 'testValue');
        expect(hash.get('testKey')).toBe('testValue');
    });

    test('keys should return all the unique keys of the hash', () => {
        hash.set('horse', 'hair');
        hash.set('sheep', 'wool');
        hash.set('dog', 'fur');
        hash.set('dog', 'fur');
        expect(hash.keys().sort()).toMatchObject(['dog', 'horse', 'sheep']);
    });

    test('values should return all the unique values of the hash', () => {
        hash.set('horse', 'hair');
        hash.set('sheep', 'wool');
        hash.set('dog', 'fur');
        hash.set('dog', 'fur');
        expect(hash.values().sort()).toMatchObject(['fur', 'hair', 'wool']);
    });
});