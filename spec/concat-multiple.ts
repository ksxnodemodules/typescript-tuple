import assert from 'static-type-assert'
import compare = assert.compare
import { ConcatMultiple } from '..'

compare<ConcatMultiple<[]>, []>('equal')
compare<ConcatMultiple<[[], [], []]>, []>('equal')
compare<ConcatMultiple<[[], [0], [1, 2], [3, 4, 5]]>, [0, 1, 2, 3, 4, 5]>('equal')
compare<ConcatMultiple<[['a', 'b'], ['A', 'B'], [0, 1], [true, false]]>, ['a', 'b', 'A', 'B', 0, 1, true, false]>('equal')
compare<ConcatMultiple<[[0, 1, 2, 3], [4, 5, 6], [7, 8], [9], []]>, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]>('equal')
