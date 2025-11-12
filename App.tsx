import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ViewStyle, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from 'src/components/screens/HomeScreen';
import KasiaScreen from 'src/components/screens/KasiaScreen';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from "react";




const Tab = createBottomTabNavigator();


// export const handleKasiaTap = () => {
//   setKasiaTaps(prev => prev + 1);
// }


export default function App() {
  // const [kasiaTaps, setKasiaTaps] = useState(0);
  const [showKasiaTab, setShowKasiaTab] = useState(false);

  // useEffect(() => {
  //   if (kasiaTaps >= 5) {
  //     setShowKasiaTab(true)
  //   }

  // }, [kasiaTaps])


  

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ setShowKasiaTab }}
          options={{ 
            tabBarLabel: 'Home',
            tabBarIcon: () => (
              <Ionicons name="home-outline" size={24} color="#007AFF" />
            )
          }}
          // kasiaTaps={handleKasiaTap()}
        />
        {showKasiaTab && (
          <Tab.Screen
            name="Kasia"
            component={KasiaScreen}
            options={{ 
              tabBarLabel: 'Kasias',
              tabBarIcon: () => (
                <Ionicons name="people-circle-outline" size={24} color="#007AFF" />
              )
            }}
          />
        )}
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}