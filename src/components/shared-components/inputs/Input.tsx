import { useState } from "react"

type PropsType = {
    id: string,
    type?: string,
    name: string,
    label: string,
    pattern?: string,
    title?: string,
    register?: any,
    required?: boolean,
    error?: string | null
}

export default function Input({
    id,
    type = "text",
    name,
    label,
    error,
    pattern,
    title,
    register,
    required = true
}: PropsType) {

    const [valueOfInput, setValueOfInput] = useState<string>('');

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValueOfInput(e.currentTarget.value);
    }

    return (
        <>
            <div className={`single-input${error ? " error" : ""}`}>
                <label htmlFor={id}>
                    {label}
                    {required ? <span className="required-circle" title="Required field"></span> : ""}
                </label>
                <input
                    id={id}
                    type={type}
                    // name={name}
                    {...register(name)}
                    pattern={pattern}
                    title={title}
                    onChange={onChange}
                    value={valueOfInput}
                    required={required}
                />
                {error ? <div className="error">{error}</div> : null}
            </div>
        </>
    )
}