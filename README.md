# capacitor-stringee

Capacitor Plugin for Stringee Apps

## Install

```bash
npm install capacitor-stringee
npx cap sync
```

## API

<docgen-index>

* [`echo(...)`](#echo)
* [`StringeeConnect(...)`](#stringeeconnect)
* [`StringeeCall(...)`](#stringeecall)
* [`StringeeReject()`](#stringeereject)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### echo(...)

```typescript
echo(options: { value: string; }) => Promise<{ value: string; }>
```

echo input value

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: string; }</code> |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------


### StringeeConnect(...)

```typescript
StringeeConnect(token: string) => void
```

| Param       | Type                |
| ----------- | ------------------- |
| **`token`** | <code>string</code> |

--------------------


### StringeeCall(...)

```typescript
StringeeCall(callFrom: string, callTo: string) => void
```

| Param          | Type                |
| -------------- | ------------------- |
| **`callFrom`** | <code>string</code> |
| **`callTo`**   | <code>string</code> |

--------------------


### StringeeReject()

```typescript
StringeeReject() => void
```

--------------------

</docgen-api>
