import {Outlet} from "react-router-dom";
import TabLinks, {ITabLink} from "@/components/general/Tab.tsx";
import PageFit from "@/components/general/PageFit.tsx";
import {permissions} from "@/pages/permissions-manager/check-permission.ts";
import {useFilteredTabs} from "@/pages/permissions-manager/filter-tabs.ts";


const Settings = () => {

    const getTabs = (): ITabLink [] => [
        {
            name: "Account",
            url: "/settings/account",
            pattern: new RegExp("^/settings/account*"),
            permission:permissions.GET_ORDERS,
        },
        {
            name: "Roles",
            url: "/settings/roles",
            pattern: new RegExp("/settings/roles*"),
            permission:permissions.GET_ROLES,
        },
        {
            name: "Permissions",
            url: "/settings/permissions",
            pattern: new RegExp("/settings/permissions*"),
            permission:permissions.GET_ROLES,
        },
    ]

    const filteredTabs = useFilteredTabs(getTabs())

    return (
        <>
            <PageFit>
                <br />
                <div className={"bg-neutral-50 border border-gray-200  dark:bg-neutral-800 rounded-[6px]  space-y-3"}>
                    <div className={"px-5 py-4"}><h1 className={"text-xl font-bold dark:text-neutral-50"}>Settings</h1>
                        <p className={"text-gray-600  dark:text-neutral-300"}>Customize preferences to suit your
                            needs.</p></div>

                    <TabLinks tabs={filteredTabs} />
                    <div className={"px-5 py-6"}><Outlet/></div>
                </div>
            </PageFit>
        </>
    )
}

export default Settings
