jest.mock("react-native-reanimated", () => {
  const { ScrollView, View } = require("react-native");

  return {
    __esModule: true,
    default: {
      ScrollView,
      View,
      createAnimatedComponent: (component: unknown) => component,
    },
    ScrollView,
    View,
    createAnimatedComponent: (component: unknown) => component,
    useAnimatedStyle: (callback: () => unknown) => callback(),
    useSharedValue: (value: unknown) => ({ value }),
    withSpring: (value: unknown) => value,
  };
});

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));
