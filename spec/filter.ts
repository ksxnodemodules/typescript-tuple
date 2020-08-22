import { compare } from 'static-type-assert'
import { FilterTuple } from '..'

compare<FilterTuple<[1], number>, [1]>('equal')
compare<FilterTuple<['1'], number>, []>('equal')
compare<FilterTuple<[1, 1], number>, [1, 1]>('equal')
compare<FilterTuple<[1, '1'], number>, [1]>('equal')
compare<FilterTuple<[1, '1', null, true], null>, [null]>('equal')
compare<FilterTuple<[1, '1', null, true], 1 | '1' | true>, [1, '1', true]>('equal')
