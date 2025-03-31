import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Link, useLocation} from "react-router-dom";
import {BreadItem} from "@/utils";
import {FC} from "react";

interface Props {
    items:BreadItem[]
}

const BreadCrumbTab:FC<Props> =({ items })=> {
    const { pathname } = useLocation()

    return (
        <Breadcrumb className={"w-full flex"}>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <>
                        <BreadcrumbItem>
                            {index === items.length - 1 ?
                                <Link to={item.link} className={"text-primary-500"}>{item.label}</Link> :
                                <Link to={item.link}>{item.label}</Link>
                            }
                        </BreadcrumbItem>
                        {item?.link !== pathname ? <BreadcrumbSeparator />: null }
                    </>
                ))}
            </BreadcrumbList>
        </Breadcrumb>

    )
}


export default BreadCrumbTab