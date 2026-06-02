import React, { useMemo, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { Header } from "../components/Header";
import { FAB } from "../components/FAB";
import { EmptyState } from "../components/EmptyState";
import { api } from "../services/api";
import { colors } from "../theme/colors";
import { ModuloComputacional } from "../types/ModuloComputacional";

export function ModulosScreen({ navigation }: any) {
    const [modulos, setModulos] = useState<ModuloComputacional[]>([]);

    async function carregarModulos() {
        try {
            const response = await api.get("/moduloscomputacionais");
            setModulos(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const onlineModules = useMemo(
        () => modulos.filter((m) => {
            const s = m.status?.toUpperCase();
            return s === "ATIVO" || s === "ONLINE" || s === "OPERACIONAL";
        }).length,
        [modulos]
    );

    function getStatusColor(status: string) {
        const n = status?.toUpperCase();
        if (n === "ATIVO" || n === "ONLINE" || n === "OPERACIONAL") return colors.primary;
        if (n === "ALERTA" || n === "ATENCAO" || n === "ATENÇÃO") return colors.warning;
        if (n === "ERRO" || n === "OFFLINE" || n === "FALHA" || n === "INATIVO") return colors.danger;
        return colors.textSoft;
    }

    function getProgress(status: string) {
        const n = status?.toUpperCase();
        if (n === "ATIVO" || n === "ONLINE" || n === "OPERACIONAL") return "100%";
        if (n === "ALERTA" || n === "ATENÇÃO") return "60%";
        return "20%";
    }

    useFocusEffect(
        React.useCallback(() => {
            carregarModulos();
        }, [])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={modulos}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 140 }}
                ListEmptyComponent={<EmptyState message="Nenhum módulo registrado" icon="hardware-chip-outline" />}
                ListHeaderComponent={
                    <>
                        <Header title="Módulos" subtitle="Computação orbital distribuída" />

                        <View style={styles.statsRow}>
                            <View style={styles.statCard}>
                                <Text style={styles.statLabel}>MÓDULOS</Text>
                                <Text style={[styles.statValue, { color: colors.primary }]}>{modulos.length}</Text>
                            </View>
                            <View style={[styles.statCard, { borderColor: "rgba(0,255,163,0.2)", backgroundColor: colors.successDim }]}>
                                <Text style={styles.statLabel}>ONLINE</Text>
                                <Text style={[styles.statValue, { color: colors.success }]}>{onlineModules}</Text>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>MÓDULOS REGISTRADOS</Text>
                    </>
                }
                renderItem={({ item }) => {
                    const statusColor = getStatusColor(item.status);
                    const progress = getProgress(item.status);

                    return (
                        <View style={[styles.moduleCard, { borderColor: `${statusColor}20` }]}>
                            <View style={[styles.topLine, { backgroundColor: statusColor }]} />

                            <View style={styles.cardHeader}>
                                <View style={[styles.iconBox, { backgroundColor: `${statusColor}15`, borderColor: `${statusColor}25` }]}>
                                    <Ionicons name="hardware-chip" size={16} color={statusColor} />
                                </View>
                                <View style={{ flex: 1, marginLeft: 12 }}>
                                    <Text style={styles.moduleName}>{item.nome}</Text>
                                    <View style={styles.versionRow}>
                                        <Text style={styles.versionText}>v{item.versao}</Text>
                                        {item.sistemaMonitorado?.nome && (
                                            <Text style={styles.systemTag}>{item.sistemaMonitorado.nome}</Text>
                                        )}
                                    </View>
                                </View>
                                <View style={[styles.chip, { borderColor: statusColor, backgroundColor: `${statusColor}18` }]}>
                                    <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                                    <Text style={[styles.chipText, { color: statusColor }]}>{item.status?.toUpperCase()}</Text>
                                </View>
                            </View>

                            <View style={styles.progressBg}>
                                <View style={[styles.progressFill, { backgroundColor: statusColor, width: progress as any }]} />
                            </View>

                            <View style={styles.cardFooter}>
                                <Text style={styles.idText}>MODULE #{item.id}</Text>
                                <Text style={[styles.progressLabel, { color: statusColor }]}>
                                    {progress === "100%" ? "OPERACIONAL" : progress === "60%" ? "DEGRADADO" : "FALHA"}
                                </Text>
                            </View>
                        </View>
                    );
                }}
            />

            <FAB label="Novo Módulo" onPress={() => navigation.navigate("CreateModulo")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: 
        colors.background 
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

    moduleCard: { 
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
        marginBottom: 16 
    },

    iconBox: { 
        width: 38, 
        height: 38, 
        borderRadius: 11, 
        borderWidth: 1, 
        alignItems: "center", 
        justifyContent: "center" 
    },

    moduleName: { 
        color: colors.text, 
        fontWeight: "800", 
        fontSize: 15, 
        letterSpacing: 0.3 
    },

    versionRow: { 
        flexDirection: "row", 
        alignItems: "center", 
        gap: 8, 
        marginTop: 3 
    },

    versionText: { 
        color: colors.muted, 
        fontSize: 10, 
        letterSpacing: 1, 
        fontWeight: "700" 
    },

    systemTag: { 
        color: colors.primary, 
        fontSize: 10, 
        letterSpacing: 0.5 
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