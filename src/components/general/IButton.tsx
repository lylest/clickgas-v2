
import {ButtonHTMLAttributes, ElementType, FC, forwardRef} from "react";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    Icon:ElementType
    onClick:()=> void
    color?:string

}

const IButton: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>((props) => {
const { onClick,Icon, color = "#666" } = props
    return (
        <button  onClick={()=> onClick&& onClick()} type="button" className="text-primary-700  hover:text-white focus:ring-1 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm p-2.5 text-center grid place-items-center">
            {<Icon size={24} color={color} />}
        </button>
    );
});

export default IButton;