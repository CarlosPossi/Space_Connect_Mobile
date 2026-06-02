import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { EventosScreen } from "../screens/EventosScreen";
import { AlertasScreen } from "../screens/AlertasScreen";
import { ModulosScreen } from "../screens/ModulosScreen";
import { SensoresScreen } from "../screens/SensoresScreen";
import { SistemasScreen } from "../screens/SistemasScreen";
import { CreateSensorScreen } from "../screens/CreateSensorScreen";
import { CreateSistemaScreen } from "../screens/CreateSistemaScreen";
import { CreateEventoScreen } from "../screens/CreateEventoScreen";
import { CreateModuloScreen } from "../screens/CreateModuloScreen";
import { CreateAlertaScreen } from "../screens/CreateAlertaScreen";

import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator();

export function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarLabelStyle: {
                        fontSize: 9,
                        fontWeight: "800",
                        letterSpacing: 0.5,
                        marginTop: 2,
                    },
                    tabBarStyle: {
                        backgroundColor: colors.tabBar,
                        position: "absolute",
                        height: 76,
                        borderTopWidth: 1,
                        borderTopColor: colors.borderStrong,
                        paddingBottom: 12,
                        paddingTop: 10,
                    },
                    tabBarActiveTintColor: colors.primary,
                    tabBarInactiveTintColor: colors.muted,
                    tabBarIcon: ({ focused, color }) => {
                        let iconName: any = "grid";

                        if (route.name === "Eventos")
                            iconName = focused ? "pulse" : "pulse-outline";
                        if (route.name === "Alertas")
                            iconName = focused ? "warning" : "warning-outline";
                        if (route.name === "Módulos")
                            iconName = focused ? "hardware-chip" : "hardware-chip-outline";
                        if (route.name === "Sensores")
                            iconName = focused ? "radio" : "radio-outline";
                        if (route.name === "Sistemas")
                            iconName = focused ? "planet" : "planet-outline";

                        return (
                            <View
                                style={
                                    focused
                                        ? { backgroundColor: colors.primaryDim, borderRadius: 10, padding: 5 }
                                        : { padding: 5 }
                                }
                            >
                                <Ionicons name={iconName} size={22} color={color} />
                            </View>
                        );
                    },
                })}
            >
                <Tab.Screen name="Eventos" component={EventosScreen} />
                <Tab.Screen name="Alertas" component={AlertasScreen} />
                <Tab.Screen name="Módulos" component={ModulosScreen} />
                <Tab.Screen name="Sensores" component={SensoresScreen} />
                <Tab.Screen name="Sistemas" component={SistemasScreen} />

                <Tab.Screen name="CreateSensor" component={CreateSensorScreen} options={{ tabBarButton: () => null, tabBarItemStyle: { display: "none" } }} />
                <Tab.Screen name="CreateEvento" component={CreateEventoScreen} options={{ tabBarButton: () => null, tabBarItemStyle: { display: "none" } }} />
                <Tab.Screen name="CreateSistema" component={CreateSistemaScreen} options={{ tabBarButton: () => null, tabBarItemStyle: { display: "none" } }} />
                <Tab.Screen name="CreateModulo" component={CreateModuloScreen} options={{ tabBarButton: () => null, tabBarItemStyle: { display: "none" } }} />
                <Tab.Screen name="CreateAlerta" component={CreateAlertaScreen} options={{ tabBarButton: () => null, tabBarItemStyle: { display: "none" } }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}