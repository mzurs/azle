import { CandidType, Parent, toIDLType } from '../../index';
import { RequireExactlyOne } from './variant';
import { IDL } from '@dfinity/candid';

/**
 * Represents an optional value: every {@link Opt} is either `Some` and contains
 * a value, or `None` and does not.
 */
export type Opt<T> = RequireExactlyOne<{ Some: T; None: null }>;

/**
 * Wraps the provided value in a `Some` {@link Opt}
 * @param value - the value to be wrapped
 * @returns a `Some` {@link Opt} containing the provided value
 */
export function Some<T>(value: T) {
    return { Some: value };
}

/** An {@link Opt} representing the absence of a value */
export const None = { None: null };

// TODO what happens if we pass something to Opt() that can't be converted to CandidClass?
export function Opt<T>(t: T): AzleOpt<T> {
    // return IDL.Opt(toCandidClass(t));
    return new AzleOpt(t);
}

export class AzleOpt<T> {
    constructor(t: any) {
        this._azleType = t;
    }

    _azleType: CandidType;
    _azleCandidType?: '_azleCandidType';
    _kind: 'AzleOpt' = 'AzleOpt';

    getIDL(parents: Parent[]) {
        return IDL.Opt(toIDLType(this._azleType, parents));
    }
}