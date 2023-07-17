import { LinkPropsVariantOverrides } from '@mui/material/Link';
import { TypographyPropsVariantOverrides } from '@mui/material';

declare module '@mui/material/Link' {
    interface LinkPropsVariantOverrides {
        whiteText: true;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        whiteText: true;
    }
}
