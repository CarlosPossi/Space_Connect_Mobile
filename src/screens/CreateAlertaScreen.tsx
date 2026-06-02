import { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { criarAlerta } from "../services/postService";
import { colors } from "../theme/colors";
import { FormInput } from "../components/FormInput";

export function CreateAlertaScreen({ navigation }: any) {
    const [mensagem, setMensagem] = useState("");
    const [nivel, setNivel] = useState("");
    const [dataHora, setDataHora] = useState("");
    const [ativo, setAtivo] = useState("");

    async function handleCreate() {
        try {
            if (!mensagem || !nivel || !dataHora) {
                Alert.alert("Campos obrigatórios", "Preencha mensagem, nível e data/hora.");
                return;
            }
            await criarAlerta({ mensagem, nivel, dataHora, ativo: ativo === "true" });
            Alert.alert("Alerta criado!", "O alerta foi registrado com sucesso.");
            setMensagem(""); setNivel(""); setDataHora(""); setAtivo("");
        } catch {
            Alert.alert("Erro", "Falha ao criar alerta. Tente novamente.");
        }
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={22} color={colors.text} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={styles.headerTag}>NOVO ALERTA</Text>
                    <Text style={styles.headerTitle}>Registrar Alerta</Text>
                </View>
                <View style={[styles.headerIcon, { backgroundColor: colors.dangerDim, borderColor: "rgba(255,90,54,0.3)" }]}>
                    <Ionicons name="warning" size={20} color={colors.danger} />
                </View>
            </View>

            <View style={styles.formCard}>
                <FormInput label="Mensagem" placeholder="Descreva o alerta..." value={mensagem} onChangeText={setMensagem} />
                <FormInput label="Nível" placeholder="CRITICA / ALTA / MEDIA" value={nivel} onChangeText={setNivel} autoCapitalize="characters" />
                <FormInput label="Data/Hora" placeholder="YYYY-MM-DDTHH:mm:ss" value={dataHora} onChangeText={setDataHora} />
                <FormInput label="Ativo" placeholder="true / false" value={ativo} onChangeText={setAtivo} autoCapitalize="none" />
            </View>

            <TouchableOpacity style={[styles.submitButton, { backgroundColor: colors.danger, shadowColor: colors.danger }]} onPress={handleCreate} activeOpacity={0.85}>
                <Ionicons name="warning" size={18} color="#fff" style={{ marginRight: 8 }} />
                <Text style={[styles.submitText, { color: "#fff" }]}>REGISTRAR ALERTA</Text>
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