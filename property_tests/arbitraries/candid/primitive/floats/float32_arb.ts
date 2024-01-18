import fc, { sample } from 'fast-check';
import { floatToSrcLiteral } from '../../to_src_literal/float';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import {
    FloatCandidDefinition,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { CandidValues } from '../../candid_values_arb';

export function Float32Arb(): fc.Arbitrary<CandidValueAndMeta<number>> {
    return CandidValueAndMetaArbGenerator(
        Float32DefinitionArb(),
        Float32ValueArb
    );
}

export function Float32DefinitionArb(): WithShapesArb<FloatCandidDefinition> {
    return SimpleCandidDefinitionArb('float32');
}

// TODO multiplying by zero is to remove -0
// TODO we should open an issue with agent-js
// TODO the agent should encode and decode -0 correctly
export function Float32ValueArb(): fc.Arbitrary<CandidValues<number>> {
    return SimpleCandidValuesArb(float32(), floatToSrcLiteral);
}

function float32(): fc.Arbitrary<number> {
    return fc
        .float32Array({ maxLength: 1, minLength: 1 })
        .map((sample) => (sample[0] === 0 ? sample[0] * 0 : sample[0]));
}
