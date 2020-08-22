import { compare } from 'static-type-assert'
import { Append } from '..'

compare<Append<[], 'new'>, ['new']>('equal')
compare<Append<['old'], 'new'>, ['old', 'new']>('equal')
compare<Append<[0, 1, 2], 'new'>, [0, 1, 2, 'new']>('equal')
