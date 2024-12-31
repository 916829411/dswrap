import { describe, it, expect } from 'vitest';
import { PriorityQueue } from '../src/priority-queue';

describe('PriorityQueue 测试', () => {
  it('应该能够根据优先级插入元素 (enqueue)', () => {
    const queue = new PriorityQueue<number>();
    queue.enqueue(10, 2);
    queue.enqueue(5, 1);
    queue.enqueue(20, 3);
    expect(queue.size()).toBe(3);
    expect(queue.peek()).toBe(5); // 优先级最低的元素先被处理
  });

  it('应该能够移除优先级最高的元素 (dequeue)', () => {
    const queue = new PriorityQueue<number>();
    queue.enqueue(10, 2);
    queue.enqueue(5, 1);
    queue.enqueue(20, 3);
    expect(queue.dequeue()).toBe(5);
    expect(queue.dequeue()).toBe(10);
    expect(queue.size()).toBe(1);
    expect(queue.peek()).toBe(20);
  });

  it('应该能够查看优先级最高的元素 (peek)', () => {
    const queue = new PriorityQueue<number>();
    queue.enqueue(15, 1);
    queue.enqueue(25, 2);
    expect(queue.peek()).toBe(15);
  });

  it('应该能够检查队列是否为空', () => {
    const queue = new PriorityQueue<number>();
    expect(queue.isEmpty()).toBe(true);
    queue.enqueue(30, 1);
    expect(queue.isEmpty()).toBe(false);
  });

  it('应该能够获取队列的大小', () => {
    const queue = new PriorityQueue<number>();
    expect(queue.size()).toBe(0);
    queue.enqueue(10, 1);
    queue.enqueue(20, 2);
    expect(queue.size()).toBe(2);
  });

  it('应该能够清空队列', () => {
    const queue = new PriorityQueue<number>();
    queue.enqueue(1, 1);
    queue.enqueue(2, 2);
    queue.enqueue(3, 3);
    queue.clear();
    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);
    expect(queue.peek()).toBeUndefined();
  });

  it('空队列出队应该返回 undefined', () => {
    const queue = new PriorityQueue<number>();
    expect(queue.dequeue()).toBeUndefined();
  });

  it('应该能够正确迭代队列中的元素', () => {
    const queue = new PriorityQueue<number>();
    queue.enqueue(10, 2);
    queue.enqueue(5, 1);
    queue.enqueue(20, 3);

    const result: number[] = [];
    for (const item of queue) {
      result.push(item);
    }

    expect(result).toEqual([5, 10, 20]); // 按优先级顺序进行迭代
  });
});
