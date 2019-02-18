

# Hierarchy

 [Pagination](_client_parameters_.pagination.md)

**↳ FetchNotifications**

# Properties

<a id="exclude_types"></a>

## `<Optional>` exclude_types

**● exclude_types**: * [NotificationType](../modules/_entities_notification_.md#notificationtype)[] &#124; `null`
*

*Defined in [client/parameters.ts:76](https://github.com/lagunehq/core/blob/daa242c/src/client/parameters.ts#L76)*

Array of notifications to exclude (Allowed values: "follow", "favourite", "reblog", "mention")

___
<a id="limit"></a>

## `<Optional>` limit

**● limit**: * `number` &#124; `null`
*

*Inherited from [Pagination](_client_parameters_.pagination.md).[limit](_client_parameters_.pagination.md#limit)*

*Defined in [client/parameters.ts:18](https://github.com/lagunehq/core/blob/daa242c/src/client/parameters.ts#L18)*

Maximum number of items to get

___
<a id="max_id"></a>

## `<Optional>` max_id

**● max_id**: * `string` &#124; `null`
*

*Inherited from [Pagination](_client_parameters_.pagination.md).[max_id](_client_parameters_.pagination.md#max_id)*

*Defined in [client/parameters.ts:9](https://github.com/lagunehq/core/blob/daa242c/src/client/parameters.ts#L9)*

Get a list of items with ID less than this value

___
<a id="min_id"></a>

## `<Optional>` min_id

**● min_id**: * `string` &#124; `null`
*

*Inherited from [Pagination](_client_parameters_.pagination.md).[min_id](_client_parameters_.pagination.md#min_id)*

*Defined in [client/parameters.ts:15](https://github.com/lagunehq/core/blob/daa242c/src/client/parameters.ts#L15)*

Get a list of items with ID greater than this value exluding this ID

___
<a id="since_id"></a>

## `<Optional>` since_id

**● since_id**: * `string` &#124; `null`
*

*Inherited from [Pagination](_client_parameters_.pagination.md).[since_id](_client_parameters_.pagination.md#since_id)*

*Defined in [client/parameters.ts:12](https://github.com/lagunehq/core/blob/daa242c/src/client/parameters.ts#L12)*

Get a list of items with ID greater than this value including this ID

___

