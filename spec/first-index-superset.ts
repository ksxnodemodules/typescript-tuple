import assert from 'static-type-assert'
import compare = assert.compare
import { FirstIndexSuperset } from '..'

compare<
  FirstIndexSuperset<'x', [number, symbol, string, boolean, 'x']>,
  2
>('equal')

compare<
  FirstIndexSuperset<'x', [number, symbol, boolean, ...string[]]>,
  3
>('equal')

compare<
  FirstIndexSuperset<'x', string[]>,
  0
>('equal')

compare<
  FirstIndexSuperset<'x', []>,
  never
>('equal')

compare<
  FirstIndexSuperset<'x', [number, symbol, boolean]>,
  never
>('equal')

compare<
  FirstIndexSuperset<'x', number[]>,
  never
>('equal')

compare<
  FirstIndexSuperset<'x', [number, symbol, boolean, ...object[]]>,
  never
>('equal')

compare<
  FirstIndexSuperset<'x', [number, symbol, boolean], 'NotFound'>,
  'NotFound'
>('equal')
