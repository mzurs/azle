import { $inspect_message, $query, $update, ic, int32, Record } from 'azle';
import {
    allowModifyStateGuarded,
    allowAll,
    incrementCounterAndAllowAll,
    allowNone,
    throwString,
    throwCustomError,
    returnInvalidType,
    returnNonGuardResultObject,
    returnNonNullOkValue,
    returnNonStringErrValue
} from './guards';
import { State, state } from './state';

$query;
export function getState(): State {
    return state;
}

// #region Guarded functions are called
$inspect_message({ guard: allowModifyStateGuarded });
export function inspectMessage(): void {
    console.log('inspectMessage called');

    if (ic.method_name() === 'modifyStateGuarded') {
        console.log(`Method ${ic.method_name()} allowed by inspectMessage`);
        ic.accept_message();
    } else {
        console.log(`Method ${ic.method_name()} rejected by inspectMessage`);
    }
}

$query;
export function identifierAnnotation(): boolean {
    console.log('identifierAnnotation called');
    return true;
}

$query();
export function callExpressionWithoutOptionsObject(): boolean {
    console.log('callExpressionWithoutOptionsObject called');
    return true;
}

$query({});
export function callExpressionWithEmptyOptionsObject(): boolean {
    console.log('callExpressionWithEmptyOptionsObject called');
    return true;
}

$query({ guard: allowAll });
export function looselyGuarded(): boolean {
    console.log('looselyGuarded called');
    return true;
}

$query({ "guard": allowAll });
export function looselyGuardedWithGuardOptionKeyAsString(): boolean {
    console.log('looselyGuardedWithGuardOptionKeyAsString called');
    return true;
}

$update({ guard: incrementCounterAndAllowAll });
export function modifyStateGuarded(): boolean {
    console.log('modifyStateGuarded called');
    return true;
}

$update({ guard: incrementCounterAndAllowAll });
export function unallowedMethod(): boolean {
    console.log('modifyStateGuarded called');
    return true;
}
// #endregion Guarded functions are called

// #region Execution halted by guard function
$query({ guard: allowNone });
export function tightlyGuarded(): boolean {
    console.log('tightlyGuarded called');
    return true;
}

$query({ guard: throwString });
export function errorStringGuarded(): boolean {
    console.log('errorStringGuarded called');
    return true;
}

$query({ guard: throwCustomError });
export function customErrorGuarded(): boolean {
    console.log('customErrorGuarded called');
    return true;
}
// #endregion Execution halted by guard functions

// #region Execution halted by runtime error
$query({ guard: returnInvalidType });
export function invalidReturnTypeGuarded(): boolean {
    console.log('invalidReturnTypeGuarded called');
    return true;
}

$query({ guard: returnNonGuardResultObject });
export function badObjectGuarded(): boolean {
    console.log('badObjectGuarded called');
    return true;
}

$query({ guard: returnNonNullOkValue });
export function nonNullOkValueGuarded(): boolean {
    console.log('nonNullOkValueGuarded called');
    return true;
}

$query({ guard: returnNonStringErrValue });
export function nonStringErrValueGuarded(): boolean {
    console.log('nonStringErrValueGuarded called');
    return true;
}
// #endregion Execution halted by runtime error
