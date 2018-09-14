/**
 * Choose type base on whether or not a tuple is finite
 * @example `IsFinite<[0, 1, 2]>` → `true`
 * @example `IsFinite<[0, 1, 2, ...number[]]>` → `false`
 * @example `IsFinite<[0], 'Finite', 'Infinite'>` → `'Finite'`
 * @example `IsFinite<[0, ...number[]], 'Finite', 'Infinite'>` → `Infinite`
 */
export type IsFinite<Tuple extends any[], Finite = true, Infinite = false> = utils.IsFinite<Tuple, Finite, Infinite>

/**
 * Split an infinite tuple into a finite tuple and an array
 * @example `SplitInfiniteTuple<[0, 1, 2, ...number[]]>` → `[[0, 1, 2], number[]]`
 */
export type SplitInfiniteTuple<Tuple extends any[]> = utils.SplitInfiniteTail<Tuple>

/**
 * Get type of first element
 * @example `First<[0, 1, 2]>` → `0`
 */
export type First<Tuple extends [any, ...any[]]> = Tuple[0]

/**
 * Get type of last element
 * @example `Last<[0, 1, 2]>` → `2`
 */
export type Last<Tuple extends any[]> = utils.Last<Tuple>

/**
 * Add an element to the end of a tuple
 * @example `Append<[0, 1, 2], 'new'>` → `[0, 1, 2, 'new']`
 */
export type Append<Tuple extends any[], Addend> = Reverse<Prepend<Reverse<Tuple>, Addend>>

/**
 * Add an element to the beginning of a tuple
 * @example `Prepend<[0, 1, 2], 'new'>` → `['new', 0, 1, 2]`
 */
export type Prepend<Tuple extends any[], Addend> = utils.Prepend<Tuple, Addend>

/**
 * Reverse a tuple
 * @example `Reverse<[0, 1, 2]>` → `[2, 1, 0]`
 */
export type Reverse<Tuple extends any[]> = utils.Reverse<Tuple>

/**
 * Concat two tuple into one
 * @example `Concat<[0, 1, 2], ['a', 'b', 'c']>` → `[0, 1, 2, 'a', 'b', 'c']`
 */
export type Concat<Left extends any[], Right extends any[]> = utils.Concat<Left, Right>

/**
 * Repeat a certain type into a tuple
 * @example `Repeat<'foo', 4>` → `['foo', 'foo', 'foo', 'foo']`
 * @warning To avoid potential infinite loop, `Count` must be an integer greater than or equal to 0
 */
export type Repeat<Type, Count extends number> = utils.Repeat<Type, Count, []>

/**
 * Concat multiple tuples
 * @example `ConcatMultiple<[], [0], [1, 2], [3, 4, 5]>` → `[0, 1, 2, 3, 4, 5]`
 */
export type ConcatMultiple<TupleSet extends any[][]> = utils.ConcatMultiple<TupleSet>

/**
 * Create a set of tuple of single element
 * @example `SingleTupleSet<[0, 1, 2]>` → `[[0], [1], [2]]`
 * @example `SingleTupleSet<[0, 1, 2, ...number[]]>` → `[[0], [1], [2], ...[number][]]`
 */
export type SingleTupleSet<Types extends any[]> = utils.SingleTupleSet<Types>

/**
 * Fill a tuple of types
 * @example `FillTuple<[0, 1, 2], 'x'>` → `['x', 'x', 'x']`
 * @example `FillTuple<any[], 'x'>` → `'x'[]`
 */
export type FillTuple<Tuple extends any[], Replacement> = utils.FillTuple<Tuple, Replacement>

/**
 * Compare length of two tuple
 * @example `CompareLength<[0, 1, 2], ['a', 'b', 'c']>` → `'equal'`
 * @example `CompareLength<[0, 1], ['a', 'b', 'c']>` → `'shorterLeft'`
 * @example `CompareLength<[0, 1, 2], ['a', 'b']>` → `'shorterRight'`
 */
export type CompareLength<Left extends any[], Right extends any[]> = utils.CompareLength<Left, Right>

/**
 * Sort two tuples in order of [shorter, longer]
 * @example `SortTwoTuple<[0, 1, 2, 3], ['a', 'b']>` → `[['a', 'b'], [0, 1, 2, 3]]`
 * @example `SortTwoTuple<[0, 1], ['a', 'b', 'c', 'd']>` → `[[0, 1], ['a', 'b', 'c', 'd']]`
 * @example `SortTwoTuple<[0, 1, 2], ['a', 'b', 'c']>` → `[[0, 1, 2], ['a', 'b', 'c']]`
 * @example `SortTwoTuple<[0, 1, 2], ['a', 'b', 'c'], 'EQUAL'>` → `'EQUAL'`
 */
export type SortTwoTuple<Left extends any[], Right extends any[], WhenEqual = [Left, Right]> = utils.SortTwoTuple<Left, Right, WhenEqual>

/**
 * Find shortest tuple in a set of tuples
 * @example `ShortestTuple<[[0, 1, 2], [true, false], ['a', 'b', 'c', 'd']]>` → `[true, false]`
 */
export type ShortestTuple<TupleSet extends [any[], ...any[][]]> = utils.ShortestTuple<TupleSet>

/**
 * Create a tuple of ascending integers
 * @example `RangeZeroAsc<5>` → `[0, 1, 2, 3, 4]`
 */
export type RangeZeroAsc<Count extends number> = utils.RangeZeroAsc<Count>

/**
 * Create a tuple of descending integers
 * @example `RangeZeroDesc<5>` → `[4, 3, 2, 1, 0]`
 */
export type RangeZeroDesc<Count extends number> = utils.RangeZeroDesc<Count>

export namespace utils {
  export type IsFinite<Tuple extends any[], Finite, Infinite> = {
    empty: Finite,
    nonEmpty: ((..._: Tuple) => any) extends ((_: infer First, ..._1: infer Rest) => any)
      ? IsFinite<Rest, Finite, Infinite>
      : never,
    infinite: Infinite
  }[
    Tuple extends [] ? 'empty' :
    Tuple extends (infer Element)[] ?
    Element[] extends Tuple ?
      'infinite'
    : 'nonEmpty'
    : never
  ]

  export type SplitInfiniteTail<Tuple extends any[]> =
    _SplitInfiniteTail<Tuple> extends [infer Finite, infer Infinite] ?
    Finite extends any[] ?
      [Reverse<Finite>, Infinite]
    : never
    : never

  export type _SplitInfiniteTail<Tuple extends any[], Holder extends any[] = []> = {
    matched: [Holder, Tuple],
    unmatched: ((..._: Tuple) => any) extends ((_: infer First, ..._1: infer Rest) => any)
      ? _SplitInfiniteTail<Rest, Prepend<Holder, First>>
      : never,
    finite: [Tuple, []]
  }[
    Tuple extends (infer Element)[] ?
      Element[] extends Tuple ? 'matched' : 'unmatched'
    : never
  ]

  export type Last<Tuple extends any[], Default = never> = {
    empty: Default,
    single: Tuple extends [infer SoleElement] ? SoleElement : never,
    multi: ((..._: Tuple) => any) extends ((_: any, ..._1: infer Next) => any) ? Last<Next> : Default,
    infinite: Tuple extends (infer Element)[] ? Element : never
  }[
    Tuple extends [] ? 'empty' :
    Tuple extends [any] ? 'single' :
      Tuple extends (infer Element)[]
        ? Element[] extends Tuple ? 'infinite'
        : 'multi'
    : never
  ]

  export type Prepend<Tuple extends any[], Addend> =
    ((_: Addend, ..._1: Tuple) => any) extends ((..._: infer Result) => any) ? Result : never

  export type Reverse<Tuple extends any[], Prefix extends any[] = []> = {
    empty: Prefix,
    nonEmpty: ((..._: Tuple) => any) extends ((_: infer First, ..._1: infer Next) => any)
      ? Reverse<Next, Prepend<Prefix, First>>
      : never,
    infinite: {
      ERROR: 'Cannot reverse an infinite tuple',
      CODENAME: 'InfiniteTuple'
    }
  }[
    Tuple extends [any, ...any[]]
      ? IsFinite<Tuple, 'nonEmpty', 'infinite'>
      : 'empty'
  ]

  export type Concat<Left extends any[], Right extends any[]> = {
    emptyLeft: Right,
    singleLeft: Left extends [infer SoleElement]
      ? Prepend<Right, SoleElement>
      : never,
    multiLeft: ((..._: Reverse<Left>) => any) extends ((_: infer LeftLast, ..._1: infer ReversedLeftRest) => any)
      ? Concat<Reverse<ReversedLeftRest>, Prepend<Right, LeftLast>>
      : never,
    infiniteLeft: {
      ERROR: 'Left is not finite',
      CODENAME: 'InfiniteLeft' & 'Infinite'
    }
  }[
    Left extends [] ? 'emptyLeft' :
    Left extends [any] ? 'singleLeft' :
    IsFinite<Left, 'multiLeft', 'infiniteLeft'>
  ]

  export type Repeat<Type, Count extends number, Holder extends any[] = []> =
    number extends Count
      ? Type[]
      : {
          fit: Holder,
          unfit: Repeat<Type, Count, Prepend<Holder, Type>>,
          union: Count extends Holder['length'] | infer Rest ?
            Rest extends number ?
              Repeat<Type, Holder['length']> | Repeat<Type, Rest>
            : never
            : never
        }[
          Holder['length'] extends Count ? // It is possible for Count to be a union
          Count extends Holder['length'] ? // Make sure that Count is not a union
            'fit'
          : 'union'
          : 'unfit'
        ]

  export type ConcatMultiple<TupleSet extends any[][]> = {
    empty: [],
    nonEmpty: ((..._: Reverse<TupleSet>) => any) extends ((_: infer Last, ..._1: infer ReversedRest) => any) ?
      Last extends any[] ?
      ReversedRest extends any[][] ?
        Concat<ConcatMultiple<Reverse<ReversedRest>>, Last> :
      never :
      never :
      never,
    infinite: {
      ERROR: 'TupleSet is not finite',
      CODENAME: 'InfiniteTupleSet' & 'Infinite'
    }
  }[
    TupleSet extends [] ? 'empty' : IsFinite<TupleSet, 'nonEmpty', 'infinite'>
  ]

  export type SingleTupleSet<Types extends any[], Holder extends [any][] = []> = {
    empty: Holder,
    nonEmpty: ((..._: Reverse<Types>) => any) extends ((_: infer Last, ..._1: infer ReversedRest) => any)
      ? SingleTupleSet<Reverse<ReversedRest>, Prepend<Holder, [Last]>>
      : never,
    infinite: SplitInfiniteTuple<Types> extends [infer Finite, infer Infinite] ?
      Finite extends any [] ?
      Infinite extends (infer RepeatedElement)[] ?
        SingleTupleSet<Finite, [RepeatedElement][]>
      : never
      : never
      : never
  }[
    Types extends [] ? 'empty' : IsFinite<Types, 'nonEmpty', 'infinite'>
  ]

  export type FillTuple<Tuple extends any[], Replacement, Holder extends any[] = []> = {
    empty: Holder,
    nonEmpty: ((...a: Tuple) => any) extends ((a: infer First, ...b: infer Rest) => any)
      ? FillTuple<Rest, Replacement, Prepend<Holder, Replacement>>
      : never,
    infinite: Replacement[]
  }[
    Tuple extends [] ? 'empty' : IsFinite<Tuple, 'nonEmpty', 'infinite'>
  ]

  export type CompareLength<Left extends any[], Right extends any[]> = {
    fitBoth: 'equal',
    fitLeft: 'shorterLeft',
    fitRight: 'shorterRight',
    unfit: ((..._: Left) => any) extends ((_: any, ..._1: infer LeftRest) => any) ?
      ((..._: Right) => any) extends ((_: any, ..._1: infer RightRest) => any) ?
        CompareLength<LeftRest, RightRest>
      : never
      : never
  }[
    Left['length'] extends Right['length'] ? 'fitBoth' :
    Left extends [] ? 'fitLeft' :
    Right extends [] ? 'fitRight' :
    'unfit'
  ]

  export type SortTwoTuple<Left extends any[], Right extends any[], WhenEqual = [Left, Right]> = {
    equal: WhenEqual,
    shorterLeft: [Left, Right],
    shorterRight: [Right, Left]
  }[CompareLength<Left, Right>]

  export type ShortestTuple<TupleSet extends any[][], Shortest = any[]> = {
    empty: Shortest,
    nonEmpty: ((..._: TupleSet) => any) extends ((_: infer Head, ..._1: infer Tail) => any) ?
      Tail extends any[] ?
      Shortest extends any[] ?
      Head extends any[] ?
        ShortestTuple<Tail, SortTwoTuple<Shortest, Head>[0]>
      : never
      : never
      : never
      : never,
    infinite: {
      ERROR: 'TupleSet is not finite',
      CODENAME: 'InfiniteTupleSet' & 'Infinite'
    }
  }[
    TupleSet extends [] ? 'empty' : IsFinite<TupleSet, 'nonEmpty', 'infinite'>
  ]

  export type ZipPairWithShorterLeft<Left extends any[], Right extends any[], Holder extends any[][] = []> = {
    empty: Holder,
    nonEmpty: ((..._: Reverse<Left>) => any) extends ((_: infer LeftLast, ..._1: infer ReversedLeftRest) => any) ?
      ((..._: Reverse<Right>) => any) extends ((_: infer RightLast, ..._1: infer ReversedRightRest) => any) ?
        ZipPairWithShorterLeft<
          Reverse<ReversedLeftRest>,
          Reverse<ReversedRightRest>,
          Prepend<Holder, [LeftLast, RightLast]>
        >
      : {
        ERROR: 'Parameter "Left" should be shorter than or as long as "Right"',
        CODENAME: 'LeftTooLong' & 'RightTooShort'
      }
      : never
  }[
    Left extends [] ? 'empty' : 'nonEmpty'
  ]

  export type ZipPairByBase<
    Base extends any[], // Base can be [any, any, ...], its element type doesn't matter
    Left extends any[],
    Right extends any[],
    Holder extends any[][] = []
  > = {
    empty: Holder,
    nonEmpty: ((..._: Base) => any) extends ((_: any, ..._1: infer BaseRest) => any) ?
      ((..._: Reverse<Left>) => any) extends ((_: infer LeftLast, ..._1: infer ReversedLeftRest) => any) ?
      ((..._: Reverse<Right>) => any) extends ((_: infer RightLast, ..._1: infer ReversedRightRest) => any) ?
        ZipPairByBase<
          BaseRest,
          Reverse<ReversedLeftRest>,
          Reverse<ReversedRightRest>,
          Prepend<Holder, [LeftLast, RightLast]>
        >
      : {
        ERROR: 'Parameter "Right" is too short',
        CODENAME: 'RightTooShort' & 'BaseTooLong'
      }
      : {
        ERROR: 'Parameter "Left" is too short',
        CODENAME: 'LeftTooShort' & 'BaseTooLong'
      }
      : never
  }[
    Base extends [] ? 'empty' : 'nonEmpty'
  ]

  export type ZipByShortest<TupleSet extends any[][], Holder extends any[][] = []> = {
  }
  export type RangeZeroAsc<
    Count extends number,
    Holder extends any[] = [],
  > = {
    fit: Holder,
    unfit: RangeZeroAsc<Count, Append<Holder, Holder['length']>>,
    infinite: number[],
    union: Count extends Holder['length'] | infer Rest ?
      Rest extends number ?
        RangeZeroAsc<Holder['length']> | RangeZeroAsc<Rest>
      : never
      : never
  }[
    number extends Holder['length'] ? 'infinite' :
    Holder['length'] extends Count ?
    Count extends Holder['length'] ?
      'fit'
    : 'union'
    : 'unfit'
  ]

  export type RangeZeroDesc<
    Count extends number,
    Holder extends any[] = [],
  > = {
    fit: Holder,
    unfit: RangeZeroDesc<Count, Prepend<Holder, Holder['length']>>,
    infinite: number[],
    union: Count extends Holder['length'] | infer Rest ?
      Rest extends number ?
        RangeZeroDesc<Holder['length']> | RangeZeroDesc<Rest>
      : never
      : never
  }[
    number extends Holder['length'] ? 'infinite' :
    Holder['length'] extends Count ?
    Count extends Holder['length'] ?
      'fit'
    : 'union'
    : 'unfit'
  ]
}
