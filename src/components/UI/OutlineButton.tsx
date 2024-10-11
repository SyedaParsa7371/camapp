import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import  Ionicons  from "react-native-vector-icons/Ionicons";
import { IOutlineButton } from "../../constant/interface";
import { Colors } from "../../constant/colors";

const OutlineButton:FC<IOutlineButton>=({icon,children, onPress})=> {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Ionicons style={styles.icon} name={icon} size={18} color={Colors.primary400} />
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    )
}

export default OutlineButton
const styles = StyleSheet.create({
    button:{
        paddingHorizontal:12,
        paddingVertical:6,
        margin:4,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:Colors.primary600,
        flexDirection:"row"
    },
    pressed:{
        opacity:0.7
    },
    icon:{
        marginRight:6,
        color:Colors.primary600
    },
    text:{
        color:Colors.primary600
    }
})