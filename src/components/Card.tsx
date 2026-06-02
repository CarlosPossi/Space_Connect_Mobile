import { View, Text } from "react-native";
import { colors } from "../theme/colors";
import { CardProps } from "../types/CardProps";

export function Card({ title, value, subtitle, accentColor = colors.primary }: CardProps) {
    return (
        <View
            style={{
                backgroundColor: colors.card,
                borderWidth: 1,
                borderColor: colors.borderSubtle,
                borderRadius: 20,
                padding: 20,
                marginBottom: 14,
                overflow: "hidden",
                shadowColor: accentColor,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 20,
                elevation: 8,
            }}
        >
            <View
                style={{
                    position: "absolute",
                    top: 16,
                    left: 0,
                    width: 3,
                    height: 36,
                    backgroundColor: accentColor,
                    borderRadius: 999,
                    opacity: 0.9,
                }}
            />

            <Text
                style={{
                    color: colors.muted,
                    fontSize: 10,
                    letterSpacing: 2.5,
                    textTransform: "uppercase",
                    marginBottom: 10,
                    fontWeight: "700",
                    marginLeft: 12,
                }}
            >
                {title}
            </Text>

            <Text
                style={{
                    color: accentColor,
                    fontSize: 30,
                    fontWeight: "900",
                    marginBottom: 6,
                    marginLeft: 12,
                    letterSpacing: -0.5,
                }}
            >
                {value}
            </Text>

            {subtitle && (
                <Text
                    style={{
                        color: colors.textSoft,
                        fontSize: 12,
                        lineHeight: 17,
                        marginLeft: 12,
                    }}
                >
                    {subtitle}
                </Text>
            )}
        </View>
    );
}