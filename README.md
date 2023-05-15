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
* [`addListener(string, ...)`](#addlistenerstring)
* [Interfaces](#interfaces)

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
StringeeConnect(token: string, listenerFunc: (data: any) => void) => void
```

| Param              | Type                                |
| ------------------ | ----------------------------------- |
| **`token`**        | <code>string</code>                 |
| **`listenerFunc`** | <code>(data: any) =&gt; void</code> |

--------------------


### StringeeCall(...)

```typescript
StringeeCall(callFrom: string, callTo: string, listenerFunc: (data: any) => void) => void
```

| Param              | Type                                |
| ------------------ | ----------------------------------- |
| **`callFrom`**     | <code>string</code>                 |
| **`callTo`**       | <code>string</code>                 |
| **`listenerFunc`** | <code>(data: any) =&gt; void</code> |

--------------------


### StringeeReject()

```typescript
StringeeReject() => void
```

--------------------


### addListener(string, ...)

```typescript
addListener(name: string, listenerFunc: (data: any) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                |
| ------------------ | ----------------------------------- |
| **`name`**         | <code>string</code>                 |
| **`listenerFunc`** | <code>(data: any) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### Interfaces


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

</docgen-api>
