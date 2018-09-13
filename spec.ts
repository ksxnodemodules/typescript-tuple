import assert from 'static-type-assert'
import compare = assert.compare

import {
  IsFinite,
  First,
  Last,
  Append,
  Prepend,
  Reverse,
  Concat,
  Repeat,
  ConcatMultiple,
  SingleTupleSet,
  FillTuple,
  CompareLength,
  SortTwoTuple,
  ShortestTuple
} from './index'

compare<IsFinite<[]>, true>('equal')
compare<IsFinite<[], 'finite', 'infinite'>, 'finite'>('equal')
compare<IsFinite<'x'[]>, false>('equal')
compare<IsFinite<'x'[], 'finite', 'infinite'>, 'infinite'>('equal')
compare<IsFinite<[0, 1, 2]>, true>('equal')
compare<IsFinite<[0, 1, 2], 'finite', 'infinite'>, 'finite'>('equal')
compare<IsFinite<[0, 1, 2, ...number[]]>, false>('equal')
compare<IsFinite<[0, 1, 2, ...number[]], 'finite', 'infinite'>, 'infinite'>('equal')

compare<First<['sole']>, 'sole'>('equal')
compare<First<['first', 'middle', 'last']>, 'first'>('equal')

compare<Last<['last']>, 'last'>('equal')
compare<Last<['first', 'middle', 'last']>, 'last'>('equal')
compare<Last<'last'[]>, 'last'>('equal')
compare<Last<['first', ...'last'[]]>, 'last'>('equal')

compare<Append<[], 'new'>, ['new']>('equal')
compare<Append<['old'], 'new'>, ['old', 'new']>('equal')
compare<Append<[0, 1, 2], 'new'>, [0, 1, 2, 'new']>('equal')

compare<Prepend<[], 'new'>, ['new']>('equal')
compare<Prepend<['old'], 'new'>, ['new', 'old']>('equal')
compare<Prepend<[0, 1, 2], 'new'>, ['new', 0, 1, 2]>('equal')

compare<Reverse<[]>, []>('equal')
compare<Reverse<['sole']>, ['sole']>('equal')
compare<Reverse<[0, 1, 2]>, [2, 1, 0]>('equal')

compare<Concat<[], []>, []>('equal')
compare<Concat<[], [0]>, [0]>('equal')
compare<Concat<['a'], []>, ['a']>('equal')
compare<Concat<['a'], [0]>, ['a', 0]>('equal')
compare<Concat<[], [0, 1, 2]>, [0, 1, 2]>('equal')
compare<Concat<['a', 'b', 'c'], []>, ['a', 'b', 'c']>('equal')
compare<Concat<['a', 'b', 'c'], [0, 1, 2]>, ['a', 'b', 'c', 0, 1, 2]>('equal')

compare<Repeat<'x', 0>, []>('equal')
compare<Repeat<'x', 1>, ['x']>('equal')
compare<Repeat<'x', 4>, ['x', 'x', 'x', 'x']>('equal')
compare<Repeat<'x', number>, 'x'[]>('equal')
compare<Repeat<'x', 0 | 1>, [] | ['x']>('equal')
compare<Repeat<'x', 0 | 3>, [] | ['x', 'x', 'x']>('equal')
compare<Repeat<'x', 2 | 1>, ['x', 'x'] | ['x']>('equal')
compare<Repeat<'x', 2 | 3>, ['x', 'x'] | ['x', 'x', 'x']>('equal')
compare<Repeat<'x', 0 | 1 |2 | 3>, [] | ['x'] | ['x', 'x'] | ['x', 'x', 'x']>('equal')

compare<ConcatMultiple<[]>, []>('equal')
compare<ConcatMultiple<[[], [], []]>, []>('equal')
compare<ConcatMultiple<[[], [0], [1, 2], [3, 4, 5]]>, [0, 1, 2, 3, 4, 5]>('equal')
compare<ConcatMultiple<[['a', 'b'], ['A', 'B'], [0, 1], [true, false]]>, ['a', 'b', 'A', 'B', 0, 1, true, false]>('equal')
compare<ConcatMultiple<[[0, 1, 2, 3], [4, 5, 6], [7, 8], [9], []]>, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]>('equal')

compare<SingleTupleSet<[]>, []>('equal')
compare<SingleTupleSet<[0, 1, 2]>, [[0], [1], [2]]>('equal')
compare<SingleTupleSet<'x'[]>, ['x'][]>('equal')
// compare<SingleTupleSet<[0, ...'x'[]]>, [[0], ...['x'][]]>('equal') // still failing

compare<FillTuple<[], 'x'>, []>('equal')
compare<FillTuple<[0, 1, 2], 'x'>, ['x', 'x', 'x']>('equal')
compare<FillTuple<number[], 'x'>, 'x'[]>('equal')
compare<FillTuple<[0, ...number[]], 'x'>, 'x'[]>('equal')

compare<CompareLength<[], []>, 'equal'>('equal')
compare<CompareLength<[], [0, 1, 2]>, 'shorterLeft'>('equal')
compare<CompareLength<['a', 'b', 'c'], []>, 'shorterRight'>('equal')
compare<CompareLength<['a', 'b'], [0, 1]>, 'equal'>('equal')
compare<CompareLength<['a'], [0, 1, 2]>, 'shorterLeft'>('equal')
compare<CompareLength<['a', 'b', 'c'], [0]>, 'shorterRight'>('equal')
compare<CompareLength<['a', 'b'], [0, 1]>, 'equal'>('equal')
compare<CompareLength<string[], number[]>, 'equal'>('equal')

compare<SortTwoTuple<[0, 1, 2, 3], ['a', 'b']>, [['a', 'b'], [0, 1, 2, 3]]>('equal')
compare<SortTwoTuple<[0, 1, 2], ['a', 'b', 'c'], 'equal'>, 'equal'>('equal')
compare<SortTwoTuple<[0, 1], ['a', 'b', 'c', 'd']>, [[0, 1], ['a', 'b', 'c', 'd']]>('equal')
compare<SortTwoTuple<[0, 1, 2], ['a', 'b', 'c']>, [[0, 1, 2], ['a', 'b', 'c']]>('equal')

compare<ShortestTuple<[[0, 1, 2, 3]]>, [0, 1, 2, 3]>('equal')
compare<ShortestTuple<[[], [0], [1, 2], [3, 4, 5]]>, []>('equal')
compare<ShortestTuple<[[0, 1, 2], [3, 4], [5], []]>, []>('equal')
compare<ShortestTuple<[[0, 1, 2, 3, 4, 5], [true, false], ['a', 'b', 'c']]>, [true, false]>('equal')
