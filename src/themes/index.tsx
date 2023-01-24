import { ReactNode, useMemo } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// project import
import Palette from './palette';
import Typography from './typography';
import CustomShadows from './shadows';
import { Settings } from 'src/themes/types';
// import componentsOverride from './overrides';

// ==============================|| DEFAULT THEME - MAIN  ||============================== //


export default function ThemeCustomization({ children, settings }: { children: ReactNode, settings: Settings}) {
    const { mode, skin } = settings
    const theme = Palette({ mode, skin });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const themeTypography = Typography(['Public Sans', 'sans-serif'].join(','));
    const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

    const themeOptions = useMemo(
        () => ({
            breakpoints: {
                values: {
                    xs: 0,
                    sm: 768,
                    md: 1024,
                    lg: 1266,
                    xl: 1536
                }
            },
            Direction: 'ltr',
            mixins: {
                toolbar: {
                    minHeight: 60,
                    paddingTop: 8,
                    paddingBottom: 8
                }
            },
            customShadows: themeCustomShadows,
            typography: themeTypography
        }),
        [themeTypography, themeCustomShadows]
    );

    const themes = createTheme(themeOptions);
    // themes.components = componentsOverride(themes);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}


