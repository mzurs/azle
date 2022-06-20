use proc_macro2::Ident;
use quote::{
    format_ident,
    quote
};
use syn::{
    DataStruct,
    Fields,
    Index
};

pub fn derive_azle_into_js_value_struct(
    struct_name: &Ident,
    data_struct: &DataStruct
) -> proc_macro2::TokenStream {
    let variable_definitions = derive_struct_fields_variable_definitions(data_struct);
    let property_definitions = derive_struct_fields_property_definitions(data_struct);

    quote! {
        impl AzleIntoJsValue for #struct_name {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                #(#variable_definitions)*

                let object = boa_engine::object::ObjectInitializer::new(context)
                    #(#property_definitions)*
                    .build();
                
                object.into()
            }
        }

        impl AzleIntoJsValue for Vec<#struct_name> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                // TODO this is extremely unoptimized I think
                // TODO I think I can get rid of the collect here which might help
                // TODO I just need to not pass the context into azle_into_js_value, I don't think it's necessary
                // TODO once we stop relying on into_js_value in boa
                let js_values = self.into_iter().map(|item| item.azle_into_js_value(context)).collect::<Vec<boa_engine::JsValue>>();
                // let js_values = self.into_iter().map(|item| item.azle_into_js_value(context));

                boa_engine::object::JsArray::from_iter(js_values, context).into()
            }
        }
    }
}

fn derive_struct_fields_variable_definitions(data_struct: &DataStruct) -> Vec<proc_macro2::TokenStream> {
    match &data_struct.fields {
        Fields::Named(fields_named) => {
            fields_named.named.iter().map(|field| {
                let field_name = &field.ident;

                quote! {
                    let #field_name = self.#field_name.azle_into_js_value(context);
                }
            }).collect()
        },
        Fields::Unnamed(fields_unnamed) => {
            fields_unnamed.unnamed.iter().enumerate().map(|(index, _)| {
                let field_name = format_ident!("field_{}", index);
                let syn_index = Index::from(index);

                quote! {
                    let #field_name = self.#syn_index.azle_into_js_value(context);
                }
            }).collect()
        },
        _ => panic!("Only named and unnamed fields supported for Structs")
    }
}

fn derive_struct_fields_property_definitions(data_struct: &DataStruct) -> Vec<proc_macro2::TokenStream> {
    match &data_struct.fields {
        Fields::Named(fields_named) => {
            fields_named.named.iter().map(|field| {
                let field_name = &field.ident;

                quote! {
                    .property(
                        stringify!(#field_name),
                        #field_name,
                        boa_engine::property::Attribute::all()
                    )
                }
            }).collect()
        },
        Fields::Unnamed(fields_unnamed) => {
            fields_unnamed.unnamed.iter().enumerate().map(|(index, _)| {
                let field_name = format_ident!("field_{}", index);
                let syn_index = Index::from(index);

                quote! {
                    .property(
                        stringify!(#syn_index),
                        #field_name,
                        boa_engine::property::Attribute::all()
                    )
                }
            }).collect()
        },
        _ => panic!("Only named and unnamed fields supported for Structs")
    }
}