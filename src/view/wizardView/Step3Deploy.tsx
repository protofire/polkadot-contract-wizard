import { Box, Typography } from "@mui/material";
import { CopyBlock, atomOneDark } from "react-code-blocks";

import { useStepsSCWizard } from '@context'
import BackNextButton from './BackNextButtons'

export default function Step3Deploy() {
  const { handleBack, handleNext } = useStepsSCWizard()

  return (
    <>
      <Typography>Congrats! Now you can deploy your contract!</Typography>
      <Box sx={{ overflowY: 'scroll', height: '30rem', resize: 'both' }}>
        <CopyBlock
          language="rust"
          text={`#![cfg_attr(not(feature = "std"), no_std)]
          #![feature(min_specialization)]
                  
          #[openbrush::contract]
          pub mod my_psp22 {
              
              // imports from openbrush
            use openbrush::contracts::psp22::Transfer;
            use openbrush::traits::String;
            use openbrush::traits::Storage;
            use openbrush::contracts::ownable::*;
            use openbrush::contracts::psp22::extensions::flashmint::*;
          
              #[ink(storage)]
              #[derive(Default, Storage)]
              pub struct Contract {
                #[storage_field]
              psp22: psp22::Data,
              #[storage_field]
              ownable: ownable::Data,
              cap: Balance,
              }
              
              // Section contains default implementation without any modifications
            impl PSP22 for Contract {}
            impl Ownable for Contract {}
            impl FlashLender for Contract {}
          
            impl Transfer for Contract {
              fn _before_token_transfer(
                      &mut self,
                      _from: Option<&AccountId>,
                _to: Option<&AccountId>,
                _amount: &Balance
                  ) -> Result<(), PSP22Error> {
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
                _instance._init_with_owner(_instance.env().caller());
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
          }`}
          codeBlock
          theme={atomOneDark}
          showLineNumbers={true}
        />
      </Box>

      <BackNextButton
        nextLabel="Deploy Contract"
        handleBack={handleBack}
        handleNext={handleNext}
        nextButtonProps={{ startIcon: '🚀' }}
      />
    </>
  )
}
