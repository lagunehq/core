[@lagunehq/core](../README.md) > ["client/streaming-handler"](../modules/_client_streaming_handler_.md) > [StreamingHandler](../classes/_client_streaming_handler_.streaminghandler.md)

# Class: StreamingHandler

Mastodon streaming api wrapper

## Type parameters
#### EventTypes :  `string` \| `symbol`
## Hierarchy

 `EventEmitter`

**↳ StreamingHandler**

## Index

### Interfaces

* [EventEmitterStatic](../interfaces/_client_streaming_handler_.streaminghandler.eventemitterstatic.md)
* [ListenerFn](../interfaces/_client_streaming_handler_.streaminghandler.listenerfn.md)

### Properties

* [EventEmitter](_client_streaming_handler_.streaminghandler.md#eventemitter)
* [prefixed](_client_streaming_handler_.streaminghandler.md#prefixed)

### Methods

* [addListener](_client_streaming_handler_.streaminghandler.md#addlistener)
* [connect](_client_streaming_handler_.streaminghandler.md#connect)
* [disconnect](_client_streaming_handler_.streaminghandler.md#disconnect)
* [emit](_client_streaming_handler_.streaminghandler.md#emit)
* [eventNames](_client_streaming_handler_.streaminghandler.md#eventnames)
* [listenerCount](_client_streaming_handler_.streaminghandler.md#listenercount)
* [listeners](_client_streaming_handler_.streaminghandler.md#listeners)
* [off](_client_streaming_handler_.streaminghandler.md#off)
* [on](_client_streaming_handler_.streaminghandler.md#on)
* [once](_client_streaming_handler_.streaminghandler.md#once)
* [removeAllListeners](_client_streaming_handler_.streaminghandler.md#removealllisteners)
* [removeListener](_client_streaming_handler_.streaminghandler.md#removelistener)

---

## Properties

<a id="eventemitter"></a>

### `<Static>` EventEmitter

**● EventEmitter**: *`EventEmitterStatic`*

*Defined in /Users/nucx/Developments/core/node_modules/eventemitter3/index.d.ts:61*

___
<a id="prefixed"></a>

### `<Static>` prefixed

**● prefixed**: *`string` \| `boolean`*

*Inherited from EventEmitter.prefixed*

*Defined in /Users/nucx/Developments/core/node_modules/eventemitter3/index.d.ts:6*

___

## Methods

<a id="addlistener"></a>

###  addListener

▸ **addListener**(event: *`EventTypes`*, fn: *`ListenerFn`*, context?: *`any`*): `this`

*Inherited from EventEmitter.addListener*

*Defined in /Users/nucx/Developments/core/node_modules/eventemitter3/index.d.ts:33*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `EventTypes` |
| fn | `ListenerFn` |
| `Optional` context | `any` |

**Returns:** `this`

___
<a id="connect"></a>

###  connect

▸ **connect**(url: *`string`*): `Promise`<[StreamingHandler](_client_streaming_handler_.streaminghandler.md)>

*Defined in [client/streaming-handler.ts:47](https://github.com/lagunehq/core/blob/9f0a933/src/client/streaming-handler.ts#L47)*

Connect to the websocket endpoint

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| url | `string` |  URL of the websocket endpoint |

**Returns:** `Promise`<[StreamingHandler](_client_streaming_handler_.streaminghandler.md)>

___
<a id="disconnect"></a>

###  disconnect

▸ **disconnect**(): `void`

*Defined in [client/streaming-handler.ts:60](https://github.com/lagunehq/core/blob/9f0a933/src/client/streaming-handler.ts#L60)*

Disconnect from the websocket endpoint

**Returns:** `void`

___
<a id="emit"></a>

###  emit

▸ **emit**(event: *`EventTypes`*, ...args: *`Array`<`any`>*): `boolean`

*Inherited from EventEmitter.emit*

*Defined in /Users/nucx/Developments/core/node_modules/eventemitter3/index.d.ts:27*

Calls each of the listeners registered for a given event.

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `EventTypes` |
| `Rest` args | `Array`<`any`> |

**Returns:** `boolean`

___
<a id="eventnames"></a>

###  eventNames

▸ **eventNames**(): `Array`<`EventTypes`>

*Inherited from EventEmitter.eventNames*

*Defined in /Users/nucx/Developments/core/node_modules/eventemitter3/index.d.ts:12*

Return an array listing the events for which the emitter has registered listeners.

**Returns:** `Array`<`EventTypes`>

___
<a id="listenercount"></a>

###  listenerCount

▸ **listenerCount**(event: *`EventTypes`*): `number`

*Inherited from EventEmitter.listenerCount*

*Defined in /Users/nucx/Developments/core/node_modules/eventemitter3/index.d.ts:22*

Return the number of listeners listening to a given event.

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `EventTypes` |

**Returns:** `number`

___
<a id="listeners"></a>

###  listeners

▸ **listeners**(event: *`EventTypes`*): `Array`<`ListenerFn`>

*Inherited from EventEmitter.listeners*

*Defined in /Users/nucx/Developments/core/node_modules/eventemitter3/index.d.ts:17*

Return the listeners registered for a given event.

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `EventTypes` |

**Returns:** `Array`<`ListenerFn`>

___
<a id="off"></a>

###  off

▸ **off**(event: *`EventTypes`*, fn?: *`EventEmitter.ListenerFn`*, context?: *`any`*, once?: *`undefined` \| `false` \| `true`*): `this`

*Inherited from EventEmitter.off*

*Defined in /Users/nucx/Developments/core/node_modules/eventemitter3/index.d.ts:44*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `EventTypes` |
| `Optional` fn | `EventEmitter.ListenerFn` |
| `Optional` context | `any` |
| `Optional` once | `undefined` \| `false` \| `true` |

**Returns:** `this`

___
<a id="on"></a>

###  on

▸ **on**<`T`>(event: *`T`*, callback: *`function`*): `this`

*Overrides EventEmitter.on*

*Defined in [client/streaming-handler.ts:91](https://github.com/lagunehq/core/blob/9f0a933/src/client/streaming-handler.ts#L91)*

Add listener for the event

**Type parameters:**

#### T :  [EventTypes]()
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| event | `T` |  Type of the event. One of \`update\`, \`delete\`, \`notification\`, \`filters\_changed\`, \`conversation\` |
| callback | `function` |  Callback function |

**Returns:** `this`

___
<a id="once"></a>

###  once

▸ **once**(event: *`EventTypes`*, fn: *`ListenerFn`*, context?: *`any`*): `this`

*Inherited from EventEmitter.once*

*Defined in /Users/nucx/Developments/core/node_modules/eventemitter3/index.d.ts:38*

Add a one-time listener for a given event.

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `EventTypes` |
| fn | `ListenerFn` |
| `Optional` context | `any` |

**Returns:** `this`

___
<a id="removealllisteners"></a>

###  removeAllListeners

▸ **removeAllListeners**(event?: *[EventTypes]()*): `this`

*Inherited from EventEmitter.removeAllListeners*

*Defined in /Users/nucx/Developments/core/node_modules/eventemitter3/index.d.ts:49*

Remove all listeners, or those of the specified event.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` event | [EventTypes]() |

**Returns:** `this`

___
<a id="removelistener"></a>

###  removeListener

▸ **removeListener**(event: *`EventTypes`*, fn?: *`EventEmitter.ListenerFn`*, context?: *`any`*, once?: *`undefined` \| `false` \| `true`*): `this`

*Inherited from EventEmitter.removeListener*

*Defined in /Users/nucx/Developments/core/node_modules/eventemitter3/index.d.ts:43*

Remove the listeners of a given event.

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `EventTypes` |
| `Optional` fn | `EventEmitter.ListenerFn` |
| `Optional` context | `any` |
| `Optional` once | `undefined` \| `false` \| `true` |

**Returns:** `this`

___

