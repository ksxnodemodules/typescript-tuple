import { compare } from 'static-type-assert'
import { Last } from '..'

compare<Last<['last']>, 'last'>('equal')
compare<Last<['first', 'middle', 'last']>, 'last'>('equal')
compare<Last<'last'[]>, 'last'>('equal')
compare<Last<['first', ...'last'[]]>, 'last'>('equal')
