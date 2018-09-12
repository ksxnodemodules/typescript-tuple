import assert from 'static-type-assert'

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
  CompareLength
} from './index'

assert<IsFinite<[]>>(true)
assert<IsFinite<[], 'finite', 'infinite'>>('finite')
assert<IsFinite<'x'[]>>(false)
assert<IsFinite<'x'[], 'finite', 'infinite'>>('infinite')
assert<IsFinite<[0, 1, 2]>>(true)
assert<IsFinite<[0, 1, 2], 'finite', 'infinite'>>('finite')
assert<IsFinite<[0, 1, 2, ...number[]]>>(false)
assert<IsFinite<[0, 1, 2, ...number[]], 'finite', 'infinite'>>('infinite')

assert<First<['sole']>>('sole')
assert<First<['first', 'middle', 'last']>>('first')

assert<Last<['last']>>('last')
assert<Last<['first', 'middle', 'last']>>('last')
assert<Last<'last'[]>>('last')
assert<Last<['first', ...'last'[]]>>('last')

assert<Append<[], 'new'>>(['new'])
assert<Append<['old'], 'new'>>(['old', 'new'])
assert<Append<[0, 1, 2], 'new'>>([0, 1, 2, 'new'])

assert<Prepend<[], 'new'>>(['new'])
assert<Prepend<['old'], 'new'>>(['new', 'old'])
assert<Prepend<[0, 1, 2], 'new'>>(['new', 0, 1, 2])

assert<Reverse<[]>>([])
assert<Reverse<['sole']>>(['sole'])
assert<Reverse<[0, 1, 2]>>([2, 1, 0])

assert<Concat<[], []>>([])
assert<Concat<[], [0]>>([0])
assert<Concat<['a'], []>>(['a'])
assert<Concat<['a'], [0]>>(['a', 0])
assert<Concat<[], [0, 1, 2]>>([0, 1, 2])
assert<Concat<['a', 'b', 'c'], []>>(['a', 'b', 'c'])
assert<Concat<['a', 'b', 'c'], [0, 1, 2]>>(['a', 'b', 'c', 0, 1, 2])

assert<Repeat<'x', 0>>([])
assert<Repeat<'x', 1>>(['x'])
assert<Repeat<'x', 4>>(['x', 'x', 'x', 'x'])
assert<Repeat<'x', number>>([], ['x'], ['x', 'x'], Array<'x'>())
assert<Repeat<'x', 0 | 1>>([], ['x'])
assert<Repeat<'x', 0 | 3>>([], ['x', 'x', 'x'])
assert<Repeat<'x', 2 | 1>>(['x', 'x'], ['x'])
assert<Repeat<'x', 2 | 3>>(['x', 'x'], ['x', 'x', 'x'])
assert<Repeat<'x', 0 | 1 |2 | 3>>([], ['x'], ['x', 'x'], ['x', 'x', 'x'])

assert<ConcatMultiple<[]>>([])
assert<ConcatMultiple<[[], [], []]>>([])
assert<ConcatMultiple<[[], [0], [1, 2], [3, 4, 5]]>>([0, 1, 2, 3, 4, 5])
assert<ConcatMultiple<[['a', 'b'], ['A', 'B'], [0, 1], [true, false]]>>(['a', 'b', 'A', 'B', 0, 1, true, false])
assert<ConcatMultiple<[[0, 1, 2, 3], [4, 5, 6], [7, 8], [9], []]>>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

assert<SingleTupleSet<[]>>([])
assert<SingleTupleSet<[0, 1, 2]>>([[0], [1], [2]])
assert<SingleTupleSet<'x'[]>>(Array<['x']>(), [], [['x']], [['x'], ['x']])
assert<SingleTupleSet<[0, ...'x'[]]>>([], [[0]], [[0], ['x'], ['x']])

assert<FillTuple<[], 'x'>>([])
assert<FillTuple<[0, 1, 2], 'x'>>(['x', 'x', 'x'])
assert<FillTuple<number[], 'x'>>([], ['x'], ['x', 'x'], ['x', 'x', 'x'], Array<'x'>())
assert<FillTuple<[0, ...number[]], 'x'>>(['x'], ['x', 'x'], ['x', 'x', 'x'])

assert<CompareLength<[], []>>('equal')
assert<CompareLength<[], [0, 1, 2]>>('shorterLeft')
assert<CompareLength<['a', 'b', 'c'], []>>('shorterRight')
assert<CompareLength<['a', 'b'], [0, 1]>>('equal')
assert<CompareLength<['a'], [0, 1, 2]>>('shorterLeft')
assert<CompareLength<['a', 'b', 'c'], [0]>>('shorterRight')
assert<CompareLength<['a', 'b'], [0, 1]>>('equal')
assert<CompareLength<string[], number[]>>('equal')
assert<CompareLength<['a', 'b', ...string[]], [0, 1, ...number[]]>>('equal')
