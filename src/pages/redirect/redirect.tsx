import IosLoader from "@/components/loaders/ios/IosLoader.tsx";
import {useNavigate} from "react-router-dom";

const Redirect = () => {
    const navigate  = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirectUrl');
    const  withToken = urlParams.get('withToken');

    if (redirectUrl && withToken) {
        const token  = "thisshouldbeactualtoken"
        window.location.href = withToken === "yes" ? `${redirectUrl}?X-Huduma=${token}` : redirectUrl;
    } else {
        navigate("/")
       window.location.reload()
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex items-center justify-center h-screen">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                    <IosLoader/>
                </div>
            </div>
        </div>
    );
};

export default Redirect;

