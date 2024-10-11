import React, { ReactNode } from "react"

export interface IPlaceList{
    places?:any
   
}
export interface IPlaceItem{
    place?:any
    onSelect?:()=>{}
}
export interface IIconButton{
    icon?:React.ReactNode
    color?:string
    size?:any
    onPress?:()=>void
}
export interface IOutlineButton{
    onPress?:()=>void
    icon?:React.ReactNode
    children?:ReactNode
}
export interface IButton{
    children?:ReactNode
    onPress?:()=>void
}