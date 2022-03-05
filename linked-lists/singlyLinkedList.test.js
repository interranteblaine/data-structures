const { Node, SinglyLinkedList } = require('./singlyLinkedList');

describe('node >', () => {
    const properties = ['val', 'next'];
    properties.forEach(prop => {
        test(`should have a ${prop} property`, () => {
            const node = new Node();
            expect(node.hasOwnProperty(`${prop}`)).toBe(true);
        });
    });
});

describe('SLL >', () => {
    const properties = ['head', 'tail', 'length'];
    properties.forEach(prop => {
        test(`should have a ${prop} property`, () => {
            const sll = new SinglyLinkedList();
            expect(sll.hasOwnProperty(`${prop}`)).toBe(true);
        });
    });

    let sll;
    beforeEach(() => {
        sll = new SinglyLinkedList();
        sll.push(1);
        sll.push(2);
        sll.push('C');
    })

    test(`push should modify tail, head, next pointers, and length`, () => {
        expect(sll.head.val).toBe(1);
        expect(sll.tail.val).toBe('C');
        expect(sll.head.next.val).toBe(2);
        expect(sll.head.next.next.val).toBe('C');
        expect(sll.length).toBe(3);
    });

    test(`pop should return tail and update new tail and length`, () => {
        expect(sll.pop().val).toBe('C');
        expect(sll.tail.val).toBe(2);
        expect(sll.length).toBe(2);
        expect(sll.pop().val).toBe(2);
        expect(sll.tail.val).toBe(1);
        expect(sll.length).toBe(1);
        expect(sll.pop().val).toBe(1);
        expect(sll.length).toBe(0);
        expect(sll.head).toBe(null);
        expect(sll.tail).toBe(null);
    });

    test(`shift should return head and update new head and length`, () => {
        expect(sll.shift().val).toBe(1);
        expect(sll.length).toBe(2);
        expect(sll.head.val).toBe(2);
        expect(sll.shift().val).toBe(2);
        expect(sll.length).toBe(1);
        expect(sll.head.val).toBe('C');
        expect(sll.shift().val).toBe('C');
        expect(sll.length).toBe(0);
        expect(sll.head).toBe(null);
        expect(sll.tail).toBe(null);
    });

    test(`unshift should modify head, tail, next pointers, and length`, () => {
        const previousHeadVal = sll.head.val;
        expect(sll.unshift(0).head.val).toBe(0);
        expect(sll.length).toBe(4);
        expect(sll.head.next.val).toBe(previousHeadVal);
    });

    test(`get should return node at a specific index and null otherwise`, () => {
        expect(sll.get(2).val).toBe('C');
        expect(sll.get(-1)).toBe(null);
        expect(sll.get(sll.length)).toBe(null);
    });

    test(`set should update a node and return true, and false otherwise`, () => {
        expect(sll.set(1, 'D')).toBe(true);
        expect(sll.set(3, 'D')).toBe(false);
        expect(sll.set(-1, 'D')).toBe(false);
        expect(sll.get(1).val).toBe('D');
        expect(sll.get(1).next.val).toBe('C');
    });

    test(`insert should add a new node and return true, and false otherwise`, () => {
        // 1 -> 2 -> C
        expect(sll.insert(0, 'A')).toBe(true);
        expect(sll.head.val).toBe('A');
        expect(sll.length).toBe(4);
        // A -> 1 -> 2 -> C
        expect(sll.insert(sll.length, 'Z')).toBe(true);
        expect(sll.tail.val).toBe('Z');
        expect(sll.length).toBe(5);
        // A -> 1 -> 2 -> C -> Z
        expect(sll.insert(3, 'Middle')).toBe(true);
        expect(sll.get(3).val).toBe('Middle');
        expect(sll.get(3).next.val).toBe('C');
        expect(sll.length).toBe(6);
        // A -> 1 -> 2 -> M -> C -> Z
        expect(sll.insert(-1, 'aA')).toBe(false);
    });

    test(`remove should delete node and return that node, undefined otherwise`, () => {
        // 1 -> 2 -> C
        expect(sll.remove(sll.length)).toBe(undefined);
        expect(sll.remove(1).val).toBe(2);
        expect(sll.length).toBe(2);
        // 1 -> C
        expect(sll.remove(0).val).toBe(1);
        expect(sll.length).toBe(1);
        // C
        expect(sll.remove(0).val).toBe('C');
        expect(sll.length).toBe(0);
        //
        expect(sll.remove(0)).toBe(undefined);
    });

    test(`reverse should reverse the SLL in place`, () => {
        sll.reverse();
        expect(sll.head.val).toBe('C');
        expect(sll.tail.val).toBe(1);
        expect(sll.head.next.val).toBe(2);
        expect(sll.head.next.next.val).toBe(1);
    });
})