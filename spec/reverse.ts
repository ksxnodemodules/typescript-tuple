import { compare } from 'static-type-assert'
import { Reverse } from '..'

compare<Reverse<[]>, []>('equal')
compare<Reverse<['sole']>, ['sole']>('equal')
compare<Reverse<[0, 1, 2]>, [2, 1, 0]>('equal')
