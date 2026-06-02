import { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { criarModulo } from "../services/postService";
import { colors } from "../theme/colors";
import { FormInput } from "../components/FormInput";

export function CreateModuloScreen({ navigation }: any) {
    const [nome, setNome] = useState("");
    const [versao, setVersao] = useState("");
    const [status, setStatus] = useState("");
    const [sistemaId, setSistemaId] = useState("");

    async function handleCreate() {
        try {
            await criarModulo({ nome, versao, status, sistemaMonitorado: { id: Number(sistemaId) } });
            Alert.alert("Módulo criado!", "O módulo foi cadastrado com sucesso.");
            setNome(""); setVersao(""); setStatus(""); setSistemaId("");
        } catch {
            Alert.alert("Erro", "Falha ao criar módulo. Tente novamente.");
        }
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={22} color={colors.text} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={styles.headerTag}>NOVO MÓDULO</Text>
                    <Text style={styles.headerTitle}>Cadastrar Módulo</Text>
                </View>
                <View style={styles.headerIcon}>
                    <Ionicons name="hardware-chip" size={20} color={colors.primary} />
                </View>
            </View>

            <View style={styles.formCard}>
                <FormInput label="Nome" placeholder="Nome do módulo" value={nome} onChangeText={setNome} />
                <FormInput label="Versão" placeholder="Ex: 1.0.0" value={versao} onChangeText={setVersao} />
                <FormInput label="Status" placeholder="ATIVO / OFFLINE / ALERTA" value={status} onChangeText={setStatus} autoCapitalize="characters" />
                <FormInput label="ID do Sistema" placeholder="ID do sistema vinculado" keyboardType="numeric" value={sistemaId} onChangeText={setSistemaId} />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleCreate} activeOpacity={0.85}>
                <Ionicons name="checkmark-circle" size={18} color="#020B18" style={{ marginRight: 8 }} />
                <Text style={styles.submitText}>CADASTRAR MÓDULO</Text>
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