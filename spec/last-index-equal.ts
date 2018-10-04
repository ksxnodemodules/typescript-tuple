import assert from 'static-type-assert'
import compare = assert.compare
import { LastIndexEqual } from '..'

compare<
  LastIndexEqual<'x', ['a', 'b', 'x', 'c', 'x', 'd']>,
  4
>('equal')

compare<
  LastIndexEqual<'x', ['a', 'b', 'c', ...'x'[]]>,
  3[]
>('equal')

compare<
  LastIndexEqual<'x', 'x'[]>,
  0[]
>('equal')

compare<
  LastIndexEqual<'x', []>,
  never
>('equal')

compare<
  LastIndexEqual<'x', ['a', 'b', 'c']>,
  never
>('equal')

compare<
  LastIndexEqual<'x', string[]>,
  never
>('equal')

compare<
  LastIndexEqual<'x', ['a', 'b', 'c', ...string[]]>,
  never
>('equal')

compare<
  LastIndexEqual<'x', ['a', 'b', 'c'], 'NotFound'>,
  'NotFound'
>('equal')
