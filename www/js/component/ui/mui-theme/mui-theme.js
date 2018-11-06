// @flow

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const muiTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    overrides: {
        MuiPaper: {
            // Name of the component ⚛️ / style sheet
            root: {
                // Name of the rule
                padding: 25,
                // backgroundColor: '#c00' // Some CSS
            },
        },
    },
});

export {muiTheme};
