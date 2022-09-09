import * as React from 'react';
import { createTheme } from '@mui/system';

 const DefaultTheme = createTheme({
    palette: {
      primary: {
        main: '#20b2aa',
      },
    },
    components: {
        MuiTypography: {
          defaultProps: {
            variantMapping: {
              h1: 'h2',
              h2: 'h3',
              h3: 'h4',
              h4: 'h5',
              h5: 'h2',
              h6: 'h2',
              subtitle1: 'p',
              subtitle2: 'p',
              body1: 'span',
              body2: 'span',
            },
          },
        },
      },

  });

  export default DefaultTheme