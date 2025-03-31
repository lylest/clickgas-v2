interface Props {
    name: string
    value: string
    isLarge?: boolean
    isCol?: boolean
    highlight?: boolean
}
export default function PreviewInfoComponent({ name, value, isLarge, isCol, highlight }: Props) {
    return (
        <div className={isLarge ? "space-y-1 col-span-2 py-1" : isCol ? "space-y-1 py-1" : "space-x-1 flex items-center py-1"}>
            <h2 className={"leading-3 font-medium text-gray-800"}>
                {name}
            </h2>
            <p className={`
                ${isLarge ? "max-h-60 overflow-auto text-sm text-gray-600" : "text-sm text-gray-600"}
                ${highlight && "text-primary-700"}
            `}>
                {value}
            </p>
        </div>
    )
}