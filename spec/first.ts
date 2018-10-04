import assert from 'static-type-assert'
import compare = assert.compare
import { First } from '..'

compare<First<['sole']>, 'sole'>('equal')
compare<First<['first', 'middle', 'last']>, 'first'>('equal')
