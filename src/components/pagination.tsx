import {TbChevronLeft, TbChevronRight} from "react-icons/tb";
import {FC} from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import {IPagination} from "@/types/pagination";

const Pagination: FC<IPagination> = (
    {
        onPageSizeChange,
        setPage,
        page,
        totalPages = 1,
        pageSize,
        setPageSize,
        showPagesList,
        showPageSizeSelector
    }) => {

    const pageSizes = [1, 2, 3, 5, 8, 10, 12, 15, 20, 30, 40, 50, 60, 70, 80, 100, 150, 200, 250, 300, 500, 1000];
    const pageSizesAsStrings = pageSizes.map(size => size.toString());

    const handlePrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <div
            className="flex bg-gray-50 dark:bg-neutral-600/30  justify-between p-3 border-t dark:border-neutral-700/50 border-gray-200">
            <nav className="flex -space-x-px">
                <button
                    type="button"
                    disabled={page <= 1}
                    onClick={handlePrevious}
                    className="py-0 px-2.5 gap-x-1.5 text-xs first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                >
                    <TbChevronLeft size={14}/>
                    {/* <span className="hidden sm:block">Previous</span> */}
                </button>

                <div className="flex border border-gray-200 dark:border-neutral-700 text-gray-800 dark:text-white">
                    <p className="text-xs px-2 py-3">Page</p>
                    <p className="text-xs px-2 py-3 dark:border-neutral-700 text-gray-800 dark:text-white"> {page} of {totalPages}</p>
                </div>

                <button
                    type="button"
                    disabled={page === totalPages}
                    onClick={handleNext}
                    className="py-0 px-2.5 gap-x-1.5 text-xs first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                >
                    {/* <span className="hidden sm:block">Next</span> */}
                    <TbChevronRight size={14}/>
                </button>
            </nav>

            {showPagesList && <div className="grid justify-center sm:flex sm:justify-start sm:items-center gap-2">
                {/* Pagination */}
                <nav className="flex items-center gap-x-1" aria-label="Pagination">
                    <button
                        type="button"
                        onClick={handlePrevious}
                        className="min-h-[32px] min-w-8 py-2 px-2 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                        aria-label="Previous"
                        disabled={page <= 1}
                    >
                        <TbChevronLeft size={15}/>
                        <span className="sr-only">Previous</span>
                    </button>
                    <div className="flex items-center gap-x-1">
                        {/* Dynamically render page buttons */}
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setPage(index + 1)}
                                className={`min-h-[32px] min-w-8 flex justify-center items-center border border-transparent py-1 px-2.5 text-sm rounded-lg focus:outline-none 
        ${page === index + 1
                                    ? 'bg-blue-500 text-white' // Active button style for both modes
                                    : 'text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600'} // Non-active button style
    `}
                                aria-current={page === index + 1 ? "page" : undefined}
                            >
                                {index + 1}
                            </button>

                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={handleNext}
                        className="min-h-[32px] min-w-8 py-2 px-2 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                        aria-label="Next"
                        disabled={page === totalPages}
                    >
                        <span className="sr-only">Next</span>
                        <TbChevronRight size={15}/>
                    </button>
                </nav>
            </div>}

            <div>
                { !showPageSizeSelector ? <Select
                    onValueChange={(value) => {
                        setPageSize(parseInt(value));
                        onPageSizeChange && onPageSizeChange(value);
                    }}
                >
                    <SelectTrigger className="text-gray-600 dark:text-white dark:ring-neutral-600/40">
                        <SelectValue placeholder={`Page size ${pageSize}`}/>
                    </SelectTrigger>
                    <SelectContent>
                        {pageSizesAsStrings.map(item => (
                            <SelectItem key={item} value={item}>{item}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>:null}
            </div>
        </div>
    );
};

export default Pagination;
