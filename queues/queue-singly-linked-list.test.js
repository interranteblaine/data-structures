const { Queue, Node } = require('./queue-singly-linked-list');

describe('node >', () => {
    const properties = ['val', 'next'];
    properties.forEach(prop => {
        test(`should have a ${prop} property`, () => {
            const node = new Node();
            expect(node.hasOwnProperty(`${prop}`)).toBe(true);
        });
    });
});

describe('Queue >', () => {
    let q;
    beforeEach(() => {
        q = new Queue();
    });

    test('enqueue should add node to last and return length', () => {
        expect(q.enqueue('A')).toBe(1);
        expect(q.first.val).toBe('A');
        expect(q.last.val).toBe('A');
        expect(q.enqueue('B')).toBe(2);
        expect(q.first.next.val).toBe('B');
    });

    test('dequeue should remove and return node value from first', () => {
        q.enqueue('A');
        q.enqueue('B');
        q.enqueue('C');
        expect(q.dequeue()).toBe('A');
        expect(q.length).toBe(2);
        expect(q.first.val).toBe('B');
    });
});
