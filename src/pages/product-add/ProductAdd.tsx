import { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Input from "components/shared-components/inputs/Input";
import ImageInput from "components/shared-components/inputs/ImageInput";
import saveIcon from "assets/img/fa-icons/upload-solid.svg"
import cancelIcon from "assets/img/fa-icons/xmark-solid.svg"
import ReactMultiSelectInput from 'components/shared-components/inputs/ReactMultiSelectInput';

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

export default function ProductAdd() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, control, watch } = useForm();
    const apiUrl: string = import.meta.env.VITE_APP_API_URL;
    const decimalHtmlPattern = "[0-9]+(\.[0-9][0-9]?)?"
    const [validationErrors, setValidationErrors] = useState<{ input: string, message: string }>({ input: "", message: "" })
    const formRef = useRef<HTMLFormElement>(null);
    const submitBtnRef = useRef<HTMLButtonElement>(null);
    const [categoriesArray, setCategoriesArray] = useState<{ id: number, name: string }>();

    useEffect(() => {
        axios.get(apiUrl + 'categories')
            .then(function (res) {
                if (res.status == 200) {
                    console.log(res);

                    setCategoriesArray(res?.data?.categories);
                }
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }, []);

    const addProduct = (data: any) => {
        console.log("DATA:::", data);

        const formData = new FormData();

        Object.entries(data).forEach(([property, value]) => {
            formData.append(`${property}`, value || '');
        });

        axios.post(apiUrl + 'products', formData)
            .then(function (res) {
                if (res.status == 200) {
                    alert('Product has been created successfully!');
                    navigate("/admin/products");
                }
            })
            .catch(function (error) {
                console.log("ERR::::", error.response);
                setValidationErrors(error.response?.data?.error);
            });
    }

    return (
        <>
            <div className="product-add">
                <div className="header-dynamic">
                    <h1 className="title">
                        Product<span>Add</span>
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
                        <Input
                            id="#price"
                            name="price"
                            label="Price"
                            pattern={decimalHtmlPattern}
                            title="Please enter the price following format (ex: 1.05 or 1)"
                            register={register}
                            error={validationErrors?.input == "price" ? validationErrors?.message : null}
                        />
                        <Input
                            id="#description"
                            name="description"
                            label="Description"
                            title="Please enter the description"
                            register={register}
                            error={validationErrors?.input == "description" ? validationErrors?.message : null}
                        />
                        <div className="single-input">
                            <ReactMultiSelectInput
                                label="Categories"
                                name="categories"
                                placeholder="Choose Categories"
                                parentClasses="mb-4 pb-4"
                                register={register}
                                // values={data?.products}
                                values={categoriesArray}
                                // errorMessage={errors?.data}
                                control={control}
                                required={true}
                            />
                        </div>

                        {/* <Input
                            id="#size"
                            name="size"
                            label="Size (in MB)"
                            pattern={decimalHtmlPattern}
                            title="Please enter the size following format (ex: 1.05 or 1)"
                            error={validationErrors?.input == "size" ? validationErrors?.message : null}
                        /> */}
                        <div className="special-attributes">
                            {/* <Input
                                id="#size"
                                name="size"
                                label="Size (in MB)"
                                pattern={decimalHtmlPattern}
                                title="Please enter the size following format (ex: 1.05 or 1)"
                                error={validationErrors?.input == "size" ? validationErrors?.message : null}
                            /> */}
                        </div>
                        <ImageInput
                            id="image1"
                            name="image1"
                            parentClasses="mr-8"
                            classes="d-inline-block"
                            register={register}
                            control={control}
                        // errorMessage={errors?.image1}
                        />
                        <ImageInput
                            id="image2"
                            name="image2"
                            parentClasses=""
                            classes="d-inline-block"
                            register={register}
                            control={control}
                        // errorMessage={errors?.image2}
                        />

                        <button type="submit" ref={submitBtnRef} className="d-none">submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}