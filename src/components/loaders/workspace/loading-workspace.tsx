import {useEffect, useState} from "react";


const LoadingWorkspace = () => {
    const words = ["branches", "loans", "clients", "groups", "loans", "repayments","staffs","settings", "profile"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dotCount, setDotCount] = useState(0);
    const [loading,/* setLoading*/] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            if (loading) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
                setDotCount((prevDotCount) => (prevDotCount + 1) % 4);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [loading, words.length]);


    return (
        <>
            {words[currentIndex]}{"." .repeat(dotCount)}
        </>
    )
}

export default LoadingWorkspace