import { ThemeOptions } from '@mui/material';

export const customTheme: ThemeOptions = {
    typography: {
        fontFamily: 'Roboto'
    },
    components: {
        MuiLink: {
            variants: [
                {
                    props: { variant: 'whiteText' },
                    style: {
                        color: 'white',
                        textDecorationColor: 'white'
                    }
                }
            ]
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: 'rgba(97, 97, 97, 1)'
                }
            }
        }
    },
    palette: {
        primary: {
            main: '#3747AC',
            dark: '#0B1FA2',
            light: '#5261C6'
        }
    }
};
