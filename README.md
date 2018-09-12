# TypeScript Tuple

Generics to work with tuples in TypeScript

## Requirements

* TypeScript ≥ 3.0.0

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

### `SingleTupleSet`

```typescript
import { SingleTupleSet } from 'typescript-tuple'

type Foo = SingleTupleSet<[0, 1, 2]> // Expect [[0], [1], [2]]
const foo: Foo = [[0], [1], [2]]

type Bar = SingleTupleSet<'x'[]> // Expect ['x'][]
const bar: Bar = Array<['x']>()
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

## License

[MIT](https://git.io/fA2d9) @ [Hoàng Văn Khải](https://github.com/KSXGitHub)
