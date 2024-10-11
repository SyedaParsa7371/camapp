import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlaceList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";
import { Place } from "../components/models/places";

function AllPlaces() {
    const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
          loadPlaces();
        }
      }, [isFocused]);
      
      async function loadPlaces() {
        try {
          const places = await fetchPlaces();
          console.log("Loaded places:", places); // Log the loaded places
          setLoadedPlaces(places);
        } catch (error) {
          console.error("Error loading places:", error);
        }
      }
      

    return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
