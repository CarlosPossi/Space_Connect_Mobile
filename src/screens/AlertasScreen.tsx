import React, { useMemo, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { Header } from "../components/Header";
import { FAB } from "../components/FAB";
import { EmptyState } from "../components/EmptyState";
import { api } from "../services/api";
import { colors } from "../theme/colors";
import { AlertaCritico } from "../types/AlertaCritico";

export function AlertasScreen({ navigation }: any) {
    const [alertas, setAlertas] = useState<AlertaCritico[]>([]);

    async function carregarAlertas() {
        try {
            const response = await api.get("/alertascriticos");
            setAlertas(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const criticalCount = useMemo(
        () => alertas.filter((a) => a.nivel === "CRITICO").length,
        [alertas]
    );

    function getCriticityColor(nivel: string) {
        switch (nivel?.toUpperCase()) {
            case "CRITICA":
            case "CRITICO":
                return colors.danger;
            case "ALTA":
                return colors.warning;
            case "MEDIA":
                return "#FFBF69";
            default:
                return colors.primary;
        }
    }

    function getCriticityIcon(nivel: string) {
        switch (nivel?.toUpperCase()) {
            case "CRITICA":
            case "CRITICO":
                return "flame";
            case "ALTA":
                return "warning";
            case "MEDIA":
                return "alert-circle";
            default:
                return "information-circle";
        }
    }

    function formatDate(timestamp: number) {
        try {
            return new Date(timestamp).toLocaleString("pt-BR");
        } catch {
            return "Sem data";
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            carregarAlertas();
        }, [])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={alertas}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 140 }}
                ListEmptyComponent={<EmptyState message="Nenhum alerta registrado" icon="warning-outline" />}
                ListHeaderComponent={
                    <>
                        <Header title="Alertas" subtitle="Monitoramento de riscos em tempo real" />

                        <View style={styles.statsRow}>
                            <View style={styles.statCard}>
                                <Text style={styles.statLabel}>TOTAL</Text>
                                <Text style={[styles.statValue, { color: colors.primary }]}>{alertas.length}</Text>
                            </View>
                            <View style={[styles.statCard, { borderColor: "rgba(255,90,54,0.25)", backgroundColor: colors.dangerDim }]}>
                                <Text style={styles.statLabel}>CRÍTICOS</Text>
                                <Text style={[styles.statValue, { color: colors.danger }]}>{criticalCount}</Text>
                            </View>
                            <View style={[styles.statCard, { borderColor: "rgba(0,255,163,0.2)", backgroundColor: colors.successDim }]}>
                                <Text style={styles.statLabel}>ATIVOS</Text>
                                <Text style={[styles.statValue, { color: colors.success }]}>{alertas.filter(a => a.ativo).length}</Text>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>CENTRAL DE ALERTAS</Text>
                    </>
                }
                renderItem={({ item }) => {
                    const color = getCriticityColor(item.nivel);
                    const icon = getCriticityIcon(item.nivel);

                    return (
                        <View style={[styles.alertCard, { borderColor: `${color}22` }]}>
                            <View style={[styles.topLine, { backgroundColor: color }]} />

                            <View style={styles.cardHeader}>
                                <View style={[styles.iconBox, { backgroundColor: `${color}18`, borderColor: `${color}30` }]}>
                                    <Ionicons name={icon as any} size={16} color={color} />
                                </View>
                                <View style={{ flex: 1, marginLeft: 12 }}>
                                    <Text style={styles.alertCode}>ALERTA #{item.id}</Text>
                                </View>
                                <View style={[styles.chip, { borderColor: color, backgroundColor: `${color}18` }]}>
                                    <Text style={[styles.chipText, { color }]}>{item.nivel}</Text>
                                </View>
                            </View>

                            <Text style={styles.description}>{item.mensagem}</Text>

                            <View style={styles.divider} />

                            <View style={styles.cardFooter}>
                                <View style={styles.statusRow}>
                                    <View style={[styles.statusDot, { backgroundColor: item.ativo ? colors.success : colors.danger }]} />
                                    <Text style={[styles.statusText, { color: item.ativo ? colors.success : colors.danger }]}>
                                        {item.ativo ? "ATIVO" : "RESOLVIDO"}
                                    </Text>
                                </View>
                                <Text style={styles.dateText}>{formatDate(item.dataHora)}</Text>
                            </View>
                        </View>
                    );
                }}
            />

            <FAB label="Novo Alerta" onPress={() => navigation.navigate("CreateAlerta")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: colors.background 
    },

    statsRow: { 
        flexDirection: "row", 
        gap: 10, 
        marginBottom: 28 
    },

    statCard: { 
        flex: 1, 
        backgroundColor: colors.card, 
        borderRadius: 16, 
        borderWidth: 1, 
        borderColor: colors.borderStrong, 
        padding: 16, 
        alignItems: "center" 
    },

    statLabel: { 
        color: colors.muted, 
        fontSize: 9, 
        letterSpacing: 2, 
        fontWeight: "800", 
        marginBottom: 8 
    },

    statValue: { 
        fontSize: 28, 
        fontWeight: "900", 
        letterSpacing: -1 
    },

    sectionTitle: { 
        color: colors.muted, 
        fontSize: 10, 
        letterSpacing: 3, 
        fontWeight: "800", 
        marginBottom: 14 
    },

    alertCard: { 
        backgroundColor: colors.card, 
        borderRadius: 20, 
        borderWidth: 1, 
        padding: 18, 
        marginBottom: 14, 
        overflow: "hidden" 
    },

    topLine: { 
        position: "absolute", 
        top: 0, 
        left: 0, 
        right: 0, 
        height: 2 
    },

    cardHeader: { 
        flexDirection: "row", 
        alignItems: "center", 
        marginBottom: 14 
    },

    iconBox: { 
        width: 36, 
        height: 36, 
        borderRadius: 10, 
        borderWidth: 1, 
        alignItems: "center", 
        justifyContent: "center" 
    },

    alertCode: { 
        color: colors.muted, 
        letterSpacing: 2, 
        fontSize: 10, 
        fontWeight: "800" 
    },

    chip: { 
        borderWidth: 1, 
        borderRadius: 999, 
        paddingHorizontal: 12, 
        paddingVertical: 6 
    },

    chipText: { 
        fontWeight: "800", 
        fontSize: 10, 
        letterSpacing: 0.5 
    },

    description: { 
        color: colors.textSecondary, 
        fontSize: 15, 
        fontWeight: "600", 
        lineHeight: 22 
    },

    divider: { 
        height: 1, 
        backgroundColor: colors.borderSubtle, 
        marginVertical: 14 
    },

    cardFooter: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center" 
    },

    statusRow: { 
        flexDirection: "row", 
        alignItems: "center", 
        gap: 6 
    },

    statusDot: { 
        width: 6, 
        height: 6, 
        borderRadius: 3 
    },

    statusText: { 
        fontSize: 11, 
        fontWeight: "800", 
        letterSpacing: 1 
    },

    dateText: { 
        color: colors.muted, 
        fontSize: 11 
    },
});