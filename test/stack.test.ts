import { describe, it, expect } from 'vitest';
import { Stack } from '../src/stack';

describe('Stack 测试', () => {
  it('应该能够将元素推入栈', () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.size()).toBe(3);
    expect(stack.peek()).toBe(3);
  });

  it('应该能够从栈顶弹出元素', () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.size()).toBe(1);
    expect(stack.peek()).toBe(1);
  });

  it('应该能够查看栈顶元素', () => {
    const stack = new Stack<number>();
    stack.push(42);
    expect(stack.peek()).toBe(42);
    stack.push(84);
    expect(stack.peek()).toBe(84);
  });

  it('应该能够检查栈是否为空', () => {
    const stack = new Stack<number>();
    expect(stack.isEmpty()).toBe(true);
    stack.push(10);
    expect(stack.isEmpty()).toBe(false);
  });

  it('应该能够获取栈的大小', () => {
    const stack = new Stack<number>();
    expect(stack.size()).toBe(0);
    stack.push(5);
    stack.push(10);
    stack.push(15);
    expect(stack.size()).toBe(3);
  });

  it('应该能够清空栈', () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.clear();
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
    expect(stack.peek()).toBeUndefined();
  });

  it('空栈弹出应该返回 undefined', () => {
    const stack = new Stack<number>();
    expect(stack.pop()).toBeUndefined();
  });

  it('应该能够正确迭代栈中的元素', () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);

    const result: number[] = [];
    for (const item of stack) {
      result.push(item);
    }

    expect(result).toEqual([3, 2, 1]); // 迭代顺序应该从栈顶到栈底
  });
});
