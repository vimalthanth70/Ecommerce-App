import React from 'react'
import {Button} from '@repo/ui'

type VariantType = "default" | "destructive" | "ghost" | "link" | "outline" | "secondary"

export function CustomButton({children,clickHandler,variant,className}:{children:string,clickHandler?:()=>void,variant:VariantType,className:string}) {
  return (
    <Button className={className} variant={variant} onClick={clickHandler}>{children}</Button>
  )
}
