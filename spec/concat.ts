import { compare } from 'static-type-assert'
import { Concat } from '..'

compare<Concat<[], []>, []>('equal')
compare<Concat<[], [0]>, [0]>('equal')
compare<Concat<['a'], []>, ['a']>('equal')
compare<Concat<['a'], [0]>, ['a', 0]>('equal')
compare<Concat<[], [0, 1, 2]>, [0, 1, 2]>('equal')
compare<Concat<['a', 'b', 'c'], []>, ['a', 'b', 'c']>('equal')
compare<Concat<['a', 'b', 'c'], [0, 1, 2]>, ['a', 'b', 'c', 0, 1, 2]>('equal')
