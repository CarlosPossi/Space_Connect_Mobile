import { View, Text } from "react-native";
import { colors } from "../theme/colors";
import { HeaderProps } from "../types/HeaderProps";

export function Header({ title, subtitle }: HeaderProps) {
    return (
        <View style={{ marginBottom: 24, paddingTop: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <View
                    style={{
                        width: 3,
                        height: 3,
                        borderRadius: 99,
                        backgroundColor: colors.primary,
                        marginRight: 8,
                        shadowColor: colors.primary,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 6,
                    }}
                />
                <Text
                    style={{
                        color: colors.primary,
                        fontSize: 10,
                        letterSpacing: 4,
                        fontWeight: "800",
                        textTransform: "uppercase",
                    }}
                >
                    SPACE CONNECT
                </Text>
            </View>

            <Text
                style={{
                    color: colors.text,
                    fontSize: 32,
                    fontWeight: "900",
                    letterSpacing: 0.5,
                    lineHeight: 36,
                }}
            >
                {String(title).toUpperCase()}
            </Text>

            {subtitle && (
                <Text
                    style={{
                        color: colors.textSoft,
                        fontSize: 13,
                        marginTop: 6,
                        letterSpacing: 0.3,
                    }}
                >
                    {subtitle}
                </Text>
            )}

            <View
                style={{
                    marginTop: 14,
                    height: 1,
                    backgroundColor: colors.borderStrong,
                    borderRadius: 999,
                }}
            />
        </View>
    );
}