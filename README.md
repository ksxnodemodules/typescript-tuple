# TypeScript Tuple

Generics to work with tuples in TypeScript

## Requirements

* TypeScript ≥ 4.1.0

## Usage

### `IsFinite`

```typescript
import { IsFinite } from 'typescript-tuple'

type Foo = IsFinite<[0, 1, 2]> // Expect: true
const foo: Foo = true

type Bar = IsFinite<[0, 1, 2, ...number[]]> // Expect: false
const bar: Bar = false

type Baz = IsFinite<[0, 1, 2], 'finite', 'infinite'> // Expect: 'finite'
const baz: Baz = 'finite'
```

### `First`

```typescript
import { First } from 'typescript-tuple'
type Foo = First<['a', 'b', 'c']> // Expect: 'a'
const foo: Foo = 'a'
```

### `Last`

```typescript
import { Last } from 'typescript-tuple'
type Foo = Last<['a', 'b', 'c']> // Expect: 'c'
const foo: Foo = 'c'
```

### `Tail`

```typescript
import { Tail } from 'typescript-tuple'
type Foo = Tail<['a', 'b', 'c']> // Expect: ['b', 'c']
const foo: Foo = ['b', 'c']
```

### `Append`

```typescript
import { Append } from 'typescript-tuple'
type Foo = Append<['a', 'b', 'c'], 'x'> // Expect: ['a', 'b', 'c', 'x']
const foo: Foo = ['a', 'b', 'c', 'x']
```

### `Prepend`

```typescript
import { Prepend } from 'typescript-tuple'
type Foo = Prepend<['a', 'b', 'c'], 'x'> // Expect: ['x', 'a', 'b', 'c']
const foo: Foo = ['x', 'a', 'b', 'c']
```

### `Reverse`

```typescript
import { Reverse } from 'typescript-tuple'
type Foo = Reverse<['a', 'b', 'c']> // Expect: ['c', 'b', 'a']
const foo: Foo = ['c', 'b', 'a']
```

### `Concat`

```typescript
import { Concat } from 'typescript-tuple'
type Foo = Concat<['a', 'b', 'c'], [0, 1, 2]> // Expect ['a', 'b', 'c', 0, 1, 2]
const foo: Foo = ['a', 'b', 'c', 0, 1, 2]
```

### `Repeat`

```typescript
import { Repeat } from 'typescript-tuple'

// Basic
type Foo = Repeat<'x', 5> // Expect ['x', 'x', 'x', 'x', 'x']
const foo: Foo = ['x', 'x', 'x', 'x', 'x']

// Using union
type Bar = Repeat<'x', 1 | 3 | 4> // Expect ['x'] | ['x', 'x', 'x'] | ['x', 'x', 'x', 'x']
const bar1: Bar = ['x']
const bar3: Bar = ['x', 'x', 'x']
const bar4: Bar = ['x', 'x', 'x', 'x']

// Using ambiguous 'number' type
type Baz = Repeat<'x', number> // Expect 'x'[]
const baz: Baz = Array<number>()
```

**NOTES:**

* Due to TypeScript design limitations, using floating point numbers and negative numbers might lead to infinite loop within TSC compiler, avoid doing this.

### `ConcatMultiple`

```typescript
import { ConcatMultiple } from 'typescript-tuple'
type Foo = ConcatMultiple<[[], ['a'], ['b', 'c']]> // Expect ['a', 'b', 'c']
const foo: Foo = ['a', 'b', 'c']
```

### `Drop`

```typescript
import { Drop } from 'typescript-tuple'

type Foo = Drop<[0, 1, 2, 3, 4], 2> // Expect [2, 3, 4]
const foo: Foo = [2, 3, 4]

type Bar = Drop<[0, 1, 2, 3, 4, ...number[]], 2> // Expect [2, 3, 4, ...number[]]
const bar: Bar = [2, 3, 4]

type Baz = Drop<[0, 1, 2, 3, 4], 10> // Expect []
const baz: Baz = [2, 3, 4]

type Qux = Drop<[0, 1, 2, 3, 4, ...number[]], 10> // Expect number[]
const qux: Qux = [2, 3, 4]
```

### `SliceStartQuantity`

```typescript
import { SliceStartQuantity } from 'typescript-tuple'
type Foo = SliceStartQuantity<[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 2, 4> // Expect [2, 3, 4, 5]
const foo: Foo = [2, 3, 4, 5]
```

### `FillTuple`

```typescript
import { FillTuple } from 'typescript-tuple'
type Foo = FillTuple<[0, 1, 2, 3], 'r'>
const foo: Foo = ['r', 'r', 'r', 'r']
```

### `CompareLength`

```typescript
import { CompareLength } from 'typescript-tuple'

type Foo = CompareLength<[0, 1, 2], ['a', 'b', 'c']> // Expect: 'equal'
const foo: Foo = 'equal'

type Bar = CompareLength<[0, 1], ['a', 'b', 'c', 'd']> // Expect: 'shorterLeft'
const bar: Bar = 'shorterLeft'

type Baz = CompareLength<[0, 1, 2, 3], ['a', 'b']> // Expect: 'shorterRight'
const baz: Baz = 'shorterRight'
```

### `SortTwoTuple`

```typescript
import { SortTwoTuple } from 'typescript-tuple'

type Foo = SortTwoTuple<[0, 1], ['a', 'b', 'c', 'd']> // Expect: [[0, 1], ['a', 'b', 'c', 'd']]
const foo: Foo = [[0, 1], ['a', 'b', 'c', 'd']]

type Bar = SortTwoTuple<[0, 1, 2, 3], ['a', 'b']> // Expect: [['a', 'b'], [0, 1, 2, 3]]
const bar: Bar = [['a', 'b'], [0, 1, 2, 3]]

type Baz = SortTwoTuple<[0, 1, 2], ['a', 'b', 'c', 'd']> // Expect: [[0, 1, 2], ['a', 'b', 'c']]
const baz: Baz = [[0, 1], 3, ['a', 'b', 'c']]

type Qux = SortTwoTuple<[0, 1, 2], ['a', 'b', 'c', 'd'], 'EQUAL'> // Expect: 'EQUAL'
const qux: Qux = 'EQUAL'
```

### `ShortestTuple`

```typescript
import { ShortestTuple } from 'typescript-tuple'

type Foo = ShortestTuple<[[0, 1, 2], [false, true], ['a', 'b', 'c', 'd']]> // Expect: [false, true]
const foo: Foo = [false, true]

type Bar = ShortestTuple<[[0, 1, 2], ['a', 'b', 'c'], ...[false, true][]]> // Expect: [false, true]
const bar: Bar = [false, true]
```

### `LongestTuple`

```typescript
import { LongestTuple } from 'typescript-tuple'

type Foo = LongestTuple<[[0, 1, 2, 3], [false, true], ['a']]> // Expect: [0, 1, 2, 3]
const foo: Foo = [0, 1, 2, 3]

type Bar = LongestTuple<[[], [false, true], ...[0, 1, 2][]]> // Expect: [0, 1, 2]
const bar: Bar = [0, 1, 2]
```

### `FilterTuple`

```typescript
import { FilterTuple } from 'typescript-tuple'

type Foo = FilterTuple<[1, '1'], number> // Expect: [1]
const foo: Foo = [1]

type Bar = FilterTuple<[1, '1', null, true], 1 | '1' | true> // Expect: [1, '1', true]
const bar: Bar = [1, '1', true]
```

## License

[MIT](https://git.io/fA2d9) @ [Hoàng Văn Khải](https://github.com/KSXGitHub)
