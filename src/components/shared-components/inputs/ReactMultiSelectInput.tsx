import Select from "react-select";
import {Controller} from "react-hook-form";

export default function ({
                             control,
                             label,
                             placeholder,
                             name,
                             parentClasses,
                             errorMessage,
                             values = [],
                             required = true,
                             optionLabel = "name",
                             optionValue = "id",
                         }) {

    return (
        <>
            <div className={` ${parentClasses}`}>
                <label className='form-label fs-6 fw-bolder text-dark'>
                    {label}
                    {required ? <span className="required-circle" title="Required field"></span> : ""}
                </label>
                <Controller
                    name={name}
                    control={control}
                    render={({field: {value, onChange, onBlur}}) => {
                        return (
                            <div>
                                <Select
                                    styles={{
                                        option: (base) => ({
                                            ...base,
                                            color: `blue`,
                                        }),
                                    }}
                                    options={values}
                                    placeholder={placeholder}
                                    isMulti={true}
                                    getOptionLabel={(option) => option[optionLabel]}
                                    getOptionValue={(option) => option[optionValue]}
                                    onChange={(options) =>
                                        onChange(options?.map((option) => option?.[optionValue]))
                                    }
                                    onBlur={onBlur}
                                    value={values.filter((option) => value?.includes(option?.[optionValue]))}
                                />
                                {
                                    errorMessage && (
                                        <div className="fv-plugins-message-container invalid-feedback">
                                            <div>{errorMessage}</div>
                                        </div>
                                    )
                                }
                            </div>
                        );
                    }}
                />
            </div>
        </>
    );
}