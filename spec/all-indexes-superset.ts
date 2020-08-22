import { compare } from 'static-type-assert'
import { AllIndexesSuperset } from '..'

compare<
  AllIndexesSuperset<'x', [number, boolean, string, null, 'x', 'x' | 'y']>,
  [2, 4, 5]
>('equal')

compare<
  AllIndexesSuperset<'x', [number, boolean, string, null, ...'x'[]]>,
  [2, ...4[]]
>('equal')

compare<
  AllIndexesSuperset<'x', string[]>,
  0[]
>('equal')

compare<
  AllIndexesSuperset<'x', []>,
  []
>('equal')

compare<
  AllIndexesSuperset<'x', [number, boolean, null]>,
  []
>('equal')

compare<
  AllIndexesSuperset<'x', number[]>,
  []
>('equal')

compare<
  AllIndexesSuperset<'x', [number, boolean, null, ...number[]]>,
  []
>('equal')
