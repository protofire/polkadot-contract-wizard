import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import TokenIcon from 'public/assets/token-psp22.png';
import NFTIcon from 'public/assets/nft-psp34.png';
import MultiTokenIcon from 'public/assets/multitoken-psp37.png';

import Image from 'next/image';
import { Typography } from '@mui/material';

interface Props {
  isOutlined?: boolean;
  isBack?: boolean;
}

const HomeButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'white',
  fontSize: '1.4rem',
  borderRadius: '1rem',
  minWidth: '100%',
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  margin: 'auto',
  position: 'relative',
  padding: '2rem',
  border: 'solid 1px transparent',
  backgroundImage:
    'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(180deg, #B214AC, #8C7524)',
  backgroundOrigin: 'border-box',
  backgroundClip: 'content-box, border-box',
  boxShadow: '2px 1000px 1px #0D0E13 inset',

  '&:hover': {
    backgroundImage:
      'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(90deg, #ffffff, #ffb7ff)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
    boxShadow: '2px 1000px 1px #11121a inset',
  },
}));

const StyledBackButton = styled(Button)<ButtonProps>(({ theme }) => ({
  textTransform: 'uppercase',
  color: 'white',
  fontSize: '1.4rem',
  borderRadius: '5rem',
  padding: '8px 16px',
  minWidth: '11rem',
  border: '1px solid',
  borderColor: '#E6007A',
  backgroundColor: 'transparent',

  '&:hover': {
    backgroundColor: '#E6007A',
    border: '1px solid',
  },
}));

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  textTransform: 'uppercase',
  color: '#E6007A',
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
        <HomeButton variant="contained">
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
        <HomeButton variant="contained" size="large">
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
        <HomeButton variant="contained" size="large">
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
