import React from 'react'
import {FC} from 'react'

const Button: FC<ButtonProps> = ({text}) => {
    return <button>{text}</button>
}

interface ButtonProps {
    text: string
}

export default Button
