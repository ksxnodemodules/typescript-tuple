import { compare } from 'static-type-assert'
import { SingleTupleSet } from '..'

compare<SingleTupleSet<[]>, []>('equal')
compare<SingleTupleSet<[0, 1, 2]>, [[0], [1], [2]]>('equal')
compare<SingleTupleSet<'x'[]>, ['x'][]>('equal')
compare<SingleTupleSet<[0, ...'x'[]]>, [[0], ...['x'][]]>('equal')
