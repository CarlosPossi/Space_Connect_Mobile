import React, { useMemo, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { Header } from "../components/Header";
import { FAB } from "../components/FAB";
import { EmptyState } from "../components/EmptyState";
import { api } from "../services/api";
import { colors } from "../theme/colors";
import { SistemaMonitorado } from "../types/SistemaMonitorado";

export function SistemasScreen({ navigation }: any) {
    const [sistemas, setSistemas] = useState<SistemaMonitorado[]>([]);

    async function carregarSistemas() {
        try {
            const response = await api.get("/sistemasmonitorados");
            setSistemas(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const onlineSystems = useMemo(
        () => sistemas.filter((s) => {
            const status = s.status?.toUpperCase();
            return status === "ATIVO" || status === "ONLINE" || status === "OPERACIONAL";
        }).length,
        [sistemas]
    );

    function getStatusColor(status: string) {
        const n = status?.toUpperCase();
        if (n === "ATIVO" || n === "ONLINE" || n === "OPERACIONAL") return colors.primary;
        if (n === "ALERTA" || n === "ATENCAO" || n === "ATENÇÃO") return colors.warning;
        if (n === "OFFLINE" || n === "ERRO" || n === "FALHA" || n === "INATIVO") return colors.danger;
        return colors.textSoft;
    }

    function getProgress(status: string) {
        const n = status?.toUpperCase();
        if (n === "ATIVO" || n === "ONLINE" || n === "OPERACIONAL") return "100%";
        if (n === "ALERTA" || n === "ATENÇÃO") return "60%";
        return "15%";
    }

    useFocusEffect(
        React.useCallback(() => {
            carregarSistemas();
        }, [])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={sistemas}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 140 }}
                ListEmptyComponent={<EmptyState message="Nenhum sistema registrado" icon="planet-outline" />}
                ListHeaderComponent={
                    <>
                        <Header title="Sistemas" subtitle="Infraestrutura orbital monitorada" />

                        <View style={styles.statsRow}>
                            <View style={styles.statCard}>
                                <Text style={styles.statLabel}>TOTAL</Text>
                                <Text style={[styles.statValue, { color: colors.primary }]}>{sistemas.length}</Text>
                            </View>
                            <View style={[styles.statCard, { borderColor: "rgba(0,255,163,0.2)", backgroundColor: colors.successDim }]}>
                                <Text style={styles.statLabel}>ONLINE</Text>
                                <Text style={[styles.statValue, { color: colors.success }]}>{onlineSystems}</Text>
                            </View>
                            <View style={[styles.statCard, { borderColor: "rgba(255,90,54,0.2)", backgroundColor: colors.dangerDim }]}>
                                <Text style={styles.statLabel}>OFFLINE</Text>
                                <Text style={[styles.statValue, { color: colors.danger }]}>{sistemas.length - onlineSystems}</Text>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>SISTEMAS MONITORADOS</Text>
                    </>
                }
                renderItem={({ item }) => {
                    const color = getStatusColor(item.status);
                    const progress = getProgress(item.status);

                    return (
                        <View style={[styles.systemCard, { borderColor: `${color}20` }]}>
                            <View style={[styles.topLine, { backgroundColor: color }]} />

                            <View style={styles.cardHeader}>
                                <View style={[styles.iconBox, { backgroundColor: `${color}15`, borderColor: `${color}25` }]}>
                                    <Ionicons name="planet" size={16} color={color} />
                                </View>
                                <View style={{ flex: 1, marginLeft: 12 }}>
                                    <Text style={styles.systemName}>{item.nome}</Text>
                                </View>
                                <View style={[styles.chip, { borderColor: color, backgroundColor: `${color}18` }]}>
                                    <View style={[styles.statusDot, { backgroundColor: color }]} />
                                    <Text style={[styles.chipText, { color }]}>{item.status?.toUpperCase()}</Text>
                                </View>
                            </View>

                            {item.descricao ? (
                                <Text style={styles.description}>{item.descricao}</Text>
                            ) : null}

                            <View style={styles.progressBg}>
                                <View style={[styles.progressFill, { backgroundColor: color, width: progress as any }]} />
                            </View>

                            <View style={styles.cardFooter}>
                                <Text style={styles.idText}>SYSTEM #{item.id}</Text>
                                <Text style={[styles.progressLabel, { color }]}>
                                    {progress === "100%" ? "OPERACIONAL" : progress === "60%" ? "DEGRADADO" : "FALHA"}
                                </Text>
                            </View>
                        </View>
                    );
                }}
            />

            <FAB label="Novo Sistema" onPress={() => navigation.navigate("CreateSistema")} />
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

    systemCard: { 
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
        width: 38, 
        height: 38, 
        borderRadius: 11, 
        borderWidth: 1, 
        alignItems: "center", 
        justifyContent: "center" 
    },

    systemName: { 
        color: colors.text, 
        fontWeight: "800", 
        fontSize: 15, 
        letterSpacing: 0.3 
    },

    chip: { 
        flexDirection: "row", 
        alignItems: "center",
        gap: 5, 
        borderWidth: 1, 
        borderRadius: 999, 
        paddingHorizontal: 10, 
        paddingVertical: 5 
    },

    statusDot: { 
        width: 5, 
        height: 5, 
        borderRadius: 99 
    },

    chipText: { 
        fontWeight: "800", 
        fontSize: 10 
    },

    description: { 
        color: colors.textSoft,
        fontSize: 13, 
        lineHeight: 19, 
        marginBottom: 14 
    },

    progressBg: { 
        height: 6, 
        borderRadius: 999, 
        backgroundColor: "#0D1D30", 
        overflow: "hidden", 
        marginBottom: 12 
    },

    progressFill: { 
        height: "100%", 
        borderRadius: 999 
    },

    cardFooter: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center" 
    },

    idText: { 
        color: colors.muted, 
        fontSize: 10, 
        letterSpacing: 2 
    },

    progressLabel: { 
        fontSize: 10, 
        fontWeight: "800", 
        letterSpacing: 1 
    },
});