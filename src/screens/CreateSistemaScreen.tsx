import { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { criarSistema } from "../services/postService";
import { colors } from "../theme/colors";
import { FormInput } from "../components/FormInput";

export function CreateSistemaScreen({ navigation }: any) {
    const [nome, setNome] = useState("");
    const [status, setStatus] = useState("");
    const [descricao, setDescricao] = useState("");
    const [sensorId, setSensorId] = useState("");

    async function handleCreate() {
        try {
            await criarSistema({ nome, status, descricao, sensor: { id: Number(sensorId) } });
            Alert.alert("Sistema criado!", "O sistema foi cadastrado com sucesso.");
            setNome(""); setStatus(""); setDescricao(""); setSensorId("");
        } catch {
            Alert.alert("Erro", "Falha ao criar sistema. Tente novamente.");
        }
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={22} color={colors.text} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={styles.headerTag}>NOVO SISTEMA</Text>
                    <Text style={styles.headerTitle}>Cadastrar Sistema</Text>
                </View>
                <View style={styles.headerIcon}>
                    <Ionicons name="planet" size={20} color={colors.primary} />
                </View>
            </View>

            <View style={styles.formCard}>
                <FormInput label="Nome" placeholder="Nome do sistema" value={nome} onChangeText={setNome} />
                <FormInput label="Status" placeholder="ATIVO / OFFLINE / ALERTA" value={status} onChangeText={setStatus} autoCapitalize="characters" />
                <FormInput label="Descrição" placeholder="Descreva o sistema..." value={descricao} onChangeText={setDescricao} />
                <FormInput label="ID do Sensor" placeholder="ID do sensor vinculado" keyboardType="numeric" value={sensorId} onChangeText={setSensorId} />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleCreate} activeOpacity={0.85}>
                <Ionicons name="checkmark-circle" size={18} color="#020B18" style={{ marginRight: 8 }} />
                <Text style={styles.submitText}>CADASTRAR SISTEMA</Text>
            </TouchableOpacity>
            <View style={{ height: 60 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: colors.background, 
        padding: 20 
    },

    header: { 
        flexDirection: "row", 
        alignItems: "center", 
        marginTop: 48, 
        marginBottom: 28 
    },

    backButton: { 
        width: 40, 
        height: 40, 
        borderRadius: 12, 
        backgroundColor: colors.card, 
        borderWidth: 1, 
        borderColor: colors.borderStrong, 
        alignItems: "center", 
        justifyContent: "center", 
        marginRight: 14 
    },

    headerTag: { 
        color: colors.muted, 
        fontSize: 9, 
        letterSpacing: 3, 
        fontWeight: "800" 
    },

    headerTitle: { 
        color: colors.text, 
        fontSize: 24, 
        fontWeight: "900", 
        marginTop: 2 
    },

    headerIcon: { 
        width: 44, 
        height: 44, 
        borderRadius: 14, 
        backgroundColor: colors.primaryDim, 
        borderWidth: 1, 
        borderColor: colors.borderStrong, 
        alignItems: "center", 
        justifyContent: "center" 
    },

    formCard: { 
        backgroundColor: colors.card, 
        borderRadius: 20, 
        borderWidth: 1, 
        borderColor: colors.borderSubtle, 
        padding: 20, 
        marginBottom: 16 
    },

    submitButton: { 
        backgroundColor: colors.primary, 
        borderRadius: 16, 
        padding: 18, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center", 
        shadowColor: colors.primary, 
        shadowOffset: { width: 0, height: 0 }, 
        shadowOpacity: 0.5, 
        shadowRadius: 14, 
        elevation: 10 
    },

    submitText: { 
        color: "#020B18", 
        fontWeight: "900", 
        fontSize: 14, 
        letterSpacing: 1.5 
    },
});