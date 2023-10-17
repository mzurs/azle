import { IDL } from '@dfinity/candid';

import { AzleVec, AzleOpt, AzleTuple } from '../types/constructed';
import { DecodeVisitor } from './visitors/decode_visitor';
import { EncodeVisitor } from './visitors/encode_visitor';
import { CandidType, Parent, toIDLType } from '../../candid';

/**
 * Encodes the provided value as candid blob of the designated type.
 *
 * Intended to be a rich replacement for `IDL.encode` from `@dfinity/candid`,
 * adding support for complex Azle IDL wrappers such as {@link AzleOpt},
 * {@link AzleVec}, and {@link AzleTuple}. It recursively visits all "inner"
 * values, converting any Azle values to official IDL values.
 *
 * @param data the value to encode
 * @param candidType either a built-in IDL data type, or an Azle-defined super-type
 * @returns candid bytes
 */
export function encode(
    candidType: CandidType | CandidType[],
    data: any | any[]
): Uint8Array {
    if (Array.isArray(candidType)) {
        if (Array.isArray(data)) {
            return encodeMultiple(candidType, data);
        }
        throw new Error(
            'If multiple candid types are given then multiple data entries are expected.'
        );
    }
    return encodeSingle(candidType, data);
}

/**
 * Decodes the provided buffer into the designated JS value.
 *
 * Intended to be a rich replacement for `IDL.decode` from `@dfinity/candid`
 * adding support for complex Azle IDL wrappers such as {@link AzleOpt},
 * {@link AzleVec}, and {@link AzleTuple}. It recursively visits all "inner"
 * values, converting them from their native shape to the shape that Azle expects.
 *
 * @param data the value to decode
 * @param candidType either a built-in IDL data type, or an Azle-defined super-type
 * @returns the Azle representation of the data
 */
export function decode(
    candidType: CandidType | CandidType[],
    data: ArrayBuffer
): any | any[] {
    if (Array.isArray(candidType)) {
        return decodeMultiple(candidType, data);
    }
    return decodeSingle(candidType, data);
}

function encodeSingle(candidType: CandidType, data: any): Uint8Array {
    const idl = toIDLType(candidType);

    const idlIsAzleVoid = Array.isArray(idl);

    if (idlIsAzleVoid) {
        return new Uint8Array(IDL.encode([], []));
    }

    const encodeReadyKey = idl.accept(new EncodeVisitor(), {
        candidType: candidType,
        js_data: data
    });

    return new Uint8Array(IDL.encode([idl], [encodeReadyKey]));
}

function decodeSingle(candidType: CandidType, data: ArrayBuffer): any {
    // TODO: there is a discrepancy between CandidType and CandidClass that
    // needs to be aligned so that this isn't an error. Both are representing
    // candid IDLs, either from the @dfinity/candid library or the
    // Azle-augmented ones
    const idl = toIDLType(candidType);

    const idlIsAzleVoid = Array.isArray(idl);

    if (idlIsAzleVoid) {
        return undefined;
    }

    const candidDecodedValue = IDL.decode([idl], data)[0] as any;

    return idl.accept(new DecodeVisitor(), {
        candidType: candidType,
        js_data: candidDecodedValue
    });
}

function encodeMultiple(candidTypes: CandidType[], data: any[]): Uint8Array {
    const { values, idls } = data.reduce<{
        values: any[];
        idls: IDL.Type<any>[];
    }>(
        (acc, datum, index) => {
            const candidType = candidTypes[index];
            const idl = toIDLType(candidType);

            const encodeReadyValue = idl.accept(new EncodeVisitor(), {
                candidType: candidType,
                js_data: datum
            });

            return {
                values: [...acc.values, encodeReadyValue],
                idls: [...acc.idls, idl]
            };
        },
        { values: [], idls: [] }
    );

    return new Uint8Array(IDL.encode(idls, values));
}

function decodeMultiple(candidTypes: CandidType[], data: ArrayBuffer): any[] {
    const idls = candidTypes.map((candidType) => toIDLType(candidType));
    const decoded = IDL.decode(idls, data);
    return idls.map((idl, index) =>
        idl.accept(new DecodeVisitor(), {
            candidType: candidTypes[index],
            js_data: decoded[index]
        })
    );
}
