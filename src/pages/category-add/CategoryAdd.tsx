import { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Input from "components/shared-components/inputs/Input";
import ImageInput from "components/shared-components/inputs/ImageInput";
// import 'assets/css/pages/product-add/product-add.css'
import saveIcon from "assets/img/fa-icons/upload-solid.svg"
import cancelIcon from "assets/img/fa-icons/xmark-solid.svg"

type DataType = {
    name: string,
    price: number,
    description: string,
    size?: number | null,
    weight?: number | null,
    height?: number | null,
    width?: number | null,
    length?: number | null,
}

type FormInputsType = {
    name: { value: string }
    price: { value: string }
    description: { value: string }
    size: { value: string }
    weight: { value: string }
    height: { value: string }
    width: { value: string }
    length: { value: string }
}

export default function CategoryAdd() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, control, watch } = useForm();
    const apiUrl: string = import.meta.env.VITE_APP_API_URL;
    const [validationErrors, setValidationErrors] = useState<{ input: string, message: string }>({ input: "", message: "" })
    const formRef = useRef<HTMLFormElement>(null);
    const submitBtnRef = useRef<HTMLButtonElement>(null);

    const addProduct = (data) => {
        console.log("DATA:::", data);

        // event.preventDefault();
        // const target = event.target as typeof event.target & FormInputsType;

        // let data: DataType = {
        //     "name": target.name.value,
        //     "price": Number(target.price.value),
        //     "description": target.description.value,
        // }

        axios.post(apiUrl + 'categories', data)
            .then(function (res) {
                if (res.status == 200) {
                    alert('Category has been created successfully!');
                    navigate("/admin/categories");
                }
            })
            .catch(function (error) {
                setValidationErrors(error.response?.data?.error);
            });
    }

    return (
        <>
            <div className="product-add">
                <div className="header-dynamic">
                    <h1 className="title">
                        Category<span>Add</span>
                    </h1>
                    <div className="buttons">
                        <button
                            type="submit"
                            className="btn success"
                            onClick={() => { submitBtnRef.current?.click() }}
                        >
                            <span className="icon">
                                <img src={saveIcon} alt="save icon" />
                            </span>
                            Save
                        </button>
                        <button
                            type="button"
                            className="btn"
                            form="#product_form"
                            onClick={() => { navigate("/admin/products") }}
                        >
                            <span className="icon">
                                <img src={cancelIcon} alt="cancel icon" />
                            </span>
                            Cancel
                        </button>
                    </div>
                </div>
                <div className="product-inputs">
                    <form action="" id="#product_form" onSubmit={handleSubmit(addProduct)} ref={formRef}>
                        <Input
                            id="#name"
                            name="name"
                            label="Name"
                            pattern="[A-Za-zა-ჰ0-9 ].{1,128}"
                            title="Alphabets, numbers and some special characters only: []().,- [A-Z a-z ა-ჰ 0-9]"
                            register={register}
                            error={validationErrors?.input == "name" ? validationErrors?.message : null}
                        />
                        <button type="submit" ref={submitBtnRef} className="d-none">submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}