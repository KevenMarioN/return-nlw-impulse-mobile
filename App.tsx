import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_400Regular,Inter_500Medium } from '@expo-google-fonts/inter';

import Widget from './src/components/Widget';
import { theme } from './src/theme';
import { useCallback } from 'react';

export default function App() {
  const onLayout = useCallback(async () => {
    await SplashScreen.hideAsync();
  },[])
  const [fontsLoaded] = useFonts({
   Inter_400Regular,Inter_500Medium
  });

  if (!fontsLoaded) {
    onLayout();
  }

  return (
    <SafeAreaView style={{
      flex : 1,
      backgroundColor : theme.colors.background}}>
     <StatusBar
     style='light'
     backgroundColor='transparent'
     translucent/>
     <Widget />
    </SafeAreaView>
  );
}
