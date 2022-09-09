import * as React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { darken } from '@mui/material/styles';

export const PrimaryText = styled( 
    (props) => (
        <Typography component="p" variant='h3' {...props} />
      )
    )(
    ({ theme }) => `
    color: ${"black"};
    font-size : 1rem;
    :hover {
      color-check: ${darken(theme.palette.primary.main, 0.2)};
    }
  `,
  );

  export const SecondaryText = styled( 
    (props) => (
        <Typography   component="p" variant='h4' {...props} />
      )
    )(
    ({ theme }) => `
    color: ${"black"};
    font-size : 0.7rem;
  
    :hover {
      color: ${darken(theme.palette.primary.main, 0.2)};
    }
  `,
  );

  export const XSMText = styled( 
    (props) => (
        <Typography  variant="body1" component = "span" {...props} />
      )
    )(
    ({ theme }) => `
    color: ${"black"};
  
    :hover {
      color: ${darken(theme.palette.primary.main, 0.2)};
    }
  `,
  );

  export const SMText = styled( 
    (props) => (
        <Typography component = "span" variant="body1" {...props} />
      )
    )(
    ({ theme }) => `
    color: ${"black"};
    font-size : 0.7rem;
    color : grey;
    font-weight : semi-bold;
    margin : 2px 5px;
    :hover {
      color: ${darken(theme.palette.primary.main, 0.2)};
    }
  `,
  );


 export   const PrimaryHeading = styled( 
    (props) => (
        <Typography  variant="h2" component="h2" {...props} />
      )
    )(
    ({ theme }) => `
    color: blue;
    font-size : 1.2rem;
    font-weight : bold;
    :hover {
      color: ${darken(theme.palette.primary.main, 0.2)};
    }
  `,
  );

  export const SecondaryHeading = styled( 
    (props) => (
        <Typography variant="h2" component="h2" {...props} />
      )
    )(
    ({ theme }) => `
    color: blue;
    font-size : 1rem;
    font-weight : semi-bold;
  
    :hover {
      color: ${darken(theme.palette.primary.main, 0.2)};
    }
  `,
  );
  export const XSMHeading = styled( 
    (props) => (
        <Typography variant="h4" component="h4" {...props} />
      )
    )(
    ({ theme }) => `
    color: ${"black"};
  
    :hover {
      color: ${darken(theme.palette.primary.main, 0.2)};
    }
  `,
  );

  export const SMHeading = styled( 
    (props) => (
        <Typography  variant="h4" {...props} />
      )
    )(
    ({ theme }) => `
    color: ${"black"};
    font-size : 1rem;
    color : grey;
    font-weight : semi-bold;
    margin : 2px 5px;
    :hover {
      color: ${darken(theme.palette.primary.main, 0.2)};
    }
  `,
  );
