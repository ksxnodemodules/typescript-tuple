import { compare } from 'static-type-assert'
import { ShortestTuple } from '..'

compare<ShortestTuple<[[0, 1, 2, 3]]>, [0, 1, 2, 3]>('equal')
compare<ShortestTuple<['x'[]]>, 'x'[] | any[]>('broaderRight')
compare<ShortestTuple<[[], [0], [1, 2], [3, 4, 5]]>, []>('equal')
compare<ShortestTuple<[[0, 1, 2], [3, 4], [5], []]>, []>('equal')
compare<ShortestTuple<[[0, 1, 2, 3, 4, 5], [true, false], ['a', 'b', 'c']]>, [true, false]>('equal')
compare<ShortestTuple<[[0, 1, 2, 3], ['a', 'b', 'c'], ...[][]]>, []>('equal')
compare<ShortestTuple<[[0, 1, 2, 3], ['a', 'b', 'c'], ...[true, false][]]>, [true, false]>('equal')
compare<ShortestTuple<[[0], ['a', 'b'], ...[0, 1, 2][]]>, [0]>('equal')
