import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import AllPlaces from "./src/screens/AllPlaces";
import AddPlace from "./src/screens/AddPlace";
import IconButton from "./src/components/UI/IconButton";
import { Colors } from "./src/constant/colors";
import Map from "./src/screens/map";
import { useEffect, useState } from "react";
import { init } from "./src/util/database";  // Correct import
import LoaderKit from 'react-native-loader-kit';
import PlaceDetails from "./src/screens/PlaceDetails";

const Stack = createNativeStackNavigator();

function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialized) {
    return ( 
      <LoaderKit
        style={{ width: 50, height: 50 }}
        name={'BallPulse'}
        color={'red'}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary300,
          },
        }}
      >
        <Stack.Screen
          name="AllPlaces"
          component={AllPlaces}
          options={({ navigation }) => ({
            title: 'Your Favorite Place',
            headerRight: ({ tintColor }: any) => (
              <IconButton
                icon="add"
                size={24}
                color={tintColor}
                onPress={() => navigation.navigate('AddPlaces')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddPlaces"
          component={AddPlace}
          options={{
            title: 'Add a new place',
          }}
        />
          <Stack.Screen
          name="PlaceDetails"
          component={PlaceDetails}
          options={{
            title: 'Add a new place',
          }}
        />
        <Stack.Screen name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
