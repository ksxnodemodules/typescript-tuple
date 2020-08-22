import { compare } from 'static-type-assert'
import { First } from '..'

compare<First<['sole']>, 'sole'>('equal')
compare<First<['first', 'middle', 'last']>, 'first'>('equal')
