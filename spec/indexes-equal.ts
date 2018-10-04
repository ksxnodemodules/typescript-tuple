import assert from 'static-type-assert'
import compare = assert.compare
import { IndexesEqual } from '..'

compare<
  IndexesEqual<'x', ['a', 'b', 'x', 'c', 'x', 'x']>,
  [2, 4, 5]
>('equal')

compare<
  IndexesEqual<'x', ['a', 'b', 'x', 'd', ...'x'[]]>,
  [2, ...4[]]
>('equal')

compare<
  IndexesEqual<'x', 'x'[]>,
  0[]
>('equal')

compare<
  IndexesEqual<'x', []>,
  []
>('equal')

compare<
  IndexesEqual<'x', [0, 1, 2, 3]>,
  []
>('equal')

compare<
  IndexesEqual<'x', 'y'[]>,
  []
>('equal')

compare<
  IndexesEqual<'x', [0, 1, 2, 3, ...number[]]>,
  []
>('equal')
