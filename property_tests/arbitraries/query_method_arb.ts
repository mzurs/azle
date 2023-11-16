import fc from 'fast-check';
import { TestSample } from './test_sample_arb';
import { Test } from '../../test';

type QueryMethod = {
    sourceCode: string;
    test: Test;
    imports: Set<string>;
    candidTypeDeclarations: string[] | undefined;
};

export function QueryMethodArb(testArb: fc.Arbitrary<TestSample>) {
    return testArb.map((testSample): QueryMethod => {
        const {
            paramNames,
            paramCandidTypes,
            returnCandidType,
            body,
            functionName,
            test,
            imports,
            candidTypeDeclarations
        } = testSample;

        return {
            sourceCode: `${functionName}: query([${paramCandidTypes}], ${returnCandidType}, (${paramNames.join(
                ', '
            )}) => {
                    ${body}
                })`,
            test,
            imports,
            candidTypeDeclarations
        };
    });
}