import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLoginQuery } from "@/pages/login/queries.ts";
import logo from "../../assets/logo.svg";
import IosLoader from "@/components/loaders/ios/IosLoader.tsx";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const userSchema = Yup.object({
        userId: Yup.string().required().min(4, "Please provide a valid user id"),
        password: Yup.string().required().min(4, "Password length must be at least 6 characters")
    });

    type LoginFieldsValues = Yup.InferType<typeof userSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(userSchema),
    });

    const onSubmit = (formValues: LoginFieldsValues) => {
        loginMutation(formValues);
    };

    const handleSuccess = () => {
        navigate("/");
        window.location.reload();
    };

    const { mutate: loginMutation, isPending } = useLoginQuery({ onSuccess: handleSuccess });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-neutral-900">
            {/* Left side - Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col p-4 md:p-8 lg:p-10">
                <div className="w-full max-w-md mx-auto flex-grow flex flex-col justify-center">
                    <div className="flex items-center mb-8">
                        <img src={logo} alt="Click Gas Logo" className="w-10 h-10" />
                        <h1 className="text-2xl font-bold ml-2">Click Gas</h1>
                    </div>


                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="userId"
                                type="text"
                                placeholder="info@gmail.com"
                                className={`w-full px-4 py-2.5 rounded-lg border ${errors.userId ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'} focus:border-blue-500 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
                                {...register("userId")}
                            />
                            {errors.userId && (
                                <p className="mt-1 text-sm text-red-500">{errors.userId.message}</p>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <button
                                    type="button"
                                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'} focus:border-blue-500 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                Keep me logged in
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none text-white font-medium rounded-lg py-3 px-4 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                        >
                            {isPending ? (
                                <div className="flex items-center justify-center">
                                    <span>Signing in</span>
                                    <IosLoader />
                                </div>
                            ) : (
                                "Sign in"
                            )}
                        </button>

                        <div className="text-center mt-6">
                            <p className="text-gray-600 dark:text-gray-400">
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate('/supplier/login')}
                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                                >
                                    Login as supplier
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right side - Brand/Info Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-blue-900 relative">
                <div className="absolute inset-0 bg-opacity-30 grid place-items-center">
                    <div className="text-center p-8">
                        <div className="flex justify-center mb-3">
                            <div className="bg-white/10 p-3 rounded-lg">
                                <img src={logo} alt="Click Gas Logo" className="w-12 h-12" />
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-2">Click Gas</h2>
                        <p className="text-white/80 text-lg max-w-md mx-auto">
                            Your trusted partner for safe and reliable gas delivery service
                        </p>
                    </div>
                </div>

                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="h-full w-full grid grid-cols-12 grid-rows-12">
                        {Array.from({ length: 144 }).map((_, i) => (
                            <div key={i} className="border border-white/20"></div>
                        ))}
                    </div>
                </div>

                {/* Dark Mode Toggle - Bottom Right */}
                <div className="absolute bottom-4 right-4">
                    <button className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors">
                        <span className="sr-only">Toggle dark mode</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;