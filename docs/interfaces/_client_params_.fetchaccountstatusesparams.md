[masto](../README.md) > ["client/params"](../modules/_client_params_.md) > [FetchAccountStatusesParams](../interfaces/_client_params_.fetchaccountstatusesparams.md)

# Interface: FetchAccountStatusesParams

## Hierarchy

 [PaginationParams](_client_params_.paginationparams.md)

**↳ FetchAccountStatusesParams**

## Index

### Properties

* [exclude_replies](_client_params_.fetchaccountstatusesparams.md#exclude_replies)
* [limit](_client_params_.fetchaccountstatusesparams.md#limit)
* [max_id](_client_params_.fetchaccountstatusesparams.md#max_id)
* [min_id](_client_params_.fetchaccountstatusesparams.md#min_id)
* [only_media](_client_params_.fetchaccountstatusesparams.md#only_media)
* [pinned](_client_params_.fetchaccountstatusesparams.md#pinned)
* [since_id](_client_params_.fetchaccountstatusesparams.md#since_id)

---

## Properties

<a id="exclude_replies"></a>

### `<Optional>` exclude_replies

**● exclude_replies**: *`boolean` \| `null`*

*Defined in [client/params.ts:248](https://github.com/lagunehq/core/blob/84abcd4/src/client/params.ts#L248)*

Skip statuses that reply to other statuses

___
<a id="limit"></a>

### `<Optional>` limit

**● limit**: *`number` \| `null`*

*Inherited from [PaginationParams](_client_params_.paginationparams.md).[limit](_client_params_.paginationparams.md#limit)*

*Defined in [client/params.ts:23](https://github.com/lagunehq/core/blob/84abcd4/src/client/params.ts#L23)*

Maximum number of items to get

___
<a id="max_id"></a>

### `<Optional>` max_id

**● max_id**: *`string` \| `null`*

*Inherited from [PaginationParams](_client_params_.paginationparams.md).[max_id](_client_params_.paginationparams.md#max_id)*

*Defined in [client/params.ts:17](https://github.com/lagunehq/core/blob/84abcd4/src/client/params.ts#L17)*

Get a list of items with ID less than this value

___
<a id="min_id"></a>

### `<Optional>` min_id

**● min_id**: *`string` \| `null`*

*Inherited from [PaginationParams](_client_params_.paginationparams.md).[min_id](_client_params_.paginationparams.md#min_id)*

*Defined in [client/params.ts:21](https://github.com/lagunehq/core/blob/84abcd4/src/client/params.ts#L21)*

Get a list of items with ID greater than this value exluding this ID

___
<a id="only_media"></a>

### `<Optional>` only_media

**● only_media**: *`boolean` \| `null`*

*Defined in [client/params.ts:244](https://github.com/lagunehq/core/blob/84abcd4/src/client/params.ts#L244)*

Only return statuses that have media attachments

___
<a id="pinned"></a>

### `<Optional>` pinned

**● pinned**: *`boolean` \| `null`*

*Defined in [client/params.ts:246](https://github.com/lagunehq/core/blob/84abcd4/src/client/params.ts#L246)*

Only return statuses that have been pinned

___
<a id="since_id"></a>

### `<Optional>` since_id

**● since_id**: *`string` \| `null`*

*Inherited from [PaginationParams](_client_params_.paginationparams.md).[since_id](_client_params_.paginationparams.md#since_id)*

*Defined in [client/params.ts:19](https://github.com/lagunehq/core/blob/84abcd4/src/client/params.ts#L19)*

Get a list of items with ID greater than this value including this ID

___

