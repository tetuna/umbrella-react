import { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import searchIcon from "assets/img/fa-icons/magnifying-glass-solid.svg"
import addIcon from "assets/img/fa-icons/plus-solid.svg"

type CategoriesArrayType = {
    id: number
    name: string
}


export default function CategoryList() {
    const apiUrl: string = import.meta.env.VITE_APP_API_URL;
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [nameState, setNameState] = useState(searchParams.get('name') || '');

    const nameRef = useRef<HTMLInputElement>(null);

    const [categoriesArray, setCategoriesArray] = useState<CategoriesArrayType[]>([]);

    useEffect(() => {
        handleSearch();
    }, []);

    const handleFIlterKeypress = () => {
        setSearchParams(prevState => ({
            ...prevState,
            name: nameRef?.current?.value,
        }));
    }

    const handleSearch = () => {
        axios.post(apiUrl + 'categories/search',
            {
                name: nameState,
            })
            .then(function (res) {
                if (res.status == 200) {
                    console.log(res);
                    setCategoriesArray(res?.data?.categories);
                }
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    return (
        <>
            <div className="product-list category">
                <div className="header-dynamic">
                    <h1 className="title">
                        Category<span>List &#40;Admin Panel&#41;</span>
                    </h1>
                    <div className="buttons">
                        <button
                            className="btn"
                            onClick={() => { navigate("/admin/products") }}
                        >
                            Product List
                        </button>
                        <button
                            className="btn"
                            title="ADD Category"
                            onClick={() => { navigate("/admin/categories/add") }}
                        >
                            <span className="icon">
                                <img src={addIcon} alt="" />
                            </span>
                            Category
                        </button>
                    </div>
                </div>
                <div className="products">
                    <div className="product header filter">
                        <div className="card">
                            <div>
                                <input
                                    type="text"
                                    ref={nameRef}
                                    value={nameState}
                                    onChange={e => { setNameState(e.target.value); handleFIlterKeypress() }}
                                />
                            </div>
                            <div>
                                <button className="btn" onClick={() => { handleSearch() }}>
                                    <span className="icon">
                                        <img src={searchIcon} alt="" />
                                    </span>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    {categoriesArray.map((category) => {
                        return <>
                            <div className="product" key={category?.id}>
                                <div className="card">
                                    <div>
                                        {category?.name}
                                    </div>
                                </div>
                            </div>
                        </>;
                    })}
                </div>
            </div>
        </>
    )
}