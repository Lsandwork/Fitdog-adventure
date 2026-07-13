import { SymbolView } from 'expo-symbols';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF8C42',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#F0E6D8' },
        headerStyle: { backgroundColor: '#FFF8F0' },
        headerTitleStyle: { fontWeight: '700', color: '#333' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: 'house.fill', android: 'home', web: 'home' }} tintColor={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="play"
        options={{
          title: 'Play',
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: 'gamecontroller.fill', android: 'sports_esports', web: 'sports_esports' }} tintColor={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: 'map.fill', android: 'map', web: 'map' }} tintColor={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: 'bag.fill', android: 'shopping_bag', web: 'shopping_bag' }} tintColor={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Pup',
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: 'pawprint.fill', android: 'pets', web: 'pets' }} tintColor={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
