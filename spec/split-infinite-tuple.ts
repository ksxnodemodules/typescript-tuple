import assert from 'static-type-assert'
import compare = assert.compare
import { SplitInfiniteTuple } from '..'

compare<SplitInfiniteTuple<'x'[]>, [[], 'x'[]]>('equal')
compare<SplitInfiniteTuple<[0, 1, 2, ...'x'[]]>, [[0, 1, 2], 'x'[]]>('equal')
compare<SplitInfiniteTuple<['x', 'x', ...'x'[]]>, [['x', 'x'], 'x'[]]>('equal')
compare<SplitInfiniteTuple<[]>, never>('equal')
compare<SplitInfiniteTuple<[0, 1, 2]>, never>('equal')
