# TypeScript Tuple

Generics to work with tuples in TypeScript

## Requirements

* TypeScript ≥ 3.0.0

## Usage

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
type Foo = Repeat<['x'], 5> // Expect ['x', 'x', 'x', 'x', 'x']
const foo: Foo = ['x', 'x', 'x', 'x', 'x']
```

### `ConcatMultiple`

```typescript
import { ConcatMultiple } from 'typescript-tuple'
type Foo = ConcatMultiple<[[], ['a'], ['b', 'c']]> // Expect ['a', 'b', 'c']
const foo: Foo = ['a', 'b', 'c']
```

## License

[MIT](https://git.io/fA2d9) @ [Hoàng Văn Khải](https://github.com/KSXGitHub)
