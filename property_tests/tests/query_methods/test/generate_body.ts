import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';
import { CorrespondingJSType } from '../../../arbitraries/candid/corresponding_js_type';
import { CandidReturnType } from '../../../arbitraries/candid/return_type_arb';
import { CandidValueAndMeta } from '../../../arbitraries/candid/value_and_meta_arb';
import { Named } from 'azle/property_tests';

export function generateBody(
    namedParams: Named<CandidValueAndMeta<CorrespondingJSType>>[],
    returnType: CandidValueAndMeta<CandidReturnType>
): string {
    const paramsAreCorrectlyOrdered = areParamsCorrectlyOrdered(namedParams);

    return `
        ${paramsAreCorrectlyOrdered}

        return ${returnType.src.valueLiteral}
    `;
}
