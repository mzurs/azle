use proc_macro2::TokenStream;
use quote::quote;

pub fn generate_error_handler() -> TokenStream {
    quote! {
        pub fn handle_boa_result(
            boa_result: boa_engine::JsResult<boa_engine::JsValue>,
            context: &mut boa_engine::Context
        ) -> boa_engine::JsValue {
            match boa_result {
                Ok(_azle_boa_return_value) => _azle_boa_return_value,
                Err(_azle_boa_error) => {
                    let error_message = handler_boa_error(_azle_boa_error.to_opaque(context), context);
                    panic!("AZLE RUNTIME ERROR: {}", error_message);
                },
            }
        }

        fn handler_boa_error(error_value: boa_engine::JsValue, context: &mut boa_engine::Context) -> String{
            match &error_value {
                boa_engine::JsValue::BigInt(bigint) => bigint.to_string(),
                boa_engine::JsValue::Boolean(boolean) => boolean.to_string(),
                boa_engine::JsValue::Integer(integer) => integer.to_string(),
                boa_engine::JsValue::Null => "null".to_string(),
                boa_engine::JsValue::Object(object) => {
                    let to_string_js_value = object.get("toString", context).unwrap();
                    let to_string_js_object = to_string_js_value.as_object().unwrap();
                    let to_string_result = to_string_js_object.call(&error_value, &[], context);
                    to_string_result.unwrap().try_from_vm_value(context).unwrap()
                },
                boa_engine::JsValue::Rational(rational) => rational.to_string(),
                boa_engine::JsValue::String(string) => {
                    string.to_std_string().unwrap()
                },
                boa_engine::JsValue::Symbol(symbol) => symbol.to_string(),
                boa_engine::JsValue::Undefined => "undefined".to_string(),
            }
        }
    }
}
