import React, { useMemo, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { api } from "../services/api";
import { colors } from "../theme/colors";
import { Header } from "../components/Header";
import { FAB } from "../components/FAB";
import { EmptyState } from "../components/EmptyState";
import { EventoOperacional } from "../types/EventoOperacional";

export function EventosScreen({ navigation }: any) {
    const [data, setData] = useState<EventoOperacional[]>([]);

    async function carregarEventos() {
        try {
            const response = await api.get("/eventosoperacionais");
            setData(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const criticalCount = useMemo(
        () => data.filter((item) => item.severidade === "CRITICA").length,
        [data]
    );

    function getSeverityColor(severity: EventoOperacional["severidade"]) {
        switch (severity) {
            case "CRITICA": return colors.danger;
            case "ALTA": return colors.warning;
            case "MEDIA": return colors.primary;
            default: return colors.primary;
        }
    }

    function getSeverityIcon(severity: string) {
        switch (severity) {
            case "CRITICA": return "flame";
            case "ALTA": return "warning";
            default: return "pulse";
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
            carregarEventos();
        }, [])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 140 }}
                ListEmptyComponent={<EmptyState message="Nenhum evento registrado" icon="pulse-outline" />}
                ListHeaderComponent={
                    <>
                        <Header title="Eventos" subtitle="Timeline operacional em tempo real" />

                        <View style={styles.statsRow}>
                            <View style={styles.statCard}>
                                <Text style={styles.statLabel}>EVENTOS</Text>
                                <Text style={[styles.statValue, { color: colors.primary }]}>{data.length}</Text>
                            </View>
                            <View style={[styles.statCard, { borderColor: "rgba(255,90,54,0.2)", backgroundColor: colors.dangerDim }]}>
                                <Text style={styles.statLabel}>CRÍTICOS</Text>
                                <Text style={[styles.statValue, { color: colors.danger }]}>{criticalCount}</Text>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>TIMELINE OPERACIONAL</Text>
                    </>
                }
                renderItem={({ item }) => {
                    const severityColor = getSeverityColor(item.severidade);
                    const icon = getSeverityIcon(item.severidade);

                    return (
                        <View style={[styles.eventCard, { borderColor: `${severityColor}22` }]}>
                            <View style={[styles.topLine, { backgroundColor: severityColor }]} />

                            <View style={styles.cardHeader}>
                                <View style={[styles.iconBox, { backgroundColor: `${severityColor}15`, borderColor: `${severityColor}25` }]}>
                                    <Ionicons name={icon as any} size={15} color={severityColor} />
                                </View>
                                <View style={{ flex: 1, marginLeft: 12 }}>
                                    <Text style={[styles.systemName, { color: severityColor }]}>
                                        {item.sistemaMonitorado?.nome ?? "Sistema"}
                                    </Text>
                                </View>
                                <View style={[styles.chip, { borderColor: severityColor, backgroundColor: `${severityColor}18` }]}>
                                    <Text style={[styles.chipText, { color: severityColor }]}>{item.severidade}</Text>
                                </View>
                            </View>

                            <Text style={styles.description}>{item.descricao}</Text>

                            <View style={styles.divider} />

                            <View style={styles.cardFooter}>
                                <Text style={styles.dateText}>{formatDate(item.dataHora)}</Text>
                                <Text style={styles.idText}>#{item.id}</Text>
                            </View>
                        </View>
                    );
                }}
            />

            <FAB label="Novo Evento" onPress={() => navigation.navigate("CreateEvento")} />
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

    eventCard: { 
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
        marginBottom: 12 
    },

    iconBox: { 
        width: 36, 
        height: 36,
        borderRadius: 10, 
        borderWidth: 1, 
        alignItems: "center", 
        justifyContent: "center" 
    },

    systemName: { 
        fontSize: 11, 
        fontWeight: "800", 
        letterSpacing: 1.5 
    },

    chip: { 
        borderWidth: 1, 
        borderRadius: 999, 
        paddingHorizontal: 12, 
        paddingVertical: 5 
    },

    chipText: { 
        fontWeight: "800", 
        fontSize: 10, 
        letterSpacing: 0.5 
    },

    description: { 
        color: colors.textSecondary, 
        fontSize: 15, 
        fontWeight: "500", 
        lineHeight: 22 
    },

    divider: { 
        height: 1, 
        backgroundColor: colors.borderSubtle, 
        marginVertical: 12 
    },

    cardFooter: { 
        flexDirection: "row", 
        justifyContent: "space-between" 
    },

    dateText: { 
        color: colors.muted, 
        fontSize: 11 
    },

    idText: { 
        color: colors.muted, 
        fontSize: 11 
    },
});