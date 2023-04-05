#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod my_psp22 {
    // imports from openbrush
    use openbrush::contracts::psp22::Transfer;
    use openbrush::traits::String;
    use openbrush::traits::Storage;
    use openbrush::contracts::access_control::*;
    use openbrush::contracts::psp22::extensions::mintable::*;

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Contract {
        #[storage_field]
        psp22: psp22::Data,
        #[storage_field]
        access: access_control::Data,
        cap: Balance,
    }

    const MANAGER: RoleType = ink::selector_id!("MANAGER");

    // Section contains default implementation without any modifications
    impl PSP22 for Contract {}
    impl AccessControl for Contract {}
    impl PSP22Mintable for Contract {
        #[ink(message)]
        #[openbrush::modifiers(only_role(MANAGER))]
        fn mint(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
            self._mint_to(account, amount)
        }
    }

    impl Transfer for Contract {
        fn _before_token_transfer(&mut self, _from: Option<&AccountId>, _to: Option<&AccountId>, _amount: &Balance) -> Result<(), PSP22Error> {
            if _from.is_none() && (self.total_supply() + _amount) > self.cap() {
                return Err(PSP22Error::Custom(String::from("Cap exceeded")))
            }
            Ok(())
        }
    }

    impl Contract {
        #[ink(constructor)]
        pub fn new(initial_supply: Balance) -> Self {
            let mut _instance = Self::default();
            _instance._mint_to(_instance.env().caller(), initial_supply).expect("Should mint"); 
            _instance._init_with_admin(_instance.env().caller());
            _instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");
            _instance
        }
        
        #[ink(message)]
        pub fn cap(&self) -> Balance {
            self.cap
        }
        fn _init_cap(&mut self, cap: Balance) -> Result<(), PSP22Error> {
            if cap <= 0 {
                return Err(PSP22Error::Custom(String::from("Cap must be above 0")))
            }
            self.cap = cap;
            Ok(())
        }
    }
}