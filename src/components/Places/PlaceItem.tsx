import { FC } from "react";
import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { IPlaceItem } from "../../constant/interface";
import { Colors } from "../../constant/colors";

const PlaceItem: FC<IPlaceItem> = ({ place, onSelect }) => {
    console.log("PlaceItem received place:", place); // Add logging to check received data

    return (
        <TouchableOpacity onPress={onSelect?.bind(this, place.id)}>
            <View style={styles.item}>
                <Image style={styles.image} source={{ uri: place.sourceUri }} />
                <View style={styles.info}>
                    <Text style={styles.title}>{place.title}</Text>
                    <Text style={styles.address}>{place.address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default PlaceItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.primary500,
        elevation: 2,
        margin: 8,
    },
    image: {
        height: 100,
        width: 100,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
    },
    info: {
        flex: 2,
        padding: 18,
    },
    title: {
        color: '#363333',
        fontWeight: 'bold',
    },
    address: {
        color: '#363333',
        fontSize: 12,
    },
});
