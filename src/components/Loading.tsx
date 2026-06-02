import { View, Text, ActivityIndicator } from "react-native";
import { colors } from "../theme/colors";

export function Loading() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.background,
                gap: 16,
            }}
        >
            <View
                style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    backgroundColor: colors.primaryDim,
                    borderWidth: 1,
                    borderColor: colors.borderStrong,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ActivityIndicator size="small" color={colors.primary} />
            </View>
            <Text style={{ color: colors.muted, fontSize: 10, letterSpacing: 3, fontWeight: "700" }}>
                CARREGANDO
            </Text>
        </View>
    );
}