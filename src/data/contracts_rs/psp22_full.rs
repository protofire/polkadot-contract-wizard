#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod my_psp22 {
    // imports from openbrush
    use openbrush::contracts::psp22::Transfer;
    use openbrush::traits::String;
    use openbrush::traits::Storage;
    use openbrush::contracts::access_control::only_role;
    use openbrush::contracts::access_control::extensions::enumerable::*;
    use openbrush::contracts::psp22::extensions::burnable::*;
    use openbrush::contracts::psp22::extensions::mintable::*;
    use openbrush::contracts::pausable::*;
    use openbrush::contracts::psp22::extensions::metadata::*;
    use openbrush::contracts::psp22::extensions::flashmint::*;
    use openbrush::contracts::psp22::extensions::wrapper::*;

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Contract {
        #[storage_field]
        psp22: psp22::Data,
        	#[storage_field]
        access: access_control::Data<Members>,
        #[storage_field]
        pausable: pausable::Data,
        #[storage_field]
        metadata: metadata::Data,
        #[storage_field]
        wrapper: wrapper::Data,
        cap: Balance,
    }

    const MANAGER: RoleType = ink::selector_id!("MANAGER");

    // Section contains default implementation without any modifications
    impl PSP22 for Contract {}
    impl AccessControl for Contract {}
    impl AccessControlEnumerable for Contract {}
    impl PSP22Burnable for Contract {
        #[ink(message)]
        #[openbrush::modifiers(only_role(MANAGER))]
        fn burn(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
            self._burn_from(account, amount)
        }
    }
    impl PSP22Mintable for Contract {
        #[ink(message)]
        #[openbrush::modifiers(only_role(MANAGER))]
        fn mint(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
            self._mint_to(account, amount)
        }
    }
    impl Pausable for Contract {}
    impl PSP22Metadata for Contract {}
    impl FlashLender for Contract {}
    impl PSP22Wrapper for Contract {}

    impl Transfer for Contract {
        #[openbrush::modifiers(when_not_paused)]
        fn _before_token_transfer(&mut self, _from: Option<&AccountId>, _to: Option<&AccountId>, _amount: &Balance) -> Result<(), PSP22Error> {
            if _from.is_none() && (self.total_supply() + _amount) > self.cap() {
                return Err(PSP22Error::Custom(String::from("Cap exceeded")))
            }
            Ok(())
        }
    }

    impl Contract {
        #[ink(constructor)]
        pub fn new(initial_supply: Balance, name: Option<String>, symbol: Option<String>, decimal: u8) -> Self {
            let mut _instance = Self::default();
            _instance._mint_to(_instance.env().caller(), initial_supply).expect("Should mint"); 
            _instance._init_with_admin(_instance.env().caller());
            _instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");
            _instance.metadata.name = name;
            _instance.metadata.symbol = symbol;
            _instance.metadata.decimals = decimal;
            _instance
        }
        
        #[ink(message)]
        #[openbrush::modifiers(only_role(MANAGER))]
        pub fn change_state(&mut self) -> Result<(), PSP22Error> {
            if self.paused() {
                self._unpause()
            } else {
                self._pause()
            }
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