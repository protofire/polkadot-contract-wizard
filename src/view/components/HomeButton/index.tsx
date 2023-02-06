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

interface Props extends ButtonProps {
    title: string
    subtitle: string
    imgPath: string
    imgProps: { width?: number, height?: number }
}

const WrapperButton = styled(Button)<ButtonProps>(({ theme }) => ({
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

export const HomeButton = (props: Props) => {
    const { title, subtitle, imgProps, imgPath, ...restProps } = props

    return (
        <WrapperButton variant="contained" {...restProps}>
            <Stack spacing={2} direction="row" alignItems="center">
                <Image alt={title} src={imgPath} {...imgProps} />
                <Stack spacing={0} direction="column" alignItems="flex-start">
                    <Typography variant="h3">{title}</Typography>
                    <Typography variant="subtitle1">
                        {subtitle}
                    </Typography>
                </Stack>
            </Stack>
        </WrapperButton>
    )
}
