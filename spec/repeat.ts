import { compare } from 'static-type-assert'
import { Repeat } from '..'

compare<Repeat<'x', 0>, []>('equal')
compare<Repeat<'x', 1>, ['x']>('equal')
compare<Repeat<'x', 4>, ['x', 'x', 'x', 'x']>('equal')
compare<Repeat<'x', number>, 'x'[]>('equal')
compare<Repeat<'x', 0 | 1>, [] | ['x']>('equal')
compare<Repeat<'x', 0 | 3>, [] | ['x', 'x', 'x']>('equal')
compare<Repeat<'x', 2 | 1>, ['x', 'x'] | ['x']>('equal')
compare<Repeat<'x', 2 | 3>, ['x', 'x'] | ['x', 'x', 'x']>('equal')
compare<Repeat<'x', 0 | 1 | 2 | 3>, [] | ['x'] | ['x', 'x'] | ['x', 'x', 'x']>('equal')
