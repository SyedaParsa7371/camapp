import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constant/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./locationsdummy";
import Button from "../UI/Button";
import { Place } from "../models/places";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [pickedLocation, setPickedLocation] = useState<{
    address: string;
    lat: number;
    lng: number;
  } | null>(null); 

  function changeTitleHandler(enteredTitle: string) {
    setEnteredTitle(enteredTitle);
  }

  function takeImageHandler(sourceUri: string) {
    setSelectedImage(sourceUri);
  }

  const pickLocationHandler = useCallback((location: { address: string; lat: number; lng: number }) => {
    setPickedLocation(location); 
  }, []);

  function savePlaceHandler() {
    if (!enteredTitle || !selectedImage || !pickedLocation) {
  
      console.warn("Please fill in all fields!");
      return;
    }

    const placeData = new Place(
      enteredTitle,
      selectedImage,
      pickedLocation 
    );

    console.log("Saving place:", placeData);
    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={changeTitleHandler} />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary600,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
