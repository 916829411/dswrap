import { describe, it, expect } from 'vitest';
import { LinkedList } from '../src';

describe('链表测试', () => {
  it('应该能够添加元素到链表', () => {
    const list = new LinkedList<number>();
    list.add(1);
    list.add(2);
    list.add(3);
    expect(list.toArray()).toEqual([1, 2, 3]); // 添加的元素顺序应该保持一致
  });

  it('应该能够根据索引删除元素', () => {
    const list = new LinkedList<number>();
    list.add(1);
    list.add(2);
    list.add(3);
    const removed = list.removeAt(1);
    expect(removed).toBe(2); // 删除的元素应该是索引为1的值
    expect(list.toArray()).toEqual([1, 3]); // 剩余的元素应该保持正确顺序
  });

  it('应该能够查找值的索引', () => {
    const list = new LinkedList<number>();
    list.add(10);
    list.add(20);
    list.add(30);
    expect(list.indexOf(20)).toBe(1); // 值为20的索引应该是1
    expect(list.indexOf(40)).toBe(-1); // 不存在的值索引应该返回-1
  });

  it('应该能够在指定索引插入元素', () => {
    const list = new LinkedList<number>();
    list.add(1);
    list.add(3);
    list.insertAt(1, 2);
    expect(list.toArray()).toEqual([1, 2, 3]); // 插入后的顺序应该正确
  });

  it('应该能够反转链表', () => {
    const list = new LinkedList<number>();
    list.add(1);
    list.add(2);
    list.add(3);
    list.reverse();
    expect(list.toArray()).toEqual([3, 2, 1]); // 反转后的顺序应该正确
  });

  it('循环链表应该正常工作', () => {
    const list = new LinkedList<number>(false, true);
    list.add(1);
    list.add(2);
    list.add(3);
    expect(list.toArray()).toEqual([1, 2, 3]); // 循环链表的内容应该正确
    list.removeAt(0);
    expect(list.toArray()).toEqual([2, 3]); // 删除后应该保持正确的循环结构
  });

  it('应该能够清空链表', () => {
    const list = new LinkedList<number>();
    list.add(1);
    list.add(2);
    list.add(3);
    list.clear();
    expect(list.toArray()).toEqual([]); // 清空后应该没有元素
    expect(list.getSize()).toBe(0); // 清空后大小应该为0
  });

  it('空链表应该正常处理', () => {
    const list = new LinkedList<number>();
    expect(list.isEmpty()).toBe(true); // 新建链表应该为空
    expect(list.removeAt(0)).toBe(null); // 删除空链表中的元素应该返回null
  });

  it('双向链表应该能够添加元素', () => {
    const list = new LinkedList<number>(true);
    list.add(1);
    list.add(2);
    list.add(3);
    expect(list.toArray()).toEqual([1, 2, 3]); // 添加后的双向链表内容应该正确
  });

  it('双向链表应该能够删除元素', () => {
    const list = new LinkedList<number>(true);
    list.add(1);
    list.add(2);
    list.add(3);
    list.removeAt(1);
    expect(list.toArray()).toEqual([1, 3]); // 删除后的双向链表内容应该正确
  });

  it('双向链表应该能够反转', () => {
    const list = new LinkedList<number>(true);
    list.add(1);
    list.add(2);
    list.add(3);
    list.reverse();
    expect(list.toArray()).toEqual([3, 2, 1]); // 反转后的双向链表内容应该正确
  });
});
