import React from 'react';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProductBuyScreen, ProductFavoriteListScreen, AccountScreen } from '../screens';
import { HomeStackScreen } from './Stack/HomeStack';
import { TabParamList } from '../types/NavigationTypes';
import { CartProvider, useCart } from '../context/CartContext';

const Tab = createBottomTabNavigator<TabParamList>();

const getTabBarIcon = (routeName: string, focused: boolean, color: string, size: number) => {
    let iconName: string;

    switch (routeName) {
        case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
        case 'ProductBuy':
            iconName = focused ? 'cart' : 'cart-outline';
            break;
        case 'ProductFavorite':
            iconName = focused ? 'heart' : 'heart-outline';
            break;
        case 'AccountScreen':
            iconName = focused ? 'person' : 'person-outline';
            break;
        default:
            iconName = 'home-outline';
            break;
    }

    return <Ionicons name={iconName} size={size} color={color} />;
};

const HomeTabs: React.FC = () => {
    const { cartItemCount } = useCart();
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => getTabBarIcon(route.name, focused, color, size),
                tabBarLabel: ({ focused, color }) => null,
                headerShown: false,
                tabBarStyle: { backgroundColor: colors.background },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: '#888888',
            })}
        >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen
                name="ProductBuy"
                options={{
                    tabBarBadge: cartItemCount || undefined,
                }}
                component={ProductBuyScreen}
            />
            <Tab.Screen name="ProductFavorite" component={ProductFavoriteListScreen} />
            <Tab.Screen name="AccountScreen" component={AccountScreen} />
        </Tab.Navigator>
    );
};

const AppContainer: React.FC = () => {
    return (
        <NavigationContainer>
            <CartProvider>
                <HomeTabs />
            </CartProvider>
        </NavigationContainer>
    );
};

export default AppContainer;
