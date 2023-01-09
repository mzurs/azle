import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface BlogPost {
    title: string;
}
export type InsertError =
    | { ValueTooLarge: KeyTooLarge }
    | { KeyTooLarge: KeyTooLarge };
export interface KeyTooLarge {
    max: number;
    given: number;
}
export type Reaction = { Sad: null } | { Happy: null };
export type StableMap0InsertResult =
    | { ok: [] | [string] }
    | { err: InsertError };
export type StableMap10InsertResult =
    | { ok: [] | [[] | [boolean]] }
    | { err: InsertError };
export type StableMap11InsertResult =
    | { ok: [] | [User] }
    | { err: InsertError };
export type StableMap12InsertResult =
    | { ok: [] | [Reaction] }
    | { err: InsertError };
export type StableMap13InsertResult =
    | { ok: [] | [Principal] }
    | { err: InsertError };
export type StableMap1InsertResult =
    | { ok: [] | [Uint8Array] }
    | { err: InsertError };
export type StableMap2InsertResult =
    | { ok: [] | [bigint] }
    | { err: InsertError };
export type StableMap3InsertResult =
    | { ok: [] | [bigint] }
    | { err: InsertError };
export type StableMap4InsertResult =
    | { ok: [] | [number] }
    | { err: InsertError };
export type StableMap5InsertResult =
    | { ok: [] | [number] }
    | { err: InsertError };
export type StableMap6InsertResult =
    | { ok: [] | [boolean] }
    | { err: InsertError };
export type StableMap7InsertResult = { ok: [] | [null] } | { err: InsertError };
export type StableMap9InsertResult =
    | { ok: [] | [Array<string>] }
    | { err: InsertError };
export interface User {
    username: string;
    blog_posts: Array<BlogPost>;
}
export interface _SERVICE {
    stable_map_0_contains_key: ActorMethod<[number], boolean>;
    stable_map_0_get: ActorMethod<[number], [] | [string]>;
    stable_map_0_insert: ActorMethod<[number, string], StableMap0InsertResult>;
    stable_map_0_is_empty: ActorMethod<[], boolean>;
    stable_map_0_len: ActorMethod<[], bigint>;
    stable_map_0_remove: ActorMethod<[number], [] | [string]>;
    stable_map_10_contains_key: ActorMethod<[number], boolean>;
    stable_map_10_get: ActorMethod<[number], [] | [[] | [boolean]]>;
    stable_map_10_insert: ActorMethod<
        [number, [] | [boolean]],
        StableMap10InsertResult
    >;
    stable_map_10_is_empty: ActorMethod<[], boolean>;
    stable_map_10_len: ActorMethod<[], bigint>;
    stable_map_10_remove: ActorMethod<[number], [] | [[] | [boolean]]>;
    stable_map_11_contains_key: ActorMethod<[bigint], boolean>;
    stable_map_11_get: ActorMethod<[bigint], [] | [User]>;
    stable_map_11_insert: ActorMethod<[bigint, User], StableMap11InsertResult>;
    stable_map_11_is_empty: ActorMethod<[], boolean>;
    stable_map_11_len: ActorMethod<[], bigint>;
    stable_map_11_remove: ActorMethod<[bigint], [] | [User]>;
    stable_map_12_contains_key: ActorMethod<[Uint8Array], boolean>;
    stable_map_12_get: ActorMethod<[Uint8Array], [] | [Reaction]>;
    stable_map_12_insert: ActorMethod<
        [Uint8Array, Reaction],
        StableMap12InsertResult
    >;
    stable_map_12_is_empty: ActorMethod<[], boolean>;
    stable_map_12_len: ActorMethod<[], bigint>;
    stable_map_12_remove: ActorMethod<[Uint8Array], [] | [Reaction]>;
    stable_map_13_contains_key: ActorMethod<[string], boolean>;
    stable_map_13_get: ActorMethod<[string], [] | [Principal]>;
    stable_map_13_insert: ActorMethod<
        [string, Principal],
        StableMap13InsertResult
    >;
    stable_map_13_is_empty: ActorMethod<[], boolean>;
    stable_map_13_len: ActorMethod<[], bigint>;
    stable_map_13_remove: ActorMethod<[string], [] | [Principal]>;
    stable_map_1_contains_key: ActorMethod<[number], boolean>;
    stable_map_1_get: ActorMethod<[number], [] | [Uint8Array]>;
    stable_map_1_insert: ActorMethod<
        [number, Uint8Array],
        StableMap1InsertResult
    >;
    stable_map_1_is_empty: ActorMethod<[], boolean>;
    stable_map_1_len: ActorMethod<[], bigint>;
    stable_map_1_remove: ActorMethod<[number], [] | [Uint8Array]>;
    stable_map_2_contains_key: ActorMethod<[number], boolean>;
    stable_map_2_get: ActorMethod<[number], [] | [bigint]>;
    stable_map_2_insert: ActorMethod<[number, bigint], StableMap2InsertResult>;
    stable_map_2_is_empty: ActorMethod<[], boolean>;
    stable_map_2_len: ActorMethod<[], bigint>;
    stable_map_2_remove: ActorMethod<[number], [] | [bigint]>;
    stable_map_3_contains_key: ActorMethod<[Reaction], boolean>;
    stable_map_3_get: ActorMethod<[Reaction], [] | [bigint]>;
    stable_map_3_insert: ActorMethod<
        [Reaction, bigint],
        StableMap3InsertResult
    >;
    stable_map_3_is_empty: ActorMethod<[], boolean>;
    stable_map_3_len: ActorMethod<[], bigint>;
    stable_map_3_remove: ActorMethod<[Reaction], [] | [bigint]>;
    stable_map_4_contains_key: ActorMethod<[User], boolean>;
    stable_map_4_get: ActorMethod<[User], [] | [number]>;
    stable_map_4_insert: ActorMethod<[User, number], StableMap4InsertResult>;
    stable_map_4_is_empty: ActorMethod<[], boolean>;
    stable_map_4_len: ActorMethod<[], bigint>;
    stable_map_4_remove: ActorMethod<[User], [] | [number]>;
    stable_map_5_contains_key: ActorMethod<[[] | [string]], boolean>;
    stable_map_5_get: ActorMethod<[[] | [string]], [] | [number]>;
    stable_map_5_insert: ActorMethod<
        [[] | [string], number],
        StableMap5InsertResult
    >;
    stable_map_5_is_empty: ActorMethod<[], boolean>;
    stable_map_5_len: ActorMethod<[], bigint>;
    stable_map_5_remove: ActorMethod<[[] | [string]], [] | [number]>;
    stable_map_6_contains_key: ActorMethod<[BigUint64Array], boolean>;
    stable_map_6_get: ActorMethod<[BigUint64Array], [] | [boolean]>;
    stable_map_6_insert: ActorMethod<
        [BigUint64Array, boolean],
        StableMap6InsertResult
    >;
    stable_map_6_is_empty: ActorMethod<[], boolean>;
    stable_map_6_len: ActorMethod<[], bigint>;
    stable_map_6_remove: ActorMethod<[BigUint64Array], [] | [boolean]>;
    stable_map_7_contains_key: ActorMethod<[null], boolean>;
    stable_map_7_get: ActorMethod<[null], [] | [null]>;
    stable_map_7_insert: ActorMethod<[null, null], StableMap7InsertResult>;
    stable_map_7_is_empty: ActorMethod<[], boolean>;
    stable_map_7_len: ActorMethod<[], bigint>;
    stable_map_7_remove: ActorMethod<[null], [] | [null]>;
    stable_map_8_contains_key: ActorMethod<[boolean], boolean>;
    stable_map_8_get: ActorMethod<[boolean], [] | [null]>;
    stable_map_8_insert: ActorMethod<[boolean, null], StableMap7InsertResult>;
    stable_map_8_is_empty: ActorMethod<[], boolean>;
    stable_map_8_len: ActorMethod<[], bigint>;
    stable_map_8_remove: ActorMethod<[boolean], [] | [null]>;
    stable_map_9_contains_key: ActorMethod<[number], boolean>;
    stable_map_9_get: ActorMethod<[number], [] | [Array<string>]>;
    stable_map_9_insert: ActorMethod<
        [number, Array<string>],
        StableMap9InsertResult
    >;
    stable_map_9_is_empty: ActorMethod<[], boolean>;
    stable_map_9_len: ActorMethod<[], bigint>;
    stable_map_9_remove: ActorMethod<[number], [] | [Array<string>]>;
}
