
const TableSkeleton =()=> {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg animate-pulse">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase  py-6 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </th>
                    <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </td>
                </tr>
                </tbody>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </th>
                    <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </td>
                </tr>
                </tbody>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </th>
                    <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="px-6 py-4">
                <div className="rounded-md bg-gray-200 h-8"></div>
            </div>
        </div>
    )
}

export default TableSkeleton