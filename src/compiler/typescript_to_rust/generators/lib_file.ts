import { generateAzleIntoJsValueTrait } from './azle_into_js_value_trait';
import { generateAzleTryFromJsValueTrait } from './azle_try_from_js_value_trait';
import { generateCallFunctions } from './call_functions';
import { generateSystemCanisterMethods } from './canister_methods';
import { generateCanisterMethodsDeveloperDefined } from './canister_methods/developer_defined';
import { generateHandleGeneratorResultFunction } from './canister_methods/developer_defined/return_value_handler';
import { generateHead } from './head';
import { generateIcObjectFunctions } from './ic_object/functions';
import { modifyRustCandidTypes } from './modified_rust_candid_types';
import { bundle_and_transpile_ts } from '../../typescript_to_javascript';
import { CallFunctionInfo, JavaScript, Rust } from '../../../types';
import * as tsc from 'typescript';

export async function generateLibFile(
    js: JavaScript,
    rustCandidTypes: Rust,
    queryMethodFunctionNames: string[],
    updateMethodFunctionNames: string[],
    sourceFiles: readonly tsc.SourceFile[]
): Promise<Rust> {
    // TODO Remove this once these issues are resolved: https://forum.dfinity.org/t/deserialize-to-candid-nat/8192/16, https://github.com/dfinity/candid/issues/331
    // TODO we also might want to just use candid::Nat, candid::Int, candid::Principal and just do the work of implementing the traits locally
    const rustCandidTypesNatAndIntReplaced: Rust = rustCandidTypes.replace(/candid::Nat/g, 'u128').replace(/candid::Int/g, 'i128');
    
    // TODO remove this once this issue is resolved: https://github.com/dfinity/candid/issues/345
    const rust_candid_types_semicolon_syntax_fix = rustCandidTypesNatAndIntReplaced.replace(/#\[derive\(CandidType, Deserialize\)\]\nstruct .*? \(.*?\)/g, match => `${match};`);

    const modifiedRustCandidTypes: Rust = await modifyRustCandidTypes(rust_candid_types_semicolon_syntax_fix);

    const principal_js: JavaScript = bundle_and_transpile_ts(`export { Principal } from '@dfinity/principal';`);
    const head: Rust = generateHead(
        js,
        principal_js
    );

    const systemCanisterMethods: Rust =
        generateSystemCanisterMethods(sourceFiles);

    const callFunctionInfos: CallFunctionInfo[] = generateCallFunctions(sourceFiles);

    const canisterMethodsDeveloperDefined: Rust = await generateCanisterMethodsDeveloperDefined(
        rust_candid_types_semicolon_syntax_fix, // TODO you might think that we should pass in modifiedRustCandidTypes here, but the printAst function seems to have a bug that removes the , from the CallResult tuple which causes problems later in the process
        queryMethodFunctionNames,
        updateMethodFunctionNames
    );

    const handleGeneratorResultFunction = generateHandleGeneratorResultFunction(callFunctionInfos);

    const icObjectFunctions: Rust = generateIcObjectFunctions();

    const azleIntoJsValueTrait: Rust = generateAzleIntoJsValueTrait();
    const azleTryFromJsValueTrait: Rust = generateAzleTryFromJsValueTrait();

    return `
        ${head}

        ${modifiedRustCandidTypes}

        ${azleIntoJsValueTrait}
        ${azleTryFromJsValueTrait}

        ${systemCanisterMethods}

        ${canisterMethodsDeveloperDefined}

        ${handleGeneratorResultFunction}

        ${icObjectFunctions}

        ${callFunctionInfos.map((callFunctionInfo) => callFunctionInfo.text).join('\n')}
    `;
}
