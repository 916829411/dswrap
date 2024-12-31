export class SkipListNode<T> {
  value: T;
  forward: SkipListNode<T>[];

  constructor(value: T, level: number) {
    this.value = value;
    this.forward = new Array(level).fill(null);
  }
}

export class SkipList<T> {
  private head: SkipListNode<T>;
  private maxLevel: number;
  private level: number;
  private probability: number;
  private compare: (a: T, b: T) => number;

  constructor({
    compare = (a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0),
    maxLevel,
    probability,
  }: {
    compare?: (a: T, b: T) => number;
    maxLevel?: number;
    probability?: number;
  } = {}) {
    this.maxLevel =
      maxLevel || Math.ceil(Math.log(Number.MAX_SAFE_INTEGER) / Math.log(2));
    this.level = 0;
    this.probability = probability || 0.5;
    this.compare = compare;
    this.head = new SkipListNode<T>(null as any, this.maxLevel); // Sentinel head node
  }

  private randomLevel(): number {
    let lvl = 1;
    while (Math.random() < this.probability && lvl < this.maxLevel) {
      lvl++;
    }
    return lvl;
  }

  // 插入一个值
  insert(value: T): void {
    const update = new Array<SkipListNode<T>>(this.maxLevel).fill(this.head);
    let current = this.head;

    for (let i = this.level - 1; i >= 0; i--) {
      while (
        current.forward[i] &&
        this.compare(current.forward[i].value, value) < 0
      ) {
        current = current.forward[i];
      }
      update[i] = current;
    }

    const lvl = this.randomLevel();
    if (lvl > this.level) {
      for (let i = this.level; i < lvl; i++) {
        update[i] = this.head;
      }
      this.level = lvl;
    }

    const newNode = new SkipListNode(value, lvl);
    for (let i = 0; i < lvl; i++) {
      newNode.forward[i] = update[i].forward[i];
      update[i].forward[i] = newNode;
    }
  }

  // 查找一个值
  search(value: T): boolean {
    let current = this.head;

    for (let i = this.level - 1; i >= 0; i--) {
      while (
        current.forward[i] &&
        this.compare(current.forward[i].value, value) < 0
      ) {
        current = current.forward[i];
      }
    }

    current = current.forward[0];
    return current !== null && this.compare(current.value, value) === 0;
  }

  // 删除一个值
  remove(value: T): boolean {
    const update = new Array<SkipListNode<T>>(this.maxLevel).fill(this.head);
    let current = this.head;

    for (let i = this.level - 1; i >= 0; i--) {
      while (
        current.forward[i] &&
        this.compare(current.forward[i].value, value) < 0
      ) {
        current = current.forward[i];
      }
      update[i] = current;
    }

    current = current.forward[0];

    if (!current || this.compare(current.value, value) !== 0) {
      return false;
    }

    for (let i = 0; i < this.level; i++) {
      if (update[i].forward[i] !== current) {
        break;
      }
      update[i].forward[i] = current.forward[i];
    }

    while (this.level > 0 && !this.head.forward[this.level - 1]) {
      this.level--;
    }

    return true;
  }

  // 范围搜索
  rangeSearch(start: T, end: T): T[] {
    const result: T[] = [];
    let current = this.head;

    for (let i = this.level - 1; i >= 0; i--) {
      while (
        current.forward[i] &&
        this.compare(current.forward[i].value, start) < 0
      ) {
        current = current.forward[i];
      }
    }

    current = current.forward[0];
    while (current && this.compare(current.value, end) <= 0) {
      result.push(current.value);
      current = current.forward[0];
    }

    return result;
  }

  // 查找离指定值最近的节点
  findNearest(value: T): T | null {
    let current = this.head;

    for (let i = this.level - 1; i >= 0; i--) {
      while (
        current.forward[i] &&
        this.compare(current.forward[i].value, value) < 0
      ) {
        current = current.forward[i];
      }
    }

    current = current.forward[0];
    if (!current) return null;
    return current.value;
  }

  // 获取小于等于指定值的最大值
  floor(value: T): T | null {
    let current = this.head;

    for (let i = this.level - 1; i >= 0; i--) {
      while (
        current.forward[i] &&
        this.compare(current.forward[i].value, value) <= 0
      ) {
        current = current.forward[i];
      }
    }

    return current.value;
  }

  // 获取大于等于指定值的最小值
  ceil(value: T): T | null {
    let current = this.head;

    for (let i = this.level - 1; i >= 0; i--) {
      while (
        current.forward[i] &&
        this.compare(current.forward[i].value, value) < 0
      ) {
        current = current.forward[i];
      }
    }

    current = current.forward[0];
    return current ? current.value : null;
  }

  // 批量插入
  insertBatch(values: T[]): void {
    for (const value of values) {
      this.insert(value);
    }
  }

  // 打印跳表
  print(): void {
    for (let i = this.level - 1; i >= 0; i--) {
      let line = `Level ${i + 1}: `;
      let current = this.head.forward[i];
      while (current) {
        line += current.value + ' -> ';
        current = current.forward[i];
      }
      console.log(line + 'null');
    }
  }
}
