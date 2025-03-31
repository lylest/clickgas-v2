import {FC} from "react";
import {RadioGroup} from "@headlessui/react";

export interface IRadioButton {
    title: string;
    subtitle: string;
    rightTitle?: string | undefined;
    isChecked?:boolean;
}

const RadioButton: FC<IRadioButton> = ({title, subtitle, rightTitle }) => {
    return (
        <RadioGroup.Option
            value={title.toLowerCase()}
            className={"rounded-xl hover:cursor-pointer "}>
            {({checked}) => (
                <div
                    className={`items-between  rounded-xl ${
                        checked
                            ? "group-active:border-primary"
                            : "border-primary-200"
                    }  py-2 mt-4`}
                >

                    <div className={"flex gap-3"}>
                            <input  type="radio" checked={checked}  onChange={() => {console.log(checked)}}  className="custom-transition w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                        <div className={"space-y-1"}>
                            <p
                                className={
                                    "text-sm/none font-medium text-slate-950"
                                }>
                                {title}
                            </p>
                            <small className={"text-gray-600"}>
                                {subtitle}
                            </small>
                        </div>
                    </div>

                    <p className={"text-lg text-primary  font-medium"}>
                        {rightTitle}
                    </p>
                </div>
            )}
        </RadioGroup.Option>
    );
};

export  default  RadioButton