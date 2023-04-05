#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod my_psp37 {
    // imports from openbrush
    use openbrush::contracts::psp37::*;
    use openbrush::traits::Storage;

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Contract {
        #[storage_field]
        psp37: psp37::Data,
    }

    // Section contains default implementation without any modifications
    impl PSP37 for Contract {}

    impl Contract {
        #[ink(constructor)]
        pub fn new() -> Self {
            let mut _instance = Self::default();
            _instance
        }
    }
}