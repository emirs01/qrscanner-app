import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import LoginPage1 from "../screens/LoginPage1";
import LoginPage2 from "../screens/LoginPage2";
import CamPage from "../screens/CamPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="CamPage" component={CamPage} />
        <Stack.Screen name="LoginPage1" component={LoginPage1} />
        <Stack.Screen name="LoginPage2" component={LoginPage2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

