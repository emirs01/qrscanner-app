import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import "./global.css";
import AppNavigator from './src/navigation/AppNavigator';


// 
//   Created BY emirs 
//  
//!  Github 
//   emirs01 
//
//! Discord
//  emirs1
//
//! WebSite
// https://emirsdev.netlify.app/
//


export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto"  />
      <AppNavigator />
    </View>
  );
}
