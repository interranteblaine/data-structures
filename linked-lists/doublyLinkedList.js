class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(val) {
        const newNode = new Node(val);
        if (this.length === 0) {
            this.head = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
        }
        this.tail = newNode;
        this.length++;
        return this;
    }

    pop() {
        if (this.length === 0) return undefined;
        const poppedNode = this.tail;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = poppedNode.prev;
            poppedNode.prev = null;
        }
        this.length--;
        return poppedNode;
    }

    shift() {
        if (this.length === 0) return undefined;
        const shiftedNode = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail === null;
        } else {
            this.head = shiftedNode.next;
            this.head.prev = null;
            shiftedNode.next = null;
        }
        this.length--;
        return shiftedNode;
    }

    unshift(val) {
        const newNode = new Node(val);
        if (this.length === 0) {
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
        }
        this.head = newNode;
        this.length++;
        return this;
    }

    get(index) {
        if (index < 0 || index >= this.length) return null;
        let currentNode;
        if (index <= this.length / 2) {
            let count = 0;
            currentNode = this.head;
            while (count !== index) {
                currentNode = currentNode.next;
                count++;
            }
        } else {
            let count = this.length - 1;
            currentNode = this.tail;
            while (count !== index) {
                currentNode = currentNode.prev;
                count--;
            }
        }
        return currentNode;
    }

    set(index, val) {
        const foundNode = this.get(index);
        if (foundNode) {
            foundNode.val = val;
            return true;
        }
        return false;
    }

    insert(index, val) {
        if (index < 0 || index > this.length) return false;
        if (index === 0) return !! this.unshift(val);
        if (index === this.length) return !!this.push(val);
        const newNode = new Node(val);
        const previousNode = this.get(index - 1);
        const previousNodeNext = previousNode.next;
        previousNode.next = newNode;
        newNode.prev = previousNode;
        newNode.next = previousNodeNext;
        previousNodeNext.prev = newNode;
        this.length++;
        return true;
    }

    remove(index) {
        if (index < 0 || index >= this.length) return undefined;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();
        const removedNode = this.get(index);
        removedNode.prev.next = removedNode.next;
        removedNode.next.prev = removedNode.prev;
        removedNode.next = null;
        removedNode.prev = null;
        this.length--;
        return removedNode;
    }

    reverse() {
        let currentNode = this.head;
        this.head = this.tail;
        this.tail = this.head;
        let nextNode;
        let previousNode = null;
        for (let i = 0; i < this.length; i++) {
            nextNode = currentNode.next;
            currentNode.prev = nextNode;
            currentNode.next = previousNode;
            previousNode = currentNode;
            currentNode = nextNode;
        }
        return this;
    }
}