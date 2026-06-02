import React, { useMemo, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { Header } from "../components/Header";
import { FAB } from "../components/FAB";
import { EmptyState } from "../components/EmptyState";
import { api } from "../services/api";
import { colors } from "../theme/colors";
import { Sensor } from "../types/Sensor";

export function SensoresScreen({ navigation }: any) {
    const [sensores, setSensores] = useState<Sensor[]>([]);

    async function carregarSensores() {
        try {
            const response = await api.get("/sensores");
            setSensores(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const sensoresAtivos = useMemo(
        () => sensores.filter((s) => {
            const status = s.status?.toUpperCase();
            return status === "ATIVO" || status === "ONLINE" || status === "OPERACIONAL";
        }).length,
        [sensores]
    );

    function getSensorColor(status: string) {
        const n = status?.toUpperCase();
        if (n === "ATIVO" || n === "ONLINE" || n === "OPERACIONAL") return colors.primary;
        if (n === "ALERTA" || n === "ATENCAO" || n === "ATENÇÃO") return colors.warning;
        if (n === "OFFLINE" || n === "INATIVO" || n === "ERRO" || n === "FALHA") return colors.danger;
        return colors.textSoft;
    }

    function getProgressWidth(status: string) {
        const n = status?.toUpperCase();
        if (n === "ATIVO" || n === "ONLINE" || n === "OPERACIONAL") return "100%";
        if (n === "ALERTA" || n === "ATENCAO") return "55%";
        return "12%";
    }

    useFocusEffect(
        React.useCallback(() => {
            carregarSensores();
        }, [])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={sensores}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 140 }}
                ListEmptyComponent={<EmptyState message="Nenhum sensor registrado" icon="radio-outline" />}
                ListHeaderComponent={
                    <>
                        <Header title="Sensores" subtitle="Painel de telemetria orbital" />

                        <View style={styles.statsRow}>
                            <View style={styles.statCard}>
                                <Text style={styles.statLabel}>TOTAL</Text>
                                <Text style={[styles.statValue, { color: colors.primary }]}>{sensores.length}</Text>
                            </View>
                            <View style={[styles.statCard, { borderColor: "rgba(0,255,163,0.2)", backgroundColor: colors.successDim }]}>
                                <Text style={styles.statLabel}>ONLINE</Text>
                                <Text style={[styles.statValue, { color: colors.success }]}>{sensoresAtivos}</Text>
                            </View>
                            <View style={[styles.statCard, { borderColor: "rgba(255,90,54,0.2)", backgroundColor: colors.dangerDim }]}>
                                <Text style={styles.statLabel}>OFFLINE</Text>
                                <Text style={[styles.statValue, { color: colors.danger }]}>{sensores.length - sensoresAtivos}</Text>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>SENSORES REGISTRADOS</Text>
                    </>
                }
                renderItem={({ item }) => {
                    const statusColor = getSensorColor(item.status);
                    const progress = getProgressWidth(item.status);

                    return (
                        <View style={[styles.sensorCard, { borderColor: `${statusColor}20` }]}>
                            <View style={[styles.topLine, { backgroundColor: statusColor }]} />

                            <View style={styles.cardHeader}>
                                <View style={[styles.iconBox, { backgroundColor: `${statusColor}15`, borderColor: `${statusColor}25` }]}>
                                    <Ionicons name="radio" size={16} color={statusColor} />
                                </View>
                                <View style={{ flex: 1, marginLeft: 12 }}>
                                    <Text style={styles.sensorName}>{item.nome}</Text>
                                    <Text style={styles.sensorType}>{item.tipo}</Text>
                                </View>
                                <View style={[styles.chip, { borderColor: statusColor, backgroundColor: `${statusColor}18` }]}>
                                    <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                                    <Text style={[styles.chipText, { color: statusColor }]}>
                                        {item.status?.toUpperCase() ?? "N/A"}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.valueBox}>
                                <Text style={styles.valueLabel}>LEITURA ATUAL</Text>
                                <Text style={[styles.valueLarge, { color: statusColor }]}>
                                    {item.valorAtual}
                                    <Text style={styles.valueUnit}> {item.unidade}</Text>
                                </Text>
                            </View>

                            <View style={styles.progressBg}>
                                <View style={[styles.progressFill, { backgroundColor: statusColor, width: progress as any }]} />
                            </View>

                            <View style={styles.cardFooter}>
                                <Text style={styles.idText}>SENSOR #{item.id}</Text>
                                <Text style={[styles.progressLabel, { color: statusColor }]}>
                                    {progress === "100%" ? "OPERACIONAL" : progress === "55%" ? "ALERTA" : "FALHA"}
                                </Text>
                            </View>
                        </View>
                    );
                }}
            />

            <FAB label="Novo Sensor" onPress={() => navigation.navigate("CreateSensor")} />
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

    sensorCard: { 
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

    sensorName: { 
        color: colors.text, 
        fontWeight: "800", 
        fontSize: 15, 
        letterSpacing: 0.3 
    },

    sensorType: { 
        color: colors.muted, 
        fontSize: 11, 
        marginTop: 2, 
        letterSpacing: 1 
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

    valueBox: { 
        marginBottom: 14 
    },

    valueLabel: { 
        color: colors.muted, 
        fontSize: 9, 
        letterSpacing: 2.5, 
        fontWeight: "700", 
        marginBottom: 6 
    },

    valueLarge: { 
        fontSize: 36, 
        fontWeight: "900", 
        letterSpacing: -1 
    },

    valueUnit: { 
        fontSize: 16, 
        fontWeight: "600", 
        color: colors.textSoft 
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