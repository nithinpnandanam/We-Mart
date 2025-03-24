import { createTheme } from '@mui/material/styles';
import { colors } from './themeConstants';


export const AppLightTheme = createTheme({
  palette: {
    primary: {
        main: colors.primary,
        light: colors.primaryLight,
    },
   background:{
    default:colors.themeWhite,
    paper:colors.primaryLight
   }
  },
});

export const AppDarkTheme = createTheme({
    palette: {
     mode:'dark',
     primary: {
        main: colors.primary,
        light: colors.primaryLight,
    },
     background:{
      default:colors.themeDarkGrey,
      paper:colors.darkcard
     }
    },
  });