import fc from 'fast-check';
import { Variant } from '.';
import { VariantCandidDefinition } from '../../candid_definition_arb/types';
import { CandidValues, CandidValueArb } from '../../candid_values_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { RecursiveShapes } from '../../recursive';

type Field = [string, CandidValues<CorrespondingJSType>];

export function VariantValuesArb(
    variantDefinition: VariantCandidDefinition,
    recursiveShapes: RecursiveShapes,
    depthLevel: number
): fc.Arbitrary<CandidValues<Variant>> {
    return fc
        .nat(depthLevel < 1 ? 0 : variantDefinition.innerTypes.length - 1)
        .chain((randomIndex) => {
            if (variantDefinition.innerTypes.length === 0) {
                return fc.constant({
                    valueLiteral: '{}',
                    agentArgumentValue: {},
                    agentResponseValue: {}
                });
            }

            const [name, innerType] = variantDefinition.innerTypes[randomIndex];

            const fieldValues = CandidValueArb(
                innerType,
                recursiveShapes,
                depthLevel - 1
            ).map((values): Field => {
                return [name, values];
            });

            return fieldValues.map((fieldValue) => {
                const valueLiteral = generateValueLiteral(fieldValue);
                const agentArgumentValue = generateValue(fieldValue);
                const agentResponseValue = generateValue(fieldValue, true);

                return {
                    valueLiteral,
                    agentArgumentValue,
                    agentResponseValue
                };
            });
        });
}

function generateValue(field: Field, returned: boolean = false): Variant {
    const [fieldName, { agentArgumentValue, agentResponseValue }] = field;

    return {
        [fieldName]: returned ? agentResponseValue : agentArgumentValue
    };
}

function generateValueLiteral(field: Field): string {
    const [fieldName, fieldValue] = field;

    return `{
        ${fieldName}: ${fieldValue.valueLiteral}
    }`;
}
