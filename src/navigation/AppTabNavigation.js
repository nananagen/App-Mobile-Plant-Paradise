import AppStackNavigation from "./AppStackNavigation";
import Favorites from "../screens/Favorites";
import Cart from "../screens/Cart";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


export default function AppTabNavigation() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#000",
        inactiveTintColor: "#969595",
      }}
    >
      <Tab.Screen
        name="Home"
        component={AppStackNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <Ionicons name="home" color="#418B64" size={24} />;
            }

            return <Ionicons name="home-outline" color="#000" size={24} />;
          },
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <Ionicons name="heart" color="#418B64" size={24} />;
            }

            return <Ionicons name="heart-outline" color="#000" size={24} />;
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: "Cart",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <Ionicons name="cart" color="#418B64" size={24} />;
            }

            return <Ionicons name="cart-outline" color="#000" size={24} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
