import { describe, it, expect } from 'vitest';
import { Queue } from '../src/queue';

describe('Queue 测试', () => {
  it('应该能够将元素加入队列 (enqueue)', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.size()).toBe(3);
    expect(queue.peek()).toBe(1); // 队列开头的元素应该是第一个加入的
  });

  it('应该能够从队列中移除元素 (dequeue)', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(1); // 移除第一个元素
    expect(queue.size()).toBe(2);
    expect(queue.peek()).toBe(2); // 队列开头的元素应该是第二个加入的
  });

  it('应该能够查看队列开头的元素 (peek)', () => {
    const queue = new Queue<number>();
    queue.enqueue(42);
    expect(queue.peek()).toBe(42);
    queue.enqueue(84);
    expect(queue.peek()).toBe(42); // peek 不应该移除元素
  });

  it('应该能够检查队列是否为空', () => {
    const queue = new Queue<number>();
    expect(queue.isEmpty()).toBe(true);
    queue.enqueue(10);
    expect(queue.isEmpty()).toBe(false);
  });

  it('应该能够获取队列的大小', () => {
    const queue = new Queue<number>();
    expect(queue.size()).toBe(0);
    queue.enqueue(5);
    queue.enqueue(10);
    queue.enqueue(15);
    expect(queue.size()).toBe(3);
  });

  it('应该能够清空队列', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.clear();
    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);
    expect(queue.peek()).toBeUndefined();
  });

  it('空队列出队应该返回 undefined', () => {
    const queue = new Queue<number>();
    expect(queue.dequeue()).toBeUndefined();
  });

  it('应该能够正确迭代队列中的元素', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    const result: number[] = [];
    for (const item of queue) {
      result.push(item);
    }

    expect(result).toEqual([1, 2, 3]); // 迭代顺序应该从队列开头到队列末尾
  });
});
