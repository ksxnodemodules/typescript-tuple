import { compare } from 'static-type-assert'
import { SortTwoTuple } from '..'

compare<SortTwoTuple<[0, 1, 2, 3], ['a', 'b']>, [['a', 'b'], [0, 1, 2, 3]]>('equal')
compare<SortTwoTuple<[0, 1, 2], ['a', 'b', 'c'], 'equal'>, 'equal'>('equal')
compare<SortTwoTuple<[0, 1], ['a', 'b', 'c', 'd']>, [[0, 1], ['a', 'b', 'c', 'd']]>('equal')
compare<SortTwoTuple<[0, 1, 2], ['a', 'b', 'c']>, [[0, 1, 2], ['a', 'b', 'c']]>('equal')
