export * from './reference';
import { IDL } from '@dfinity/candid';
import {
    AzleBlob,
    blob,
    AzleVec,
    AzleOpt,
    AzleInt8,
    int8,
    AzleNat64,
    AzleNat32,
    AzleFloat64,
    float64,
    Principal
} from '../../lib_new';

export type TypeMapping<T> = T extends IDL.TextClass
    ? string
    : T extends IDL.BoolClass
    ? boolean
    : T extends AzleNat64
    ? bigint
    : T extends never[]
    ? void
    : T extends AzleVec<infer U>
    ? TypeMapping<U>[]
    : T extends AzleOpt<infer U>
    ? [TypeMapping<U>] | []
    : T extends AzleNat32
    ? number
    : T extends AzleBlob
    ? blob
    : T extends AzleInt8
    ? int8
    : T extends AzleFloat64
    ? float64
    : T extends IDL.PrincipalClass
    ? Principal
    : T;
