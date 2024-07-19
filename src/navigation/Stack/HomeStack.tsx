import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, ProductDetailScreen } from "../../screens";
import { RootStackParamList } from "../../types/NavigationTypes"

const HomeStack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
    headerShown: true,
    headerTitleAlign: 'center' as const,
};

export function HomeStackScreen() {
    return (
        <HomeStack.Navigator screenOptions={screenOptions}>
            <HomeStack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
            />
        </HomeStack.Navigator>
    );
}
