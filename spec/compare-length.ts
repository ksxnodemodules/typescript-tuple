import { compare } from 'static-type-assert'
import { CompareLength } from '..'

compare<CompareLength<[], []>, 'equal'>('equal')
compare<CompareLength<[], [0, 1, 2]>, 'shorterLeft'>('equal')
compare<CompareLength<['a', 'b', 'c'], []>, 'shorterRight'>('equal')
compare<CompareLength<['a', 'b'], [0, 1]>, 'equal'>('equal')
compare<CompareLength<['a'], [0, 1, 2]>, 'shorterLeft'>('equal')
compare<CompareLength<['a', 'b', 'c'], [0]>, 'shorterRight'>('equal')
compare<CompareLength<['a', 'b'], [0, 1]>, 'equal'>('equal')
compare<CompareLength<string[], number[]>, 'equal'>('equal')
