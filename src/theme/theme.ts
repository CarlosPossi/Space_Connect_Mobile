import { colors } from "./colors";
import { spacing } from "./spacing";

export const theme = {
    colors,
    spacing,

    radius: {
        sm: 12,
        md: 18,
        lg: 26,
    },

    shadow: {
        neon: {
            shadowColor: colors.primary,
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.28,
            shadowRadius: 18,
            elevation: 12,
        },

        orange: {
            shadowColor: colors.warning,
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.3,
            shadowRadius: 18,
            elevation: 10,
        },
    },
};