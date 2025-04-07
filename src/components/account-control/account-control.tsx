
import { FC, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { GlobalContext } from '@/context/GlobalContext';
import { TbLogout, TbUser, TbChevronDown } from 'react-icons/tb';
import {useLogout} from "@/pages/login/queries.ts";
import {LucideUser} from "lucide-react";


interface UserAvatarProps {
    className?: string;
}

const UserControl: FC<UserAvatarProps> = ({ className = '' }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { state, } = useContext(GlobalContext);
    const user = state.currentUser;

    function handleLogoutSuccess() {
        navigate("/")
        window.location.reload();
    }

    const { mutate:logoutMutation } = useLogout({ onSuccess: handleLogoutSuccess })
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className={`flex items-center justify-between w-full max-w-xs p-2 bg-gray-100 border border-gray-200/70 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}>
                <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-neutral-700">
                        <LucideUser className={"size-4"} />
                    </div>
                    <div className="ml-2 text-left">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                            {user ? `${user.firstName ?? user?.userName} ${user.lastName || ''}` : 'User'}
                        </p>
                        {user && (
                            <p className="text-xs text-gray-500">
                                {user.email || 'No email'}
                            </p>
                        )}
                    </div>
                </div>
                <TbChevronDown className="w-5 h-5 text-gray-500" />
            </PopoverTrigger>

            <PopoverContent className="w-56 p-0 border border-gray-200">
                <div className="py-2">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                        User Settings
                    </div>

                    <div className="border-t border-gray-200">
                        <button
                            onClick={() => {
                                navigate('/profile');
                                setOpen(false);
                            }}
                            className="flex items-center w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none"
                        >
                            <TbUser className="w-4 h-4 mr-2"/>
                            Profile Settings
                        </button>

                        <button
                            onClick={() =>logoutMutation()}
                            className="flex items-center w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100 focus:outline-none"
                        >
                            <TbLogout className="w-4 h-4 mr-2"/>
                            Logout
                        </button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default UserControl;