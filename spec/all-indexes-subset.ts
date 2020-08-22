import { compare } from 'static-type-assert'
import { AllIndexesSubset } from '..'

compare<
  AllIndexesSubset<string, [0, 1, 'a', 2, 'b', 'c']>,
  [2, 4, 5]
>('equal')

compare<
  AllIndexesSubset<string, [0, 1, 'a', 2, ...'b'[]]>,
  [2, ...4[]]
>('equal')

compare<
  AllIndexesSubset<string, 'x'[]>,
  0[]
>('equal')

compare<
  AllIndexesSubset<string, []>,
  []
>('equal')

compare<
  AllIndexesSubset<string, [0, 1, 2, 3]>,
  []
>('equal')

compare<
  AllIndexesSubset<string, 123[]>,
  []
>('equal')

compare<
  AllIndexesSubset<string, [0, 1, 2, 3, ...number[]]>,
  []
>('equal')
