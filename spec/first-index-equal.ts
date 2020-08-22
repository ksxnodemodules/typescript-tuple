import { compare } from 'static-type-assert'
import { FirstIndexEqual } from '..'

compare<
  FirstIndexEqual<'x', ['a', 'b', 'x', 'c', 'x']>,
  2
>('equal')

compare<
  FirstIndexEqual<'x', ['a', 'b', 'c', ...'x'[]]>,
  3
>('equal')

compare<
  FirstIndexEqual<'x', 'x'[]>,
  0
>('equal')

compare<
  FirstIndexEqual<'x', []>,
  never
>('equal')

compare<
  FirstIndexEqual<'x', ['a', 'b', 'c']>,
  never
>('equal')

compare<
  FirstIndexEqual<'x', string[]>,
  never
>('equal')

compare<
  FirstIndexEqual<'x', ['a', 'b', 'c', ...string[]]>,
  never
>('equal')

compare<
  FirstIndexEqual<'x', ['a', 'b', 'c'], 'NotFound'>,
  'NotFound'
>('equal')
