/**
 * Choose type base on whether or not a tuple is finite
 * @example `IsFinite<[0, 1, 2]>` → `true`
 * @example `IsFinite<[0, 1, 2, ...number[]]>` → `false`
 * @example `IsFinite<[0], 'Finite', 'Infinite'>` → `'Finite'`
 * @example `IsFinite<[0, ...number[]], 'Finite', 'Infinite'>` → `Infinite`
 */
export type IsFinite<Tuple extends any[], Finite = true, Infinite = false> = utils.IsFinite<Tuple, Finite, Infinite>

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
      : never
  }[
    Types extends [] ? 'empty' : 'nonEmpty'
  ]

  export type FillTuple<Tuple extends any[], Replacement, Holder extends any[] = []> = {
    empty: Holder,
    nonEmpty: ((...a: Tuple) => any) extends ((a: infer First, ...b: infer Rest) => any)
      ? FillTuple<Rest, Replacement, Prepend<Holder, Replacement>>
      : never
  }[
    Tuple extends [] ? 'empty' : 'nonEmpty'
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
      : never
  }[
    TupleSet extends [] ? 'empty' : 'nonEmpty'
  ]

}
