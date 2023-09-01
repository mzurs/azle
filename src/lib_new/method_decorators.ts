import { ic } from './ic';
import { IDL } from './index';

import {
    CandidClass,
    ReturnCandidClass,
    toParamCandidClasses,
    toReturnCandidClass,
    CandidTypesDefs,
    CandidDef,
    extractCandid
} from './utils';
import { display } from './utils';
import { serviceDecorator } from './service';

type Mode = 'query' | 'update';

const modeToCandid = {
    query: ' query',
    update: ''
};

// Until we can figure how how to type check Funcs, Variants, and Records we are just going to have to use any here
// export function query(paramsIdls: CandidClass[], returnIdl: ReturnCandidClass) {
export function query(paramsIdls: any[], returnIdl: any): any {
    return (target: any, key: string, descriptor?: PropertyDescriptor) => {
        if (descriptor === undefined) {
            serviceDecorator(target, key, paramsIdls, returnIdl);
        } else {
            return setupCanisterMethod(
                paramsIdls,
                returnIdl,
                'query',
                key,
                descriptor
            );
        }
    };
}

// export function update(
//     paramsIdls: CandidClass[],
//     returnIdl: ReturnCandidClass
export function update(paramsIdls: any[], returnIdl: any): any {
    return (target: any, key: string, descriptor?: PropertyDescriptor) => {
        if (descriptor === undefined) {
            serviceDecorator(target, key, paramsIdls, returnIdl);
        } else {
            return setupCanisterMethod(
                paramsIdls,
                returnIdl,
                'update',
                key,
                descriptor
            );
        }
    };
}

function newTypesToStingArr(newTypes: CandidTypesDefs): string[] {
    return Object.entries(newTypes).map(
        ([name, candid]) => `type ${name} = ${candid}`
    );
}

function handleRecursiveParams(
    idls: CandidClass[]
): [CandidClass[], CandidDef[], CandidTypesDefs] {
    const paramIdls = toParamCandidClasses(idls);
    const paramInfo = paramIdls.map((paramIdl) => display(paramIdl, {}));
    return [paramIdls, ...extractCandid(paramInfo, {})];
}

function handleRecursiveReturn(
    returnIdl: ReturnCandidClass,
    paramCandidTypeDefs: CandidTypesDefs
): [CandidClass[], CandidDef[], CandidTypesDefs] {
    const returnIdls = toReturnCandidClass(returnIdl);
    const returnInfo = returnIdls.map((returnIdl) => display(returnIdl, {}));
    return [returnIdls, ...extractCandid(returnInfo, paramCandidTypeDefs)];
}

function setupCanisterMethod(
    paramsIdls: CandidClass[],
    returnIdl: ReturnCandidClass,
    mode: Mode,
    key: string,
    descriptor: PropertyDescriptor
) {
    const paramCandid = handleRecursiveParams(paramsIdls);
    const returnCandid = handleRecursiveReturn(returnIdl, paramCandid[2]);

    globalThis._azleCandidTypes = newTypesToStingArr(returnCandid[2]);
    globalThis._azleCandidMethods.push(
        `${key}: (${paramCandid[1].join(', ')}) -> (${returnCandid[1]})${
            modeToCandid[mode]
        };`
    );

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const decoded = IDL.decode(paramCandid[0], args[0]);

        const result = originalMethod(...decoded);

        if (
            result !== undefined &&
            result !== null &&
            typeof result.then === 'function'
        ) {
            result
                .then((result) => {
                    const encodeReadyResult =
                        result === undefined ? [] : [result];

                    const encoded = IDL.encode(
                        returnCandid[0],
                        encodeReadyResult
                    );

                    console.log(
                        `final instructions: ${ic.instructionCounter()}`
                    );

                    ic.replyRaw(new Uint8Array(encoded));
                })
                .catch((error) => {
                    ic.trap(error.toString());
                });
        } else {
            const encodeReadyResult = result === undefined ? [] : [result];

            const encoded = IDL.encode(returnCandid[0], encodeReadyResult);

            console.log(`final instructions: ${ic.instructionCounter()}`);

            ic.replyRaw(new Uint8Array(encoded));
        }
    };

    return descriptor;
}
