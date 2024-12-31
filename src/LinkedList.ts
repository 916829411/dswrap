export class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;
  prev: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private size: number = 0;
  private isDoubly: boolean;
  private isCircular: boolean;

  constructor(isDoubly: boolean = false, isCircular: boolean = false) {
    this.isDoubly = isDoubly;
    this.isCircular = isCircular;
  }

  // Add a new element to the end of the list
  add(value: T): void {
    const newNode = new ListNode(value);
    if (this.head === null) {
      this.head = newNode;
      if (this.isDoubly) this.tail = newNode;
      if (this.isCircular) newNode.next = newNode;
    } else {
      if (this.isDoubly && this.tail) {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      } else {
        let current = this.head;
        while (current.next !== null && current.next !== this.head) {
          current = current.next;
        }
        current.next = newNode;
      }
      if (this.isCircular) newNode.next = this.head;
    }
    if (this.isCircular) this.tail = newNode;
    this.size++;
  }

  // Add a new element at a specific index
  insertAt(index: number, value: T): boolean {
    if (index < 0 || index > this.size) return false;

    const newNode = new ListNode(value);

    if (index === 0) {
      if (this.head === null) {
        this.head = newNode;
        if (this.isDoubly) this.tail = newNode;
        if (this.isCircular) newNode.next = newNode;
      } else {
        newNode.next = this.head;
        if (this.isDoubly) this.head.prev = newNode;
        if (this.isCircular && this.tail) this.tail.next = newNode;
        this.head = newNode;
      }
    } else {
      let current = this.head;
      let prev: ListNode<T> | null = null;
      for (let i = 0; i < index; i++) {
        prev = current;
        current = current!.next;
      }
      newNode.next = current;
      if (this.isDoubly) newNode.prev = prev;
      if (prev) prev.next = newNode;
      if (this.isDoubly && current) current.prev = newNode;
    }

    if (index === this.size) this.tail = newNode;
    this.size++;
    return true;
  }

  // Remove an element at a specific index
  removeAt(index: number): T | null {
    if (index < 0 || index >= this.size || this.head === null) return null;

    let removedValue: T;

    if (index === 0) {
      removedValue = this.head.value;
      this.head = this.head.next;
      if (this.isDoubly && this.head) this.head.prev = null;
      if (this.isCircular && this.tail) this.tail.next = this.head;
    } else {
      let current: ListNode<T> | null = this.head;
      let prev: ListNode<T> | null = null;
      for (let i = 0; i < index; i++) {
        prev = current;
        current = current!.next;
      }
      removedValue = current!.value;
      prev!.next = current!.next;
      if (this.isDoubly && current!.next) current!.next.prev = prev;
      if (this.isCircular && index === this.size - 1) this.tail = prev;
    }

    if (index === this.size - 1) this.tail = null;
    this.size--;
    return removedValue;
  }

  reverse(): void {
    if (this.head === null || this.size === 1) return;

    let current = this.head;
    let prev: ListNode<T> | null = null;
    let next: ListNode<T> | null = null;
    this.tail = this.head;

    do {
      next = current.next;
      current.next = prev;
      if (this.isDoubly) current.prev = next;
      prev = current;
      current = next!;
    } while (current !== null && current !== this.head);

    this.head = prev;
    if (this.isCircular && this.tail) this.tail.next = this.head;
  }

  indexOf(value: T): number {
    let current = this.head;
    let index = 0;

    if (current === null) return -1;

    do {
      if (current.value === value) return index;
      current = current.next;
      index++;
    } while (current !== null && current !== this.head);

    return -1;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    if (current === null) return result;

    do {
      result.push(current.value);
      current = current.next;
    } while (current !== null && current !== this.head);

    return result;
  }

  getSize(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  clear(): void {
    this.head = this.tail = null;
    this.size = 0;
  }
}
