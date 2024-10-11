import { NativeStackScreenProps } from "@react-navigation/native-stack"
import PlaceForm from "../components/Places/PlaceForm"
import { NavigationAction } from "@react-navigation/native"
import { insertPlace } from "../util/database"


function AddPlace({navigation}:NavigationAction) {
   async function createPlaceHandler(place) {
       await insertPlace(place)
         navigation.navigate('AllPlaces',
            { place:place}
        )
    }
    return <PlaceForm onCreatePlace={createPlaceHandler}/> 
}
export  default AddPlace
