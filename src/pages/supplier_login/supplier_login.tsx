import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSupplierLoginQuery } from "@/pages/login/queries.ts";
import logo from "../../assets/logo.svg";
import IosLoader from "@/components/loaders/ios/IosLoader.tsx";
import { Eye, EyeOff, ChevronLeft, Truck, Building } from "lucide-react";
import { useState } from "react";

const SupplierLogin = () => {
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
        loginMutation({
            authId: formValues.userId,
            password: formValues.password,
        });
    };

    const handleSuccess = () => {
        navigate("/");
        window.location.reload();
    };

    const { mutate: loginMutation, isPending } = useSupplierLoginQuery({ onSuccess: handleSuccess });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-neutral-900">
            {/* Left side - Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col p-4 md:p-8 lg:p-10">
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
                    >
                        <ChevronLeft size={20} />
                        <span className="ml-1">Back to dashboard</span>
                    </button>
                </div>

                <div className="w-full max-w-md mx-auto flex-grow flex flex-col justify-center">
                    <div className="flex items-center mb-8">
                        <div className="flex items-center">
                            <img src={logo} alt="Click Gas Logo" className="w-10 h-10" />
                            <h1 className="text-2xl font-bold ml-2">Click Gas</h1>
                        </div>
                        <div className="ml-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <Building size={14} className="mr-1" />
                            Supplier Portal
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Supplier Sign In</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Access your supplier dashboard to manage inventory and orders</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email or Supplier ID <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="userId"
                                type="text"
                                placeholder="supplier@company.com"
                                className={`w-full px-4 py-2.5 rounded-lg border ${errors.userId ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-green-500'} focus:border-green-500 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
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
                                    className="text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-green-500'} focus:border-green-500 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
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
                                className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                Keep me logged in
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none text-white font-medium rounded-lg py-3 px-4 transition-colors dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                        >
                            {isPending ? (
                                <div className="flex items-center justify-center">
                                    <span>Signing in</span>
                                    <IosLoader />
                                </div>
                            ) : (
                                "Sign in to Supplier Portal"
                            )}
                        </button>

                        <div className="text-center mt-6">
                            <p className="text-gray-600 dark:text-gray-400">
                                Not a supplier?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium"
                                >
                                    Login as admin
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right side - Brand/Info Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-green-800 relative">
                <div className="absolute inset-0 bg-opacity-30 grid place-items-center">
                    <div className="text-center p-8">
                        <div className="flex justify-center mb-3">
                            <div className="bg-white/10 p-3 rounded-lg">
                                <Truck size={48} className="text-white" />
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-2">Supplier Dashboard</h2>
                        <p className="text-white/80 text-lg max-w-md mx-auto">
                            Manage your gas supply, track deliveries, and grow your business with Click Gas
                        </p>

                        <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
                            <div className="bg-white/10 rounded-lg p-4">
                                <h3 className="text-xl font-bold text-white">Efficient</h3>
                                <p className="text-white/70 text-sm">Streamlined order management</p>
                            </div>
                            <div className="bg-white/10 rounded-lg p-4">
                                <h3 className="text-xl font-bold text-white">Simple</h3>
                                <p className="text-white/70 text-sm">Easy inventory tracking</p>
                            </div>
                            <div className="bg-white/10 rounded-lg p-4">
                                <h3 className="text-xl font-bold text-white">Secure</h3>
                                <p className="text-white/70 text-sm">Protected transaction system</p>
                            </div>
                        </div>
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

export default SupplierLogin;