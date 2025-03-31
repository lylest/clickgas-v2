import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import React, {FC, useState} from "react";
import {TbCheck, TbChevronDown, TbChevronUp, TbX} from "react-icons/tb";
import {twMerge} from "tailwind-merge";
import {ScrollArea} from "@/components/ui/scroll-area";
import MainSkeleton from "@/components/skeletons/main-skeleton.tsx";
import Badge from "@/components/general/Badge.tsx";

interface ISuperCombo<T> {
    hasError?: boolean;
    errorMessage?: any;
    placeholder?: string;
    options: T[];
    selectedOptions: T[];
    triggerContainerClassName?: string;
    contentContainerClassName?: string;
    isLoading?: boolean;
    onSearch?: (query: string) => void;
    onSelect?: (value: T) => void;
    template?: (option: T) => JSX.Element;
    skeletonTemplate?: () => JSX.Element;
    skeletonNumber?: number;
    isMultiSelect?: boolean;
    displayLabel?: keyof T;
    onRemove?: (value: T) => void;
    renderSelectTemplate?: boolean;
}



const SuperCombo: FC<ISuperCombo<any>> = (
    {
        placeholder,
        triggerContainerClassName,
        template,
        options,
        onSelect,
        selectedOptions,
        isMultiSelect = false,
        displayLabel,
        renderSelectTemplate,
        onRemove,
        onSearch,
        isLoading,
        hasError,
        errorMessage,
        skeletonTemplate,
        skeletonNumber,
        contentContainerClassName
                                              // ...props
                                          }) => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [keyword, setKeyword] = useState("");

    const renderSelectedItem = (option: any) => {
        if (template && renderSelectTemplate) {
            return template(option);
        }
        return displayLabel ? option[displayLabel] : option;
    };

    const renderTriggerContent = () => {
        if (selectedOptions.length === 0) {
            return (
                <p className="text-gray-500 truncate">
                    {hasError && errorMessage ? (
                        <span className="text-rose-500">{errorMessage}</span>
                    ) : (
                        placeholder || "Select option"
                    )}
                </p>
            );
        }

        if (isMultiSelect) {
            return (
                <div className="flex flex-wrap gap-2 min-h-[1.5rem] py-1">
                    {selectedOptions.map((option, index) => (
                        <Badge
                            label={""}
                            key={index}
                            type="secondary"
                            className="flex items-center gap-1 text-sm"
                        >
                            {renderSelectedItem(option)}
                            <TbX
                                className="cursor-pointer h-4 w-4 hover:text-rose-500"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove?.(option);
                                }}
                            />
                        </Badge>
                    ))}
                </div>
            );
        }
        return <div className="flex-1 truncate">{renderSelectedItem(selectedOptions[0])}</div>;
    };

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <div
                    className={twMerge(
                        "flex min-h-[2.5rem] w-full cursor-pointer items-center justify-between rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20",
                        hasError && "border-rose-500 focus:ring-rose-500/30",
                        triggerContainerClassName
                    )}
                >
                    {renderTriggerContent()}
                    <button className="flex-shrink-0 p-1">
                        {isPopoverOpen ? (
                            <TbChevronUp className="h-4 w-4" />
                        ) : (
                            <TbChevronDown className="h-4 w-4" />
                        )}
                    </button>
                </div>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className={twMerge(
                    "w-[var(--radix-popover-trigger-width)] p-2",
                    contentContainerClassName
                )}
                onEscapeKeyDown={() => setIsPopoverOpen(false)}
            >
                {onSearch && (
                    <input
                        value={keyword}
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 mb-2"
                        onChange={(e) => {
                            onSearch?.(e.target.value);
                            setKeyword(e.target.value);
                        }}
                        placeholder="Search"
                    />
                )}
                <ScrollArea className="max-h-[32vh] pr-2">
                    {isLoading && skeletonTemplate ? (
                        <MainSkeleton child={skeletonTemplate()} items={skeletonNumber ?? 3} />
                    ) : (
                        <div className="space-y-1">
                            {options?.map((option, index) => (
                                <div
                                    key={index}
                                    className="flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-2 hover:bg-gray-100 dark:hover:bg-neutral-600/50"
                                    onClick={() => {
                                        onSelect?.(option);
                                        if (!isMultiSelect) {
                                            setIsPopoverOpen(false);
                                        }
                                    }}
                                >
                                    <div className="flex-1 truncate">
                                        {template ? template(option) : renderSelectedItem(option)}
                                    </div>
                                    {selectedOptions?.includes(option) && (
                                        <TbCheck className="h-4 w-4 flex-shrink-0 text-primary" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
};
export default SuperCombo;