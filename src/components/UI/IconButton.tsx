import { FC } from "react"
import { Pressable, TouchableOpacity } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { IIconButton } from "../../constant/interface"


const IconButton:FC<IIconButton>=({color,size,icon,onPress})=> {
    return (
        <TouchableOpacity onPress={onPress}>
            <Ionicons color={color} name={icon} size={size}/>
        </TouchableOpacity>
    )
}
export default IconButton