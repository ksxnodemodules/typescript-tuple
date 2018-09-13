import assert from 'static-type-assert'
import equal = assert.equality

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

equal<IsFinite<[]>, true>(true)
equal<IsFinite<[], 'finite', 'infinite'>, 'finite'>(true)
equal<IsFinite<'x'[]>, false>(true)
equal<IsFinite<'x'[], 'finite', 'infinite'>, 'infinite'>(true)
equal<IsFinite<[0, 1, 2]>, true>(true)
equal<IsFinite<[0, 1, 2], 'finite', 'infinite'>, 'finite'>(true)
equal<IsFinite<[0, 1, 2, ...number[]]>, false>(true)
equal<IsFinite<[0, 1, 2, ...number[]], 'finite', 'infinite'>, 'infinite'>(true)

equal<First<['sole']>, 'sole'>(true)
equal<First<['first', 'middle', 'last']>, 'first'>(true)

equal<Last<['last']>, 'last'>(true)
equal<Last<['first', 'middle', 'last']>, 'last'>(true)
equal<Last<'last'[]>, 'last'>(true)
equal<Last<['first', ...'last'[]]>, 'last'>(true)

equal<Append<[], 'new'>, ['new']>(true)
equal<Append<['old'], 'new'>, ['old', 'new']>(true)
equal<Append<[0, 1, 2], 'new'>, [0, 1, 2, 'new']>(true)

equal<Prepend<[], 'new'>, ['new']>(true)
equal<Prepend<['old'], 'new'>, ['new', 'old']>(true)
equal<Prepend<[0, 1, 2], 'new'>, ['new', 0, 1, 2]>(true)

equal<Reverse<[]>, []>(true)
equal<Reverse<['sole']>, ['sole']>(true)
equal<Reverse<[0, 1, 2]>, [2, 1, 0]>(true)

equal<Concat<[], []>, []>(true)
equal<Concat<[], [0]>, [0]>(true)
equal<Concat<['a'], []>, ['a']>(true)
equal<Concat<['a'], [0]>, ['a', 0]>(true)
equal<Concat<[], [0, 1, 2]>, [0, 1, 2]>(true)
equal<Concat<['a', 'b', 'c'], []>, ['a', 'b', 'c']>(true)
equal<Concat<['a', 'b', 'c'], [0, 1, 2]>, ['a', 'b', 'c', 0, 1, 2]>(true)

equal<Repeat<'x', 0>, []>(true)
equal<Repeat<'x', 1>, ['x']>(true)
equal<Repeat<'x', 4>, ['x', 'x', 'x', 'x']>(true)
equal<Repeat<'x', number>, 'x'[]>(true)
equal<Repeat<'x', 0 | 1>, [] | ['x']>(true)
equal<Repeat<'x', 0 | 3>, [] | ['x', 'x', 'x']>(true)
equal<Repeat<'x', 2 | 1>, ['x', 'x'] | ['x']>(true)
equal<Repeat<'x', 2 | 3>, ['x', 'x'] | ['x', 'x', 'x']>(true)
equal<Repeat<'x', 0 | 1 |2 | 3>, [] | ['x'] | ['x', 'x'] | ['x', 'x', 'x']>(true)

equal<ConcatMultiple<[]>, []>(true)
equal<ConcatMultiple<[[], [], []]>, []>(true)
equal<ConcatMultiple<[[], [0], [1, 2], [3, 4, 5]]>, [0, 1, 2, 3, 4, 5]>(true)
equal<ConcatMultiple<[['a', 'b'], ['A', 'B'], [0, 1], [true, false]]>, ['a', 'b', 'A', 'B', 0, 1, true, false]>(true)
equal<ConcatMultiple<[[0, 1, 2, 3], [4, 5, 6], [7, 8], [9], []]>, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]>(true)

equal<SingleTupleSet<[]>, []>(true)
equal<SingleTupleSet<[0, 1, 2]>, [[0], [1], [2]]>(true)
equal<SingleTupleSet<'x'[]>, ['x'][]>(true)
// equal<SingleTupleSet<[0, ...'x'[]]>, [[0], ...['x'][]]>(true) // still failing

equal<FillTuple<[], 'x'>, []>(true)
equal<FillTuple<[0, 1, 2], 'x'>, ['x', 'x', 'x']>(true)
equal<FillTuple<number[], 'x'>, 'x'[]>(true)
equal<FillTuple<[0, ...number[]], 'x'>, 'x'[]>(true)

equal<CompareLength<[], []>, 'equal'>(true)
equal<CompareLength<[], [0, 1, 2]>, 'shorterLeft'>(true)
equal<CompareLength<['a', 'b', 'c'], []>, 'shorterRight'>(true)
equal<CompareLength<['a', 'b'], [0, 1]>, 'equal'>(true)
equal<CompareLength<['a'], [0, 1, 2]>, 'shorterLeft'>(true)
equal<CompareLength<['a', 'b', 'c'], [0]>, 'shorterRight'>(true)
equal<CompareLength<['a', 'b'], [0, 1]>, 'equal'>(true)
equal<CompareLength<string[], number[]>, 'equal'>(true)

equal<SortTwoTuple<[0, 1, 2, 3], ['a', 'b']>, [['a', 'b'], [0, 1, 2, 3]]>(true)
equal<SortTwoTuple<[0, 1, 2], ['a', 'b', 'c'], 'EQUAL'>, 'EQUAL'>(true)
equal<SortTwoTuple<[0, 1], ['a', 'b', 'c', 'd']>, [[0, 1], ['a', 'b', 'c', 'd']]>(true)
equal<SortTwoTuple<[0, 1, 2], ['a', 'b', 'c']>, [[0, 1, 2], ['a', 'b', 'c']]>(true)

equal<ShortestTuple<[[0, 1, 2, 3]]>, [0, 1, 2, 3]>(true)
equal<ShortestTuple<[[], [0], [1, 2], [3, 4, 5]]>, []>(true)
equal<ShortestTuple<[[0, 1, 2], [3, 4], [5], []]>, []>(true)
equal<ShortestTuple<[[0, 1, 2, 3, 4, 5], [true, false], ['a', 'b', 'c']]>, [true, false]>(true)
