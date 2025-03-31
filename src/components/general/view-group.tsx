/*
import {
 TbCalendar,
    TbChevronDown,
    TbChevronUp,
    TbMessage2Plus,
    TbSearch,
    TbUsers
} from "react-icons/tb";
import {HiXMark} from "react-icons/hi2";
import FullDivider from "@/components/divider/FullDivider.tsx";
import Badge from "@/components/Badge.tsx";
import MenuIcon from "@/components/menuitem/MenuIcon.tsx";
import {formatDate} from "@/utils";
import ClientCard from "@/components/ClientCard.tsx";
import {IClient} from "@/utils/types";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";


const ViewGroup = () => {
    function closeContact() {

    }

    const data: IClient[] = [
        {
            createdAt: "2024-05-21T03:15:02.997Z",
            updatedAt: "2024-05-21T03:15:02.997Z",
            id: 0,
            names: "John Doe",
            number: "123-456-7890",
            email: "john.doe@example.com"
        },
        {
            createdAt: "2024-05-21T03:16:02.997Z",
            updatedAt: "2024-05-21T03:16:02.997Z",
            id: 1,
            names: "Jane Smith",
            number: "234-567-8901",
            email: "jane.smith@example.com"
        },
        {
            createdAt: "2024-05-21T03:17:02.997Z",
            updatedAt: "2024-05-21T03:17:02.997Z",
            id: 2,
            names: "Alice Johnson",
            number: "345-678-9012",
            email: "alice.johnson@example.com"
        },
        {
            createdAt: "2024-05-21T03:18:02.997Z",
            updatedAt: "2024-05-21T03:18:02.997Z",
            id: 3,
            names: "Bob Brown",
            number: "456-789-0123",
            email: "bob.brown@example.com"
        },
        {
            createdAt: "2024-05-21T03:19:02.997Z",
            updatedAt: "2024-05-21T03:19:02.997Z",
            id: 4,
            names: "Carol White",
            number: "567-890-1234",
            email: "carol.white@example.com"
        },
        {
            createdAt: "2024-05-21T03:20:02.997Z",
            updatedAt: "2024-05-21T03:20:02.997Z",
            id: 5,
            names: "David Green",
            number: "678-901-2345",
            email: "david.green@example.com"
        },
        {
            createdAt: "2024-05-21T03:21:02.997Z",
            updatedAt: "2024-05-21T03:21:02.997Z",
            id: 6,
            names: "Emma Black",
            number: "789-012-3456",
            email: "emma.black@example.com"
        },
        {
            createdAt: "2024-05-21T03:22:02.997Z",
            updatedAt: "2024-05-21T03:22:02.997Z",
            id: 7,
            names: "Frank Blue",
            number: "890-123-4567",
            email: "frank.blue@example.com"
        },
        {
            createdAt: "2024-05-21T03:23:02.997Z",
            updatedAt: "2024-05-21T03:23:02.997Z",
            id: 8,
            names: "Grace Yellow",
            number: "901-234-5678",
            email: "grace.yellow@example.com"
        },
        {
            createdAt: "2024-05-21T03:24:02.997Z",
            updatedAt: "2024-05-21T03:24:02.997Z",
            id: 9,
            names: "Henry Orange",
            number: "012-345-6789",
            email: "henry.orange@example.com"
        },
        {
            createdAt: "2024-05-21T03:25:02.997Z",
            updatedAt: "2024-05-21T03:25:02.997Z",
            id: 10,
            names: "Isabella Taylor",
            number: "123-456-7890",
            email: "isabella.taylor@example.com"
        },
        {
            createdAt: "2024-05-21T03:26:02.997Z",
            updatedAt: "2024-05-21T03:26:02.997Z",
            id: 11,
            names: "Jack Martinez",
            number: "234-567-8901",
            email: "jack.martinez@example.com"
        },
        {
            createdAt: "2024-05-21T03:27:02.997Z",
            updatedAt: "2024-05-21T03:27:02.997Z",
            id: 12,
            names: "Karen Lee",
            number: "345-678-9012",
            email: "karen.lee@example.com"
        },
        {
            createdAt: "2024-05-21T03:28:02.997Z",
            updatedAt: "2024-05-21T03:28:02.997Z",
            id: 13,
            names: "Leo Brown",
            number: "456-789-0123",
            email: "leo.brown@example.com"
        },
        {
            createdAt: "2024-05-21T03:29:02.997Z",
            updatedAt: "2024-05-21T03:29:02.997Z",
            id: 14,
            names: "Mia Lopez",
            number: "567-890-1234",
            email: "mia.lopez@example.com"
        },
        {
            createdAt: "2024-05-21T03:30:02.997Z",
            updatedAt: "2024-05-21T03:30:02.997Z",
            id: 15,
            names: "Noah Harris",
            number: "678-901-2345",
            email: "noah.harris@example.com"
        },
        {
            createdAt: "2024-05-21T03:31:02.997Z",
            updatedAt: "2024-05-21T03:31:02.997Z",
            id: 16,
            names: "Olivia Clark",
            number: "789-012-3456",
            email: "olivia.clark@example.com"
        },
        {
            createdAt: "2024-05-21T03:32:02.997Z",
            updatedAt: "2024-05-21T03:32:02.997Z",
            id: 17,
            names: "Patrick Allen",
            number: "890-123-4567",
            email: "patrick.allen@example.com"
        },
        {
            createdAt: "2024-05-21T03:33:02.997Z",
            updatedAt: "2024-05-21T03:33:02.997Z",
            id: 18,
            names: "Quinn Parker",
            number: "901-234-5678",
            email: "quinn.parker@example.com"
        },
        {
            createdAt: "2024-05-21T03:34:02.997Z",
            updatedAt: "2024-05-21T03:34:02.997Z",
            id: 19,
            names: "Robert Turner",
            number: "012-345-6789",
            email: "robert.turner@example.com"
        },
        {
            createdAt: "2024-05-21T03:35:02.997Z",
            updatedAt: "2024-05-21T03:35:02.997Z",
            id: 20,
            names: "Samantha King",
            number: "123-456-7890",
            email: "samantha.king@example.com"
        }
    ]

    function groupDataAlphabetically(data: IClient[]): Record<string, IClient[]> {
        return data.reduce((acc, item) => {
            const firstLetter = item.names.charAt(0).toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(item);
            return acc;
        }, {} as Record<string, IClient[]>);
    }

    const groupedData = groupDataAlphabetically(data);
    return (
        <div
            className={"bg-neutral-50 dark:bg-neutral-800 rounded-xl ring-1 ring-inset ring-gray-200 dark:ring-neutral-700 overflow-hidden"}>
            <div className="flex p-2  justify-between">

                <div className={"flex p-2 items-center"}>
                    <button type="button"
                            className="px-2  py-2 font-normal rounded-full small-button">
                        <TbMessage2Plus size={15} className={"text-white  dark:text-neutral-300"}/>
                    </button>
                    <p className={"p-2  dark:text-neutral-300"}><span
                        className={"text-sm text-neutral-500 dark:text-neutral-400 "}>Created at </span>March 12,2024
                    </p>
                </div>

                <div className={"flex items-center gap-2"}>

                    <button type="button"
                            className="px-2  py-2 font-normal white-button">
                        <TbChevronDown size={15} className={"text-gray-600  dark:text-neutral-300"}/>
                    </button>

                    <button type="button"
                            className="px-2  py-2 font-normal white-button">
                        <TbChevronUp size={15} className={"text-gray-600  dark:text-neutral-300"}/>
                    </button>

                    <button type="button" onClick={() => closeContact()}
                            className="px-2  py-2 font-normal border-none white-button">
                        <HiXMark size={15} className={"text-gray-600  dark:text-neutral-300"}/>
                    </button>
                </div>
            </div>
            <FullDivider className={"dark:bg-neutral-800/50"}/>

            <div className={"px-6 py-6 bg-white dark:bg-neutral-700 space-y-4"}>
                <div className={"space-y-3"}>
                    <Badge label={"active"} type={"warning"}/>
                    <h1 className={"text-3xl font-bold dark:text-neutral-100"}>Book Club</h1>
                </div>

                <div className={"flex gap-2"}>
                    <MenuIcon label={"Send message"} Icon={TbMessage2Plus}/>
                    <MenuIcon label={"10 Members"} Icon={TbUsers}/>
                    <MenuIcon label={formatDate("30-2-2024")} Icon={TbCalendar}/>
                </div>
                <FullDivider className={"dark:bg-neutral-600"}/>

                <div className={""}>
                    <div
                        className="flex items-center  border-none border-gray-200 dark:border-neutral-600 px-4 py-3">
                        <TbSearch className="text-gray-400  dark:text-neutral-400 mr-2" size={20}/>
                        <input type="text" placeholder="Search"
                               className="text-neutral-800 dark:text-neutral-100 flex-grow outline-none focus:outline-none bg-inherit"/>
                    </div>
                    <ScrollArea style={{height: "70vh"}} className={"pr-3"}>
                        <div className={"space-y-2"}>
                            {Object.keys(groupedData).sort().map(letter => (
                                <div key={letter}>
                                    <h1 className={"text-neutral-500 dark:text-neutral-300 text-lg"}>{letter}</h1>
                                    {groupedData[letter].map(contact => (
                                        <ClientCard key={contact.id} contact={contact}/>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>


            </div>
        </div>
    )
}

export default ViewGroup*/
