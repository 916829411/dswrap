export class Stack<T> {
  private items: T[];
  private capacity: number;

  constructor(capacity?: number) {
    this.items = [];
    this.capacity = capacity || Infinity; // 默认为无限容量
  }

  // 将元素推入栈
  push(element: T): void {
    if (this.size() >= this.capacity) {
      throw new Error('栈已满');
    }
    this.items.push(element);
  }

  // 从栈顶弹出元素
  pop(): T | undefined {
    return this.items.pop();
  }

  // 查看栈顶元素
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  // 检查栈是否为空
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // 获取栈的大小
  size(): number {
    return this.items.length;
  }

  // 清空栈
  clear(): void {
    this.items = [];
  }

  // 支持迭代器
  [Symbol.iterator](): Iterator<T> {
    let index = this.items.length - 1;
    return {
      next: (): IteratorResult<T> => {
        if (index >= 0) {
          return { value: this.items[index--], done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
}
