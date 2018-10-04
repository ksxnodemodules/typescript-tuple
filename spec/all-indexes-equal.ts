import assert from 'static-type-assert'
import compare = assert.compare
import { AllIndexesEqual } from '..'

compare<
  AllIndexesEqual<'x', ['a', 'b', 'x', 'c', 'x', 'x']>,
  [2, 4, 5]
>('equal')

compare<
  AllIndexesEqual<'x', ['a', 'b', 'x', 'd', ...'x'[]]>,
  [2, ...4[]]
>('equal')

compare<
  AllIndexesEqual<'x', 'x'[]>,
  0[]
>('equal')

compare<
  AllIndexesEqual<'x', []>,
  []
>('equal')

compare<
  AllIndexesEqual<'x', [0, 1, 2, 3]>,
  []
>('equal')

compare<
  AllIndexesEqual<'x', 'y'[]>,
  []
>('equal')

compare<
  AllIndexesEqual<'x', [0, 1, 2, 3, ...number[]]>,
  []
>('equal')
