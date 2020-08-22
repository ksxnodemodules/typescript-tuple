import { compare } from 'static-type-assert'
import { LongestTuple } from '..'

compare<LongestTuple<[[0, 1, 2, 3]]>, [0, 1, 2, 3]>('equal')
compare<LongestTuple<['x'[]]>, 'x'[]>('equal')
compare<LongestTuple<[[], [0, 1], [2, 3, 4], 'x'[]]>, 'x'[]>('equal')
compare<LongestTuple<['x'[], ...[0, 1, 2][]]>, 'x'[]>('equal')
compare<LongestTuple<[[], [0, 1], ...'x'[][]]>, 'x'[]>('equal')
compare<LongestTuple<[[], [0], [1, 2], [3, 4, 5]]>, [3, 4, 5]>('equal')
compare<LongestTuple<[[0, 1, 2], [3, 4], [5], []]>, [0, 1, 2]>('equal')
compare<LongestTuple<[[0, 1, 2, 3, 4, 5], [true, false], ['a', 'b', 'c']]>, [0, 1, 2, 3, 4, 5]>('equal')
compare<LongestTuple<[[0, 1, 2, 3], ['a', 'b', 'c'], ...[][]]>, [0, 1, 2, 3]>('equal')
compare<LongestTuple<[[true, false], ['a', 'b', 'c'], ...[0, 1, 2, 3][]]>, [0, 1, 2, 3]>('equal')
compare<LongestTuple<[[0, 1, 2, 3], ['a', 'b'], ...[0][]]>, [0, 1, 2, 3]>('equal')
