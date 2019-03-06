import assert from 'static-type-assert'
import compare = assert.compare
import { Drop } from '..'

compare<
  Drop<[0, 1, 2, 3, 4], 2>,
  [2, 3, 4]
>('equal')

compare<
  Drop<[0, 1, 2, 3, 4, ...number[]], 2>,
  [2, 3, 4, ...number[]]
>('equal')

compare<
  Drop<[0, 1, 2, 3, 4], 9>,
  []
>('equal')

compare<
  Drop<[0, 1, 2, 3, 4, ...number[]], 9>,
  number[]
>('equal')
