import {Outlet} from "react-router-dom";
import {useGlobalContextHook} from "@/hook/useGlobalContextHook.tsx";
import MinSideNav from "@/components/sidernav/MinSideNav.tsx";
import TopNav from "@/components/TopNav";
import SiderNav from "@/components/sidernav/SiderNav.tsx";


const MainLayout = () => {
    const { state } = useGlobalContextHook()
    const { isSideNavClosed } = state

    return (
        <main
            className={'custom-transition h-screen flex bg-[#EFF1F4] dark:bg-neutral-900'}>
            <div className={"hidden lg:block"}>
                { isSideNavClosed ? <MinSideNav/> : <SiderNav />}
            </div>
            <section className={`custom-transition ${ isSideNavClosed ? "flex-1  w-full ml-[0%] lg:w-[90%] lg:ml-[6%] ":
                "flex-1  w-full ml-[0%] lg:w-[82%] lg:ml-64"}`}>
                <section className={"flex-1 bg-[#EFF1F4]  dark:bg-neutral-900 overflow-hidden custom-transition"}>
                    <TopNav />
                    <Outlet />
                </section>
            </section>
        </main>
    )
}

export default MainLayout
