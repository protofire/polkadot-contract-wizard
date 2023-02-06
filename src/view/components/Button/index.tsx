import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const StyledBackButton = styled(Button)<ButtonProps>(({ theme, }) => ({
  textTransform: 'uppercase',
  color: 'white',
  fontSize: '1.4rem',
  borderRadius: '5rem',
  padding: '8px 16px',
  minWidth: '11rem',
  border: '1px solid',
  borderColor: theme.palette.primary.main,
  backgroundColor: 'transparent',

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    border: '1px solid',
  },
}));

const StyledButton = styled(Button)<ButtonProps>(({ theme, }) => ({
  textTransform: 'uppercase',
  color: theme.palette.primary.main,
  fontSize: '1.4rem',
  borderRadius: '5rem',
  padding: '8px 16px',
  minWidth: '11rem',
  border: '1px solid',
  backgroundColor: '#e6007b2f',

  '&:hover': {
    backgroundColor: '#e6007b83',
    color: 'white',
    border: '1px solid #c00569 ',
  },
}));

export default function CustomizedButtons() {
  return (
    <>
      <Stack spacing={4} direction="column" m={8}>
        <HomeButton variant="contained" onClick={() => {
    alert('clicked');
  }}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Image alt="TOKEN | PSP22" src={TokenIcon} width={75} />
            <Stack spacing={0} direction="column" alignItems="flex-start">
              <Typography variant="h3">TOKEN | PSP22</Typography>
              <Typography variant="subtitle1">
                Standard smart contract for a fungible token
              </Typography>
            </Stack>
          </Stack>
        </HomeButton>
        <HomeButton variant="contained">
          <Stack spacing={2} direction="row" alignItems="center">
            <Image alt="NFT | PSP34" src={NFTIcon} height={65} />
            <Stack spacing={0} direction="column" alignItems="flex-start">
              <Typography variant="h3">NFT | PSP34</Typography>
              <Typography variant="subtitle1">
                Standard smart contract for a non-fungible token
              </Typography>
            </Stack>
          </Stack>
        </HomeButton>
        <HomeButton variant="contained">
          <Stack spacing={2} direction="row" alignItems="center">
            <Image alt="MULTITOKEN | PSP37" src={MultiTokenIcon} width={75} />
            <Stack spacing={0} direction="column" alignItems="flex-start">
              <Typography variant="h3">MULTITOKEN | PSP37</Typography>
              <Typography variant="subtitle1">
                Standard smart contract for a Multi Token
              </Typography>
            </Stack>
          </Stack>
        </HomeButton>
      </Stack>
      <Stack spacing={4} direction="row" flexWrap="wrap" gap={2}>
        <StyledBackButton variant="outlined" size="large">
          <ArrowBackRoundedIcon fontSize="medium" /> Back
        </StyledBackButton>
        <StyledButton variant="contained" size="large" disabled>
          Next
        </StyledButton>
        <StyledButton variant="contained" size="large">
          Next
        </StyledButton>
        <StyledButton variant="contained" size="large">
          🚀 Deploy your contract
        </StyledButton>
      </Stack>
    </>
  );
}
