const CustomMultiSelectableField = ({ label, options, selectedOption, setSelectedOption, isMulti = false }) => {
    const handleChange = (e) => {
        if (isMulti) {
            const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
            setSelectedOption(selectedValues);
        } else {
            setSelectedOption(e.target.value);
        }
    };

    return (
        <div className="flex flex-col text-start py-1">
            <div className="flex flex-col gap-1">
                <div className="font-normal text-sm">{label}</div>
                <select
                    multiple={isMulti}
                    value={selectedOption}
                    onChange={handleChange}
                    className="border text-sm text-grey/70 outline-none rounded-md border-black/20 px-4 w-full py-2 h-32 overflow-y-auto"
                >
                    {!isMulti && <option value="">Select</option>}
                    {options?.map((item) => (
                        <option key={item._id} value={JSON.stringify(item)}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default CustomMultiSelectableField;
