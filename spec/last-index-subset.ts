import assert from 'static-type-assert'
import compare = assert.compare
import { LastIndexSubset } from '..'

compare<
  LastIndexSubset<string, [0, false, 'a', 1, true, 'b', null]>,
  5
>('equal')

compare<
  LastIndexSubset<string, [0, true, undefined, ...string[]]>,
  3
>('equal')

compare<
  LastIndexSubset<string, string[]>,
  0
>('equal')

compare<
  LastIndexSubset<string, []>,
  never
>('equal')

compare<
  LastIndexSubset<string, [0, 1, 2]>,
  never
>('equal')

compare<
  LastIndexSubset<string, 7[]>,
  never
>('equal')

compare<
  LastIndexSubset<string, [0, false, null, ...symbol[]]>,
  never
>('equal')

compare<
  LastIndexSubset<string, [0, false, null], 'NotFound'>,
  'NotFound'
>('equal')
