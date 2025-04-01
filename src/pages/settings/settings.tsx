import {Outlet} from "react-router-dom";
import TabLinks, {ITabLink} from "@/components/general/Tab.tsx";
import PageFit from "@/components/general/PageFit.tsx";


const Settings = () => {

    const getTabs = (): ITabLink [] => [
        {
            name: "Account",
            url: "/settings/account",
            pattern: new RegExp("^/settings/account*"),
        },
        {
            name: "Roles",
            url: "/settings/roles",
            pattern: new RegExp("/settings/roles*"),
        },
        {
            name: "Permissions",
            url: "/settings/permissions",
            pattern: new RegExp("/settings/permissions*"),
        },

    ]

    return (
        <>
            <PageFit>
                <br />
                <div className={"bg-neutral-50 border border-gray-200  dark:bg-neutral-800 rounded-[6px]  space-y-3"}>
                    <div className={"px-5 py-4"}><h1 className={"text-xl font-bold dark:text-neutral-50"}>Settings</h1>
                        <p className={"text-gray-600  dark:text-neutral-300"}>Customize preferences to suit your
                            needs.</p></div>

                    <TabLinks tabs={getTabs()}/>
                    <div className={"px-5 py-6"}><Outlet/></div>
                </div>
            </PageFit>
        </>
    )
}

export default Settings
