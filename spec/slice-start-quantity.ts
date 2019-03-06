import assert from 'static-type-assert'
import compare = assert.compare
import { SliceStartQuantity } from '..'

compare<
  SliceStartQuantity<[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 2, 4>,
  [2, 3, 4, 5]
>('equal')

compare<
  SliceStartQuantity<[0, 1, 2, 3], 2, 4>,
  [2, 3]
>('equal')
