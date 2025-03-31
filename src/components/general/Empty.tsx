import {ElementType, FC} from "react";

export interface IEmpty {
    text: string,
    subText?: string
    Icon: ElementType
    onClick?: () => void
    buttonLabel?: string
    ButtonIcon?: ElementType
    iconSize?: number
    iconColor?: string
}

const Empty: FC<IEmpty> = (
    {
        text,
        Icon,
        subText,
        iconSize = 60,
        buttonLabel,
        ButtonIcon,
        onClick
    }) => {
    return (
        <div className={"flex justify-center items-center "}>
            <div className={"px-6 lg:px-20 lg:w-1/2 grid place-items-center space-y-2"}>
                <div><Icon size={iconSize}  strokeWidth={0.5} className={"text-gray-400 dark:text-neutral-500"}/></div>
                <div className={"space-y-1"}>
                    <p className={"font-medium text-sm text-gray-600 dark:text-neutral-300 text-center"}>{text}</p>
                    <p className={"text-center text-xs text-slate-600 dark:text-neutral-500"}>{subText}</p>
                </div>

                {buttonLabel && <button type="button" onClick={() => onClick && onClick()}
                                        className="ring-offset px-2 py-1  text-xs ring-1 ring-primary-600 rounded-[6px] text-white bg-primary hover:bg-primary/80 focus:ring-4 focus:outline-none focus:ring-primary/50  text-center inline-flex items-center dark:hover:bg-primary/80 dark:focus:ring-primary/40 me-2 mb-2">
                    {ButtonIcon && <ButtonIcon size={20} color={"#fff"}/>}
                    {buttonLabel}
                </button>}
            </div>
        </div>
    )
}

export default Empty