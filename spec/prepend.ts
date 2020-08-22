import { compare } from 'static-type-assert'
import { Prepend } from '..'

compare<Prepend<[], 'new'>, ['new']>('equal')
compare<Prepend<['old'], 'new'>, ['new', 'old']>('equal')
compare<Prepend<[0, 1, 2], 'new'>, ['new', 0, 1, 2]>('equal')
