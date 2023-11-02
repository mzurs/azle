import { IDL } from '@dfinity/candid';
import { encode } from '../../serde/encode';
import { decode } from '../../serde/decode';

export class AzleNull {
    _azleKind: 'AzleNull' = 'AzleNull';
    static _azleKind: 'AzleKind' = 'AzleKind';

    static _azleCandidType?: '_azleCandidType';

    static toBytes(data: number): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): number {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Null;
    }
}

export const Null = AzleNull;
export type Null = null;
