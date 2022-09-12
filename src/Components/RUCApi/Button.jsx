import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';


export const PrimaryButton = styled(Button)( ({theme})  =>({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    borderRadius : "8px",
    lineHeight: 1.5,
    backgroundColor: theme.palette.button.primary,
    borderColor: theme.palette.button.primary,
    color : "white",
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  }));
  
  export const SecondaryButton = styled(Button)(({ theme }) => ({
    
  }));


 