import assert from 'static-type-assert'
import compare = assert.compare
import { IndexesSuperset } from '..'

compare<
  IndexesSuperset<'x', [number, boolean, string, null, 'x', 'x' | 'y']>,
  [2, 4, 5]
>('equal')

compare<
  IndexesSuperset<'x', [number, boolean, string, null, ...'x'[]]>,
  [2, ...4[]]
>('equal')

compare<
  IndexesSuperset<'x', string[]>,
  0[]
>('equal')

compare<
  IndexesSuperset<'x', []>,
  []
>('equal')

compare<
  IndexesSuperset<'x', [number, boolean, null]>,
  []
>('equal')

compare<
  IndexesSuperset<'x', number[]>,
  []
>('equal')

compare<
  IndexesSuperset<'x', [number, boolean, null, ...number[]]>,
  []
>('equal')
