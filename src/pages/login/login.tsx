import logo from "../../assets/logo.svg"
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import generateFormField, {IFormField} from "@/utils/generate-form-field.tsx";
import IosLoader from "@/components/loaders/ios/IosLoader.tsx";
import {useLoginQuery} from "@/pages/login/queries.ts";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate()
    const userSchema = Yup.object({
        userId: Yup.string().required().min(4, "Please provide a valid user id"),
        password: Yup.string().required().min(4, "Password length must be at least 6 characters")
    });

    type LoginFieldsValues = Yup.InferType<typeof userSchema>;

    const {
        formState: {errors},
        register,
        handleSubmit
    } = useForm({
        resolver: yupResolver(userSchema),
    });

    const FormFields: IFormField[] = [
        {
            register,
            name: "userId",
            placeholder: "user@mail.com",
            label: "Email or phone",
            type: "text",
            wrapperClass: "col-span-3",
            className: "resize-none col-span-2",
            hasError: !!errors.userId?.message,
            showErrorMessage: !!errors?.userId?.message,
            errorMessage: errors.userId?.message,
        },
        {
            register,
            name: "password",
            label: "Password",
            wrapperClass: "col-span-3",
            className: "resize-none col-span-2",
            placeholder: "********",
            type: "password",
            hasError: !!errors.password?.message,
            showErrorMessage: !!errors.password?.message,
            errorMessage: errors.password?.message,
        },
    ]

    const onSubmit = (formValues: LoginFieldsValues) => {
        loginMutation(formValues)
    }

    const handleSuccess = () => {
        navigate("/")
        window.location.reload()
    }

    const {mutate: loginMutation, isPending} = useLoginQuery({onSuccess: handleSuccess})

    function handleNavigate() {
        navigate("/signup");
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200 dark:bg-neutral-900">
            <div
                className={"w-10/12 lg:w-4/12  bg-neutral-50 h-[auto] dark:bg-neutral-800 rounded-xl overflow-hidden drop-shadow-sm"}>
                <div
                    className={"border-b-[1px]  h-20 grid place-items-center border-gray-200 dark:border-neutral-700 w-full"}>
                    <div className={"flex gap-1 space-y-2"}>
                        <img src={logo} alt={"logo"} className={"size-10"}/>
                        <h1 className={"text-2xl font-bold"}>Click Gas</h1>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}
                      className={"sm:gap-5 py-6 sm:py-6 px-6 sm:px-12 space-y-4 bg-white"}>
                    <div className={"space-y-1"}>
                        <h1 className={"text-2xl font-bold text-neutral-900"}>Login</h1>
                        <p className={"text-gray-600 text-sm"}>Enter your details below and login in your account</p>
                    </div>

                    <div className={"full grid grid-cols-3 gap-4 space-y-1 py-4"}>
                        {FormFields.map((field) => generateFormField(field))}
                    </div>
                    <button disabled={isPending}
                            className={"small-button w-full px-2 py-3 grid place-items-center  font-bold"}>
                        <div> Login{isPending && <IosLoader/>}</div>
                    </button>

                    <div className={"flex flex-wrap -space-y-3 px-6 py-3"}>
                        <p className={"text-gray-600 text-sm"}>Don't have an account?</p>
                        <button type="button" onClick={handleNavigate}
                                className="button-link text-underline">
                           Signup here
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
