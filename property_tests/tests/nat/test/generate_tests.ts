import { deepEqual } from 'fast-equals';

import { getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/value_and_meta_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamNats: Named<CandidValueAndMeta<bigint>>[],
    returnNat: CandidValueAndMeta<bigint>
): Test[] {
    const expectedResult = namedParamNats.reduce(
        (acc, param) => acc + param.el.agentResponseValue,
        returnNat.agentResponseValue
    );
    const paramValues = namedParamNats.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        {
            name: `nat ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/nat/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
