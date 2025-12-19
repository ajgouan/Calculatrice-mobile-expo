import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform } from "react-native";

export default function RootLayout() {
   useEffect(() => {
      if (Platform.OS === "android") {
         NavigationBar.setBackgroundColorAsync("#000000");
         NavigationBar.setButtonStyleAsync("light");
      }
   }, []);

   return (
      <>
         <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
         </Stack>
         <StatusBar style="auto" />
      </>
   );
}
