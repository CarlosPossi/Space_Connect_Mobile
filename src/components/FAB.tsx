import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { FABProps } from "../types/FABProps"

export function FAB({ label, onPress }: FABProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            style={{
                position: "absolute",
                bottom: 100,
                right: 20,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.primary,
                paddingHorizontal: 20,
                paddingVertical: 14,
                borderRadius: 50,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.6,
                shadowRadius: 16,
                elevation: 14,
                gap: 8,
            }}
        >
            <Ionicons name="add" size={20} color="#020B18" />
            <Text style={{ color: "#020B18", fontWeight: "900", fontSize: 12, letterSpacing: 1.5 }}>
                {label.toUpperCase()}
            </Text>
        </TouchableOpacity>
    );
}