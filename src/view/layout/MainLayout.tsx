import React, { ReactNode, useState } from "react"
import Link from "next/link"
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Header from './Header';

type Props = {
    children: ReactNode
}

export const MainLayout = ({ children }: Props): JSX.Element => {
    const theme = useTheme()
    const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
    
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Header open={open} handleDrawerToggle={setOpen} />
            <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}

// <ol >
//     <li>

//     <Link href="/">Home</Link>
//     </li>
//     <li>

//     <Link href="/community">Community</Link>
//     </li>
//     <li>
//     <Link href="/learn">Learn</Link>

//     </li>
// </ol>

// {children}
// 
export default MainLayout