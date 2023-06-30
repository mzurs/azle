pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn msg_cycles_accept128(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let max_amount: u128 = aargs
                .get(0)
                .ok_or_else(|| {
                    boa_engine::error::JsNativeError::error()
                        .with_message("An argument for 'maxAmount' was not provided")
                })?
                .clone()
                .try_from_vm_value(&mut *context)
                .map_err(|vmc_err| vmc_err.to_js_error())?;

            let return_value =
                boa_engine::bigint::JsBigInt::new(boa_engine::bigint::RawBigInt::from(
                    ic_cdk::api::call::msg_cycles_accept128(max_amount),
                ));

            Ok(return_value.into())
        }
    }
}
