import { createTheme } from '@material-ui/core/styles';
import variables from './theme.module.scss';

export const DEFAULT_UI_COLOR = variables.DEFAULT_UI_COLOR;
export const SPACER_L = variables.SPACER_L;
export const DEFAULT_BACKGROUND_COLOR = variables.DEFAULT_BACKGROUND_COLOR;

const Theme = createTheme({
  palette: {
    primary: {
      main: DEFAULT_UI_COLOR,
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.5rem',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        main: {
          paddingTop: '4rem',
          backgroundColor: DEFAULT_BACKGROUND_COLOR,
        },
      },
    },
    MuiButton: {
      containedPrimary: {
        fontSize: 12,
      },
    },
  },
});

export default Theme;
