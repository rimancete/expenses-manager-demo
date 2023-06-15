function theme() {
  return {
    ioShadow: {
      shadowColor: 'black',
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
    },
    pressableIOSRiple: {
      button: {
        flex: 1,
      },
      buttonPressed: {
        opacity: 0.5,
      },
    },
    colors: {
      primary50: '#e4d9fd',
      primary100: '#c6affc',
      primary200: '#a281f0',
      primary400: '#5721d4',
      primary500: '#3e04c3',
      primary700: '#2d0689',
      primary800: '#200364',

      secondary500: '#f7bc0c',

      erro50: '#fcc4e4',
      erro500: '#9b095c',

      gray500: '#39324a',
      gray700: '#221c30',

      primaryLight50: '#e3dcf3',
      primaryLight100: '#c1b8d5',
    },
  };
}
export default theme;
