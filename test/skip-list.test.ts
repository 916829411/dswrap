import { describe, it, expect } from 'vitest';
import { SkipList } from '../src/skip-list';

describe('SkipList 测试', () => {
  describe('数字类型测试', () => {
    const skipList = new SkipList<number>();

    it('应该能够插入元素', () => {
      skipList.insert(10);
      skipList.insert(5);
      skipList.insert(15);
      expect(skipList.search(10)).toBe(true);
      expect(skipList.search(5)).toBe(true);
      expect(skipList.search(15)).toBe(true);
      expect(skipList.search(20)).toBe(false);
    });

    it('应该能够删除元素', () => {
      skipList.remove(10);
      expect(skipList.search(10)).toBe(false);
    });

    it('应该支持范围搜索', () => {
      skipList.insertBatch([20, 25, 30]);
      expect(skipList.rangeSearch(5, 25)).toEqual([5, 15, 20, 25]);
    });

    it('应该支持 floor 和 ceil 操作', () => {
      expect(skipList.floor(18)).toBe(15);
      expect(skipList.ceil(18)).toBe(20);
    });
  });

  describe('字符串类型测试', () => {
    const skipList = new SkipList<string>();

    it('应该能够插入元素', () => {
      skipList.insert('apple');
      skipList.insert('banana');
      skipList.insert('cherry');
      expect(skipList.search('banana')).toBe(true);
      expect(skipList.search('grape')).toBe(false);
    });

    it('应该能够删除元素', () => {
      skipList.remove('banana');
      expect(skipList.search('banana')).toBe(false);
    });

    it('应该支持范围搜索', () => {
      skipList.insertBatch(['date', 'fig', 'grape']);
      expect(skipList.rangeSearch('apple', 'grape')).toEqual([
        'apple',
        'cherry',
        'date',
        'fig',
        'grape',
      ]);
    });

    it('应该支持 floor 和 ceil 操作', () => {
      expect(skipList.floor('blueberry')).toBe('apple');
      expect(skipList.ceil('blueberry')).toBe('cherry');
    });
  });

  describe('对象类型测试', () => {
    const skipList = new SkipList<{ id: number; name: string }>({
      compare: (a, b) => a.id - b.id,
    });

    it('应该能够插入元素', () => {
      skipList.insert({ id: 1, name: 'Alice' });
      skipList.insert({ id: 3, name: 'Bob' });
      skipList.insert({ id: 2, name: 'Charlie' });
      expect(skipList.search({ id: 2, name: 'Charlie' })).toBe(true);
    });

    it('应该能够删除元素', () => {
      skipList.remove({ id: 3, name: 'Bob' });
      expect(skipList.search({ id: 3, name: 'Bob' })).toBe(false);
    });

    it('应该支持范围搜索', () => {
      skipList.insertBatch([
        { id: 4, name: 'David' },
        { id: 5, name: 'Eve' },
      ]);
      expect(
        skipList.rangeSearch({ id: 1, name: '' }, { id: 4, name: '' }),
      ).toEqual([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Charlie' },
        { id: 4, name: 'David' },
      ]);
    });

    it('应该支持 floor 和 ceil 操作', () => {
      expect(skipList.floor({ id: 3, name: '' })).toEqual({
        id: 2,
        name: 'Charlie',
      });
      expect(skipList.ceil({ id: 3, name: '' })).toEqual({
        id: 4,
        name: 'David',
      });
    });
  });
});
