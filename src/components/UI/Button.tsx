import { FC } from "react"
import { StyleSheet, Text, Touchable, TouchableOpacity } from "react-native"
import { IButton } from "../../constant/interface"
import { Colors } from "../../constant/colors"

const Button:FC<IButton>=({onPress,children})=>{

    return(
        <TouchableOpacity onPress={onPress}  style={styles.button}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    )
}
export default Button

const styles=StyleSheet.create({
    button:{
        paddingHorizontal:12,
        paddingVertical:8,
        margin:4,
        backgroundColor:Colors.primary600,
        elevation:4
    },
    text:{
        textAlign:'center',
        fontSize:16,
        color:Colors.primary50
    }
})