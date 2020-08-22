import { compare } from 'static-type-assert'
import { Tail } from '..'

compare<Tail<[0, 1, 2, 3]>, [1, 2, 3]>('equal')
compare<Tail<number[]>, number[]>('equal')
compare<Tail<[]>, []>('equal')
