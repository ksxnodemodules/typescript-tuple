import * as utils from './utils'

/**
 * Choose type base on whether or not a tuple is finite
 * @example IsFinite<[0, 1, 2]> → true
 * @example IsFinite<[0, 1, 2, ...number[]]> → false
 * @example IsFinite<[0], 'Finite', 'Infinite'> → 'Finite'
 * @example IsFinite<[0, ...number[]], 'Finite', 'Infinite'> → Infinite
 */
export type IsFinite<Tuple extends any[], Finite = true, Infinite = false> =
  utils.IsFinite<Tuple, Finite, Infinite>

/**
 * Get type of first element
 * @example First<[0, 1, 2]> → 0
 */
export type First<Tuple extends [any, ...any[]]> = Tuple[0]

/**
 * Get type of last element
 * @example Last<[0, 1, 2]> → 2
 */
export type Last<Tuple extends any[]> = utils.Last<Tuple>

/**
 * Drop the first element
 * @example Tail<[0, 1, 2, 3]> → [1, 2, 3]
 */
export type Tail<Tuple extends any[]> = utils.Tail<Tuple>

/**
 * Add an element to the end of a tuple
 * @example Append<[0, 1, 2], 'new'> → [0, 1, 2, 'new']
 */
export type Append<Tuple extends any[], Addend> = Reverse<Prepend<Reverse<Tuple>, Addend>>

/**
 * Add an element to the beginning of a tuple
 * @example Prepend<[0, 1, 2], 'new'> → ['new', 0, 1, 2]
 */
export type Prepend<Tuple extends any[], Addend> = utils.Prepend<Tuple, Addend>

/**
 * Reverse a tuple
 * @example Reverse<[0, 1, 2]> → [2, 1, 0]
 */
export type Reverse<Tuple extends any[]> = utils.Reverse<Tuple>

/**
 * Concat two tuple into one
 * @example Concat<[0, 1, 2], ['a', 'b', 'c']> → [0, 1, 2, 'a', 'b', 'c']
 */
export type Concat<Left extends any[], Right extends any[]> = utils.Concat<Left, Right>

/**
 * Repeat a certain type into a tuple
 * @example Repeat<'foo', 4> → ['foo', 'foo', 'foo', 'foo']
 * @warning To avoid potential infinite loop, Count must be an integer greater than or equal to 0
 */
export type Repeat<Type, Count extends number> = utils.Repeat<Type, Count, []>

/**
 * Concat multiple tuples
 * @example ConcatMultiple<[], [0], [1, 2], [3, 4, 5]> → [0, 1, 2, 3, 4, 5]
 */
export type ConcatMultiple<TupleSet extends any[][]> = utils.ConcatMultiple<TupleSet>

/**
 * Drop `Quantity` first elements of a tuple
 * @example Drop<['a', 'b', 'c', 'd', 'e'], 2> → ['c', 'd', 'e']
 * @example Drop<['a', 'b', 'c', 'd', 'e', ...string[]], 2> → ['c', 'd', 'e', ...string[]]
 * @example Drop<['a', 'b', 'c', 'd', 'e', ...string[]], 10> → string[]
 */
export type Drop<Tuple extends any[], Quantity extends number> = utils.Drop<Tuple, Quantity>

/**
 * Slice a tuple
 * @example SliceStartQuantity<[0, 1, 2, 3, 4, 5, 6], 2, 3> → [2, 3, 4]
 * @example SliceStartQuantity<[0, 1, 2, 3, 4, 5, 6], 2, 9> → [2, 3, 4, 5, 6]
 */
export type SliceStartQuantity<
  Tuple extends any[],
  Start extends number,
  Quantity extends number
> = utils.SliceStartQuantity<Tuple, Start, Quantity>

/**
 * Fill a tuple of types
 * @example FillTuple<[0, 1, 2], 'x'> → ['x', 'x', 'x']
 * @example FillTuple<any[], 'x'> → 'x'[]
 */
export type FillTuple<Tuple extends any[], Replacement> = utils.FillTuple<Tuple, Replacement>

/**
 * Compare length of two tuple
 * @example CompareLength<[0, 1, 2], ['a', 'b', 'c']> → 'equal'
 * @example CompareLength<[0, 1], ['a', 'b', 'c']> → 'shorterLeft'
 * @example CompareLength<[0, 1, 2], ['a', 'b']> → 'shorterRight'
 */
export type CompareLength<Left extends any[], Right extends any[]> = utils.CompareLength<Left, Right>

/**
 * Sort two tuples in order of [shorter, longer]
 * @example SortTwoTuple<[0, 1, 2, 3], ['a', 'b']> → [['a', 'b'], [0, 1, 2, 3]]
 * @example SortTwoTuple<[0, 1], ['a', 'b', 'c', 'd']> → [[0, 1], ['a', 'b', 'c', 'd']]
 * @example SortTwoTuple<[0, 1, 2], ['a', 'b', 'c']> → [[0, 1, 2], ['a', 'b', 'c']]
 * @example SortTwoTuple<[0, 1, 2], ['a', 'b', 'c'], 'EQUAL'> → 'EQUAL'
 */
export type SortTwoTuple<Left extends any[], Right extends any[], WhenEqual = [Left, Right]> =
  utils.SortTwoTuple<Left, Right, WhenEqual>

/**
 * Find shortest tuple in a set of tuples
 * @example ShortestTuple<[[0, 1, 2], [true, false], ['a', 'b', 'c', 'd']]> → [true, false]
 */
export type ShortestTuple<TupleSet extends [any[], ...any[][]]> = utils.ShortestTuple<TupleSet>

/**
 * Find shortest tuple in a set of tuples
 * @example LongestTuple<[[0, 1, 2], [true, false], ['a', 'b', 'c', 'd']]> → ['a', 'b', 'c', 'd']
 */
export type LongestTuple<TupleSet extends [any[], ...any[][]]> = utils.LongestTuple<TupleSet>

/**
 * Filter tuple elements thats match the mask
 * @example FilterTuple<[1, 2, true, '3'], string | number> → [1, 2, "3"]
 */
export type FilterTuple<TupleSet extends any[], Mask> = utils.FilterTuple<TupleSet, Mask>
