import { createMuiTheme } from "@material-ui/core/styles";
import variables from "./theme.module.scss";

export const DEFAULT_COLOR = variables.DEFAULT_COLOR;
export const SPACER_L = variables.SPACER_L;

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: DEFAULT_COLOR,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global':{
        main:{
          paddingTop: '2rem'
        }
      }
    },
    MuiButton: {
      containedPrimary: {
        fontSize: 12,
      },
    },
  },
});

export default Theme;
