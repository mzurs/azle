import { IDL } from '@dfinity/candid';

import {
    CandidClass,
    CandidType,
    toCandidClass,
    toCandidClasses
} from './property_decorators';

export function query(
    paramsIdls: (CandidType | CandidClass)[],
    returnIdl: CandidType | CandidClass
) {
    return (target, key, descriptor) => {
        paramsIdls = toCandidClasses(paramsIdls);
        returnIdl = toCandidClass(returnIdl);
        globalThis._azleCandidMethods.push(
            `${key}: (${paramsIdls
                .map((paramIdl) => paramIdl.display())
                .join(', ')}) -> (${returnIdl.display()}) query;`
        );

        const originalMethod = descriptor.value;

        descriptor.value = function (...args) {
            const decoded = IDL.decode(paramsIdls, args[0]);

            return new Uint8Array(
                IDL.encode([returnIdl], [originalMethod(...decoded)])
            ).buffer;
        };

        return descriptor;
    };
}

export function update(paramsIdls: CandidClass[], returnIdl: CandidClass) {
    return (target, key, descriptor) => {
        globalThis._azleCandidMethods.push(
            `${key}: (${paramsIdls
                .map((paramIdl) => paramIdl.display())
                .join(', ')}) -> (${returnIdl.display()});`
        );

        const originalMethod = descriptor.value;

        descriptor.value = function (...args) {
            const decoded = IDL.decode(paramsIdls, args[0]);

            return new Uint8Array(
                IDL.encode([returnIdl], [originalMethod(...decoded)])
            ).buffer;
        };

        return descriptor;
    };
}
