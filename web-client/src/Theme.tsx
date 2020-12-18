import { createMuiTheme } from '@material-ui/core/styles';
import variables from './index.module.scss';

export const DEFAULT_COLOR = variables.DEFAULT_COLOR;

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: DEFAULT_COLOR,
    },
    secondary: {
      main: DEFAULT_COLOR,
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#666666',
        fontSize: 17,
      },
    },
  },
});

export default Theme;
