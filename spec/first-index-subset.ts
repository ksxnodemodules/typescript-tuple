import assert from 'static-type-assert'
import compare = assert.compare
import { FirstIndexSubset } from '..'

compare<
  FirstIndexSubset<string, [0, false, 'a', 1, true, 'b']>,
  2
>('equal')

compare<
  FirstIndexSubset<string, [0, true, undefined, ...string[]]>,
  3
>('equal')

compare<
  FirstIndexSubset<string, string[]>,
  0
>('equal')

compare<
  FirstIndexSubset<string, []>,
  never
>('equal')

compare<
  FirstIndexSubset<string, [0, 1, 2]>,
  never
>('equal')

compare<
  FirstIndexSubset<string, 7[]>,
  never
>('equal')

compare<
  FirstIndexSubset<string, [0, false, null, ...symbol[]]>,
  never
>('equal')

compare<
  FirstIndexSubset<string, [0, false, null], 'NotFound'>,
  'NotFound'
>('equal')
