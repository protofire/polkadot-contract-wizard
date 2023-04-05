#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod my_psp34 {
    // imports from openbrush
    use openbrush::traits::String;
    use openbrush::traits::Storage;
    use openbrush::contracts::access_control::only_role;
    use openbrush::contracts::access_control::extensions::enumerable::*;
    use openbrush::contracts::psp34::extensions::burnable::*;
    use openbrush::contracts::psp34::extensions::mintable::*;
    use openbrush::contracts::psp34::extensions::enumerable::*;
    use openbrush::contracts::psp34::extensions::metadata::*;

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Contract {
        #[storage_field]
        psp34: psp34::Data<Balances>,
        	#[storage_field]
        access: access_control::Data<Members>,
        #[storage_field]
        metadata: metadata::Data,
    }

    const MANAGER: RoleType = ink::selector_id!("MANAGER");

    // Section contains default implementation without any modifications
    impl PSP34 for Contract {}
    impl AccessControl for Contract {}
    impl AccessControlEnumerable for Contract {}
    impl PSP34Burnable for Contract {
        #[ink(message)]
        #[openbrush::modifiers(only_role(MANAGER))]
        fn burn(&mut self, account: AccountId, id: Id) -> Result<(), PSP34Error> {
            self._burn_from(account, id)
        }
    }
    impl PSP34Mintable for Contract {
        #[ink(message)]
        #[openbrush::modifiers(only_role(MANAGER))]
        fn mint(&mut self, account: AccountId, id: Id) -> Result<(), PSP34Error> {
            self._mint_to(account, id)
        }
    }
    impl PSP34Enumerable for Contract {}
    impl PSP34Metadata for Contract {}

    impl Contract {
        #[ink(constructor)]
        pub fn new() -> Self {
            let mut _instance = Self::default();
            _instance._init_with_admin(_instance.env().caller());
            _instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");
            _instance._mint_to(_instance.env().caller(), Id::U8(1)).expect("Can mint");
            let collection_id = _instance.collection_id();
            _instance._set_attribute(collection_id.clone(), String::from("name"), String::from("MyPSP34"));
            _instance._set_attribute(collection_id, String::from("symbol"), String::from("MPSP"));
            _instance
        }
    }
}