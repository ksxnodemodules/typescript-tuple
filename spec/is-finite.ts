import { compare } from 'static-type-assert'
import { IsFinite } from '..'

compare<IsFinite<[]>, true>('equal')
compare<IsFinite<[], 'finite', 'infinite'>, 'finite'>('equal')
compare<IsFinite<'x'[]>, false>('equal')
compare<IsFinite<'x'[], 'finite', 'infinite'>, 'infinite'>('equal')
compare<IsFinite<[0, 1, 2]>, true>('equal')
compare<IsFinite<[0, 1, 2], 'finite', 'infinite'>, 'finite'>('equal')
compare<IsFinite<[0, 1, 2, ...number[]]>, false>('equal')
compare<IsFinite<[0, 1, 2, ...number[]], 'finite', 'infinite'>, 'infinite'>('equal')
