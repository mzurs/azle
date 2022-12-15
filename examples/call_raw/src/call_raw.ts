import {
    blob,
    CanisterResult,
    ic,
    nat,
    nat64,
    ok,
    Principal,
    Update,
    Variant
} from 'azle';

type ExecuteCallRawResult = Variant<{
    ok: string;
    err: string;
}>;

export async function execute_call_raw(
    canister_id: Principal,
    method: string,
    candid_args: string,
    payment: nat64
): Update<Promise<ExecuteCallRawResult>> {
    const canister_result = await ic.call_raw(
        canister_id,
        method,
        ic.candid_encode(candid_args),
        payment
    );

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: ic.candid_decode(canister_result.ok)
    };
}

type ExecuteCallRaw128Result = Variant<{
    ok: string;
    err: string;
}>;

export async function execute_call_raw128(
    canister_id: Principal,
    method: string,
    candid_args: string,
    payment: nat
): Update<Promise<ExecuteCallRaw128Result>> {
    const canister_result = await ic.call_raw128(
        canister_id,
        method,
        ic.candid_encode(candid_args),
        payment
    );

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: ic.candid_decode(canister_result.ok)
    };
}
