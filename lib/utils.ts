export type IsFinite<Tuple extends any[], Finite, Infinite> = {
  empty: Finite
  nonEmpty: ((..._: Tuple) => any) extends ((_: infer First, ..._1: infer Rest) => any)
    ? IsFinite<Rest, Finite, Infinite>
    : never
  infinite: Infinite
}[
  Tuple extends [] ? 'empty' :
  Tuple extends (infer Element)[] ?
  Element[] extends Tuple ?
    'infinite'
  : 'nonEmpty'
  : never
]

export type _SplitInfiniteTuple<Tuple extends any[], Holder extends any[] = []> = {
  matched: [Holder, Tuple]
  unmatched: ((..._: Tuple) => any) extends ((_: infer First, ..._1: infer Rest) => any)
    ? _SplitInfiniteTuple<Rest, Prepend<Holder, First>>
    : never
  finite: [Tuple, []]
}[
  Tuple extends (infer Element)[] ?
    Element[] extends Tuple ? 'matched' : 'unmatched'
  : never
]

export type First<Tuple extends any[], Default = never> =
  Tuple extends [any, ...any[]] ? Tuple[0] : Default

export type Last<Tuple extends any[], Default = never> = {
  empty: Default
  single: Tuple extends [infer SoleElement] ? SoleElement : never
  multi: ((..._: Tuple) => any) extends ((_: any, ..._1: infer Next) => any) ? Last<Next> : Default
  infinite: Tuple extends (infer Element)[] ? Element : never
}[
  Tuple extends [] ? 'empty' :
  Tuple extends [any] ? 'single' :
    Tuple extends (infer Element)[]
      ? Element[] extends Tuple ? 'infinite'
      : 'multi'
  : never
]

export type Tail<Tuple extends any[]> =
  ((...args: Tuple) => any) extends ((_: any, ..._1: infer Rest) => any)
    ? Rest
    : never

export type Prepend<Tuple extends any[], Addend> = [Addend, ...Tuple]

export type Reverse<Tuple extends any[], Prefix extends any[] = []> = {
  empty: Prefix,
  nonEmpty: ((..._: Tuple) => any) extends ((_: infer First, ..._1: infer Next) => any)
    ? Reverse<Next, Prepend<Prefix, First>>
    : never
  infinite: {
    ERROR: 'Cannot reverse an infinite tuple'
    CODENAME: 'InfiniteTuple'
  }
}[
  Tuple extends [any, ...any[]]
    ? IsFinite<Tuple, 'nonEmpty', 'infinite'>
    : 'empty'
]

export type Concat<Left extends any[], Right extends any[]> = [...Left, ...Right]

export type Repeat<Type, Count extends number, Holder extends any[] = []> =
  Count extends never ? never :
  number extends Count
    ? Type[]
    : {
      fit: Holder
      unfit: Repeat<Type, Count, Prepend<Holder, Type>>
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
  empty: []
  nonEmpty: ((..._: Reverse<TupleSet>) => any) extends ((_: infer Last, ..._1: infer ReversedRest) => any) ?
    Last extends any[] ?
    ReversedRest extends any[][] ?
      Concat<ConcatMultiple<Reverse<ReversedRest>>, Last> :
    never :
    never :
    never
  infinite: {
    ERROR: 'TupleSet is not finite',
    CODENAME: 'InfiniteTupleSet' & 'Infinite'
  }
}[
  TupleSet extends [] ? 'empty' : IsFinite<TupleSet, 'nonEmpty', 'infinite'>
]

export type Drop<
  Tuple extends any[],
  Quantity extends number,
  Count extends any[] = []
> = {
  matched: Tuple
  unmatched: ((...args: Tuple) => any) extends ((_: any, ..._1: infer Rest) => any)
    ? Drop<Rest, Quantity, Prepend<Count, Count['length']>>
    : never
}[
  Tuple extends [] ? 'matched' :
  Quantity extends Count['length'] ? 'matched' :
  'unmatched'
]

export type SliceStartQuantity<
  Tuple extends any[],
  Start extends number,
  Quantity extends number,
  Holder extends any[] = [],
  Count extends any[] = []
> = {
  before: SliceStartQuantity<
    Tail<Tuple>,
    Start,
    Quantity,
    Holder,
    Prepend<Count, Count['length']>
  >
  start: ((...args: Tuple) => any) extends ((_: infer First, ..._1: infer Rest) => any)
    ? SliceStartQuantity<
      Rest,
      Start,
      Quantity,
      Prepend<Holder, First>,
      Count
    >
    : never
  end: Reverse<Holder>
}[
  Tuple extends [] ? 'end' :
  Quantity extends Holder['length'] ? 'end' :
  Start extends Count['length'] ? 'start' :
  'before'
]

export type FillTuple<Tuple extends any[], Replacement, Holder extends any[] = []> = {
  empty: Holder
  nonEmpty: ((...a: Tuple) => any) extends ((a: infer First, ...b: infer Rest) => any)
    ? FillTuple<Rest, Replacement, Prepend<Holder, Replacement>>
    : never
  infinite: Replacement[]
}[
  Tuple extends [] ? 'empty' : IsFinite<Tuple, 'nonEmpty', 'infinite'>
]

export type CompareLength<Left extends any[], Right extends any[]> = {
  fitBoth: 'equal'
  fitLeft: 'shorterLeft'
  fitRight: 'shorterRight'
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
  equal: WhenEqual
  shorterLeft: [Left, Right]
  shorterRight: [Right, Left]
}[CompareLength<Left, Right>]

export type ShortestTuple<TupleSet extends any[][], Shortest = any[]> = {
  empty: Shortest
  nonEmpty: ((..._: TupleSet) => any) extends ((_: infer Head, ..._1: infer Tail) => any) ?
    Tail extends any[] ?
    Shortest extends any[] ?
    Head extends any[] ?
      Tail extends Head[]
        ? SortTwoTuple<Shortest, Head>[0]
        : ShortestTuple<Tail, SortTwoTuple<Shortest, Head>[0]>
    : never
    : never
    : never
    : never
}[
  TupleSet extends [] ? 'empty' : 'nonEmpty'
]

export type LongestTuple<TupleSet extends any[][], Longest = []> = {
  empty: Longest
  nonEmpty: ((..._: TupleSet) => any) extends ((_: infer Head, ..._1: infer Tail) => any) ?
    Tail extends any[] ?
    Longest extends any[] ?
    Head extends any[] ?
      Tail extends Head[]
        ? SortTwoTuple<Longest, Head>[1]
        : LongestTuple<Tail, SortTwoTuple<Longest, Head>[1]>
    : never
    : never
    : never
    : never
}[
  TupleSet extends [] ? 'empty' : 'nonEmpty'
]

export type FilterTuple<Tuple extends any[], Mask> = ConcatMultiple<{
  [K in keyof Tuple]: Tuple[K] extends Mask ? [Tuple[K]] : []
}>
