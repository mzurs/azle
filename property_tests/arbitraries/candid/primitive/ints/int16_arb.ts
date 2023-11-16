import { numberToSrcLiteral } from '../../to_src_literal/number';
import { CandidMetaArb } from '../../candid_arb';
import { NumberArb } from './';

export const Int16Arb = CandidMetaArb(
    NumberArb(16),
    'int16',
    numberToSrcLiteral
);