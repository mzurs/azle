export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'blob_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'blob_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'boolean_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'boolean_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'float32_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'float32_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'float64_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'float64_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'int16_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'int16_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'int32_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'int32_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'int64_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'int64_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'int8_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'int8_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'int_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'int_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'nat16_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'nat16_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'nat32_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'nat32_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'nat64_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'nat64_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'nat8_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'nat8_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'nat_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'nat_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'null_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'null_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'opt_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'opt_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'principal_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'principal_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'record_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'record_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'text_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'text_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'variant_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'variant_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'vec_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'vec_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
  });
};
export const init = ({ IDL }) => { return []; };
