import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export const SIZES = {
    // global sizes
    spacing: 10,
    font: 14,
    radius: 12,
    padding: 24,
    base: 6,

    // font sizes
    largeTitle: 40,
    h1: 32,
    h2: 24,
    h3: 16,
    h4: 14,
    h5: 12,
    body1: 32,
    body2: 24,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};