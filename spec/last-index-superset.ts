import assert from 'static-type-assert'
import compare = assert.compare
import { LastIndexSuperset } from '..'

compare<
  LastIndexSuperset<'x', [number, symbol, string, boolean, 'x' | 'y', null]>,
  4
>('equal')

compare<
  LastIndexSuperset<'x', [number, symbol, boolean, ...string[]]>,
  3[]
>('equal')

compare<
  LastIndexSuperset<'x', string[]>,
  0[]
>('equal')

compare<
  LastIndexSuperset<'x', []>,
  never
>('equal')

compare<
  LastIndexSuperset<'x', [number, symbol, boolean]>,
  never
>('equal')

compare<
  LastIndexSuperset<'x', number[]>,
  never
>('equal')

compare<
  LastIndexSuperset<'x', [number, symbol, boolean, ...object[]]>,
  never
>('equal')

compare<
  LastIndexSuperset<'x', [number, symbol, boolean], 'NotFound'>,
  'NotFound'
>('equal')
