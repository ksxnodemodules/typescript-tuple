import assert from 'static-type-assert'
import compare = assert.compare
import { IndexesSubset } from '..'

compare<
  IndexesSubset<string, [0, 1, 'a', 2, 'b', 'c']>,
  [2, 4, 5]
>('equal')

compare<
  IndexesSubset<string, [0, 1, 'a', 2, ...'b'[]]>,
  [2, ...4[]]
>('equal')

compare<
  IndexesSubset<string, 'x'[]>,
  0[]
>('equal')

compare<
  IndexesSubset<string, []>,
  []
>('equal')

compare<
  IndexesSubset<string, [0, 1, 2, 3]>,
  []
>('equal')

compare<
  IndexesSubset<string, 123[]>,
  []
>('equal')

compare<
  IndexesSubset<string, [0, 1, 2, 3, ...number[]]>,
  []
>('equal')
