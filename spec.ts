import assert from 'static-type-assert'

import {
  First,
  Last,
  Append,
  Prepend,
  Reverse,
  Concat
} from './index'

assert<First<['sole']>>('sole')
assert<First<['first', 'middle', 'last']>>('first')

assert<Last<['last']>>('last')
assert<Last<['first', 'middle', 'last']>>('last')

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
