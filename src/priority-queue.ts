interface PriorityQueueElement<T> {
  value: T;
  priority: number;
}

export class PriorityQueue<T> {
  private items: PriorityQueueElement<T>[];

  constructor() {
    this.items = [];
  }

  // 入队：根据优先级将元素插入队列
  enqueue(element: T, priority: number): void {
    const queueElement: PriorityQueueElement<T> = { value: element, priority };
    if (this.isEmpty()) {
      this.items.push(queueElement);
    } else {
      let added = false;
      for (let i = 0; i < this.items.length; i++) {
        if (queueElement.priority < this.items[i].priority) {
          this.items.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }
      if (!added) {
        this.items.push(queueElement);
      }
    }
  }

  // 出队：移除并返回优先级最高的元素
  dequeue(): T | undefined {
    return this.items.shift()?.value;
  }

  // 查看优先级最高的元素
  peek(): T | undefined {
    return this.items[0]?.value;
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
          return { value: this.items[index++].value, done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
}
