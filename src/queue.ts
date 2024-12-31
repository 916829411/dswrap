export class Queue<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  // 入队：将元素添加到队列末尾
  enqueue(element: T): void {
    this.items.push(element);
  }

  // 出队：移除并返回队列开头的元素
  dequeue(): T | undefined {
    return this.items.shift();
  }

  // 查看队列开头的元素
  peek(): T | undefined {
    return this.items[0];
  }

  // 检查队列是否为空
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // 获取队列的大小
  size(): number {
    return this.items.length;
  }

  // 清空队列
  clear(): void {
    this.items = [];
  }

  // 支持迭代器
  [Symbol.iterator](): Iterator<T> {
    let index = 0;
    return {
      next: (): IteratorResult<T> => {
        if (index < this.items.length) {
          return { value: this.items[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
}
