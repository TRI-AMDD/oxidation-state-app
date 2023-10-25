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
                    backgroundColor: '#f5f5f9',
                    color: 'rgba(0, 0, 0, 0.87)',
                    border: '1px solid #dadde9'
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
