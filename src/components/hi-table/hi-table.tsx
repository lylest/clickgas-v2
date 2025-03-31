import {ReactNode} from "react";
import {IHiTable} from "@/types/hitable";
import Pagination from "@/components/pagination.tsx";


const HiTable = <T extends Record<string, any>>(
    {
        headers,
        rows,
        actions,
        pagination,
        selectable,
        selectAll,
        onSelect,
        selectedItems,
        selectField = "id",
        onRowClick
    }: IHiTable<T>) => {
    return (
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-lg overflow-hidden dark:border-neutral-700">
                        <table className="min-w-full  divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead className="bg-gray-50 dark:bg-neutral-600/50">
                            <tr>
                                {selectable &&
                                    <td
                                        scope="col"
                                        className="w-4 px-6  flex  py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">
                                        <input
                                            type="checkbox"
                                            checked={rows.every(row => selectedItems?.includes(row.id))}
                                            onChange={() => selectAll && selectAll()}
                                            className="shrink-0 size-4 mt-0 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                        />
                                    </td>}
                                {headers.map((header, index) => (
                                    <th
                                        scope="col"
                                        key={index}
                                        className="px-6 whitespace-nowrap py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                                    >
                                        {header.label}
                                    </th>
                                ))}
                                {actions && actions ? <th
                                    scope="col"
                                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">
                                    Actions
                                    </th>: null}
                            </tr>
                            </thead>
                            <tbody
                                className="divide-y divide-gray-200 bg-white dark:bg-neutral-800 dark:divide-neutral-700">
                                {rows.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-100 dark:hover:bg-neutral-700">

                                    {selectable && <td className={"pl-6 w-4"}>
                                        <input
                                            type="checkbox"
                                            checked={selectedItems?.includes(row[selectField])}
                                            onChange={() => onSelect && onSelect(row)}
                                            className="shrink- size-4 mt-2 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                        /></td>}

                                    {headers.map((header, cellIndex) => (
                                        <td
                                            onClick={() => onRowClick?.(row)}
                                            key={cellIndex}
                                            className={`px-6 py-4 cursor-pointer ${header?.headerClass ? header.headerClass : "whitespace-nowrap"} text-xs text-gray-800 dark:text-neutral-200`}
                                        >
                                            { header.defaultValue ? header.defaultValue : header.template ? header.template(row) : (row[header.key] as ReactNode)}
                                        </td>
                                    ))}
                                    {actions && actions ?
                                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium space-x-2">
                                            {actions && actions.map((action, actionIndex) => (
                                                <div key={actionIndex} className="inline-flex">
                                                    <button
                                                        type="button"
                                                        onClick={() => action.onClick && action.onClick(row)}
                                                        className="inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                                                    >
                                                        {action?.icon}
                                                        {action?.label}
                                                    </button>
                                                </div>
                                            ))}
                                        </td>: null}
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        {pagination &&
                            <Pagination
                                pageSize={pagination.pageSize}
                                setPageSize={pagination.setPageSize}
                                page={pagination.page}
                                setPage={pagination.setPage}
                                totalPages={pagination.totalPages}
                                showPagesList={pagination.showPagesList}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HiTable;
