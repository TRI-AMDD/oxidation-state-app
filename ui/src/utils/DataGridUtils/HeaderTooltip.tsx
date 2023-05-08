import React, { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Fade, Link, Tooltip } from '@mui/material';

interface Props {
    linkText: string;
    bodyText: string;
    linkPath: string;
    children: ReactElement;
}

const HeaderTooltip = ({ linkText, bodyText, linkPath, children }: Props) => {
    return (
        <Tooltip
            title={
                <React.Fragment>
                    <Link
                        component={RouterLink}
                        to={linkPath}
                        sx={{ color: '#2196F3', textDecorationColor: '#2196F3' }}
                    >
                        {linkText}
                    </Link>
                    <span>{' ' + bodyText}</span>
                </React.Fragment>
            }
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
        >
            {children}
        </Tooltip>
    );
};

export default HeaderTooltip;
