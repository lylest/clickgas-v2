import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid";

const UnderDevelopmentIndicator = () => {
    return (
        <div
            style={{ zIndex: 999999999999999 }}
            className={"center fixed top-0 w-full"}
        >
            <div
                className={
                    "flex w-fit items-center gap-3 rounded-b-xl bg-primary-500 px-5 py-2 text-sm text-primary-100"
                }
            >
                <WrenchScrewdriverIcon
                    className={"size-4 animate-pulse duration-700"}
                />
                <span className={""}>You are viewing unfinished work.</span>
            </div>
        </div>
    );
};
export default UnderDevelopmentIndicator;