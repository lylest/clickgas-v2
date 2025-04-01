import {Link, Outlet, useNavigate} from "react-router-dom";
import {AlertContainer, useAlerts} from "@/Providers/Alert";
import Badge from "@/components/general/Badge.tsx";
import {TextInput} from "@/components/form-control";
import {TbPlus} from "react-icons/tb";
import {useState} from "react";
import PageFit from "@/components/general/PageFit.tsx";
import {useGetRoles, useRemoveRole} from "@/pages/settings/tabs/roles/role-queries.ts";
import RoleCard from "@/components/cards/role-card.tsx";
import {IRole} from "@/types/role";
import Pagination from "@/components/pagination.tsx";


const Roles =()=> {
    const {confirm} = useAlerts();
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const navigate = useNavigate();

    const { data:roles } = useGetRoles(pageNumber, pageSize, keyword);


    async function handleDelete(row: IRole) {
        const confirmed = await confirm({
            title: "Confirm deletion",
            message: `Please make sure you want to remove this role: ${row.name}?`,
            type: "danger"
        });
        if (confirmed) {
           removeRoleMutation(row.id)
        }
    }

const { mutate: removeRoleMutation } = useRemoveRole()

    return (
        <>
            <Outlet/>
            <PageFit>
                <AlertContainer/>

                <div className="flex justify-between py-1 flex-wrap gap-5">
                    <div className={"space-y-1"}>
                        <div className={"flex items-center gap-2"}>
                            <h1 className={"text-neutral-800 text-lg font-medium dark:text-neutral-200"}>Roles</h1>
                            <Badge label={`total`} type={"secondary"}/>
                        </div>
                        <p className={"text-xs text-neutral-600 dark:text-neutral-500"}>Manage, create, edit and
                            delete</p>
                    </div>

                    <div className={"flex gap-4 items-center"}>
                        <TextInput placeholder={"Search"} value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
                        <Link to={"form/add"}>
                            <button type="button"
                                    className="py-[10px] px-3 text-[0px] lg:text-sm items-center rounded-lg small-button">
                                <TbPlus size={20}/>Add role
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
                    {roles?.data.map((role) => (
                        <RoleCard
                            key={role.id}
                            item={role}
                            onView={() => navigate(`details/${role.id}`)}
                            onEdit={()=> navigate(`form/edit`,{ state: role })}
                            onDelete={() => handleDelete(role)}
                        />
                    ))}
                </div>
                <Pagination
                    showPageSizeSelector={true}
                    showPagesList={true}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    page={pageNumber}
                    setPage={setPageNumber}
                    totalPages={roles?.metadata?.totalPages}/>
            </PageFit>
        </>
    )
}

export default Roles;