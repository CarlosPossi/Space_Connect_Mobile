import { View, Text, TextInput} from "react-native";
import { colors } from "../theme/colors";
import { FormInputProps } from "../types/FormInputProps";

export function FormInput({ label, ...props }: FormInputProps) {
    return (
        <View style={{ marginBottom: 16 }}>
            <Text
                style={{
                    color: colors.muted,
                    fontSize: 9,
                    letterSpacing: 2.5,
                    fontWeight: "800",
                    marginBottom: 8,
                    marginLeft: 4,
                }}
            >
                {label.toUpperCase()}
            </Text>
            <TextInput
                placeholderTextColor={colors.muted}
                style={{
                    backgroundColor: colors.card,
                    borderWidth: 1,
                    borderColor: colors.borderStrong,
                    borderRadius: 16,
                    paddingHorizontal: 18,
                    paddingVertical: 16,
                    color: colors.text,
                    fontSize: 15,
                    fontWeight: "500",
                }}
                {...props}
            />
        </View>
    );
}