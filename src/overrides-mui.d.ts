import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

type CustomType = {
  MuiPickersStaticWrapper: {
    staticWrapperRoot: {
      [key: string]: string;
    };
  };
  MuiPickersBasePicker: {
    pickerView: {
      [key: string]: string;
    };
  };
  MuiPickersYearSelection: {
    container: {
      [key: string]: string;
    };
  };
};

declare module '@material-ui/core/styles/overrides' {
  interface ComponentNameToClassKey extends overridesNameToClassKey {}
  export interface ComponentNameToClassKey extends CustomType {}
}
