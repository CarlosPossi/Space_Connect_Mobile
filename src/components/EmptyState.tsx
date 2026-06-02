import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { EmptyStateProps } from "../types/EmptyStateProps";

export function EmptyState({ message = "Nenhum dado encontrado", icon = "search-outline" }: EmptyStateProps) {
    return (
        <View style={{ padding: 48, alignItems: "center", justifyContent: "center" }}>
            <View
                style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    backgroundColor: colors.primaryDim,
                    borderWidth: 1,
                    borderColor: colors.border,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                }}
            >
                <Ionicons name={icon as any} size={28} color={colors.muted} />
            </View>
            <Text style={{ color: colors.muted, fontSize: 13, letterSpacing: 1, textAlign: "center" }}>
                {message.toUpperCase()}
            </Text>
        </View>
    );
}