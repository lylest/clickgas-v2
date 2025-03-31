import {ElementType, FC} from "react";

export interface IEmpty {
    text: string,
    subText?: string
    Icon:ElementType
    onClick?:()=> void
    buttonLabel?:string
    ButtonIcon?:ElementType
    iconSize?: number
    iconColor?:string
}

const ErrorPage:FC<IEmpty> =(
    {
        text,
        Icon,
        subText,
        iconSize=100,
        iconColor="#9c9da2",
        buttonLabel,
        ButtonIcon,
        onClick
    })=> {
    return (
        <div className={"flex justify-center items-center h-screen"}>
            <div className={"w-1/3 grid place-items-center space-y-4"}>
                <div><Icon size={iconSize} color={iconColor} /></div>
                <p className={"font-bold text-xl text-red-700 text-center"}>{text}</p>
                <p className={"text-center text-slate-600"}>{ subText }</p>

                { buttonLabel  &&   <button onClick={()=> onClick && onClick()} type="button" className=" rounded-full bg-red-500 hover:bg-red/50 text-white ring-1 ring-inset ring-red-600/10 focus:ring-4 focus:outline-none focus:ring-red-700 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-red-500 dark:focus:ring-red-500 me-2 mb-2">
                    {ButtonIcon && <ButtonIcon  size={20} color={"#fff"}/>}
                    {buttonLabel}
                </button> }
            </div>
        </div>
    )
}

export default ErrorPage