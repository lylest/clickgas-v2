import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import logo from "../../assets/logo.svg"

export default function Header()  {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div  style={{ zIndex:99999999 }} className={`fixed top-0 border-b shadow-sm border-gray-100 w-full  transition duration-300 ease-in-out ${scrolled ? "bg-white shadow-sm":''}`} >
            <header className="flex justify-between container px-6 lg:px-6 max-w-8xl mx-auto py-4">
                <Link to={"/"}>
                    <div className={"flex gap-2"}>
                        <img src={logo} className={"size-6"} alt={"logo"}/>
                        <h1 className={"text-xl font-bold text-primary-600 "}>Huduma Cloud</h1>
                    </div>
                </Link>

            </header>
        </div>
    )
}
