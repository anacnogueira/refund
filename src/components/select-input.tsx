import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react";
import { Select } from "radix-ui";

type Option = {
    value: string;
    label: string;
}
interface SelectInputProps extends Select.SelectProps {
    labelText?: string;
    options: Option[];
    error?: string;
}

export default function SelectInput({
    labelText,
    options,
    error,
    ...props
}: SelectInputProps) {
    return (
        <Select.Root {...props}>
            <Select.Trigger
                className="relative flex group outline-none items-start w-full max-w-88 text-gray-200 group data-[state=open]:text-green-100 focus-within:text-green-100 data-[state=open]:font-bold focus-within:font-bold text-2xs transition-all flex-col gap-2"
            >
                {labelText && <span className="uppercases">{labelText}</span>}
                <div className="w-full rounded-lgn flex h-12 items-center group-data-placeholder:text-gray-200 text-gray-100 transition-all gap-2 justify-between border font-normal outline-none border-gray-300 group-data-[state=open]:border-green-100 group-focus-within:border-green-100 caret-green-100 py-3.5 px-4 text-sm">
                    <Select.Value placeholder="Selecione" className="" />
                    <Select.Icon>
                        <CaretDownIcon />
                    </Select.Icon>
                    { error && (
                        <span className="absolute normal-case bottom-0 left-0 translate-y-full text-sm font-medium text-green-100">
                            {error}
                        </span>
                    )}                        
                </div>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content
                    position="popper"
                    className="w-(--radix-select-trigger-width) shadow-[0_2px_24px_0_rgba(0,0,0,0.08)] bg-gray-500 border border-gray-300 flex flex-col py-2 rounded-lg"
                    sideOffset={4}
                >
                    <Select.Viewport className="w-full">
                        {options.map((option) => (
                            <Select.Item
                                className="py-3 cursor-pointer hover:bg-gray-400 focus-visible:bg-gray-400 outline-green-100 px-4 w-full flex items-center justify-between text-sm text-gray-100 data-[state=checked]:font-bold"
                                value={option.value}
                                key={option.value}
                            >
                                <Select.ItemText>{option.label}</Select.ItemText>
                                <Select.ItemIndicator>
                                    <CheckIcon className="size-5 text-green-100" />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}