import { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from 'components/shared-components/specific/ProductCard';
import searchIcon from "assets/img/fa-icons/magnifying-glass-solid.svg"
import addIcon from "assets/img/fa-icons/plus-solid.svg"
import Paginate from 'components/shared-components/specific/Paginate';

type CategoryType = {
    id: number
    name: string
}

type ProductsArrayType = {
    id: number
    name: string
    price: number
    description: string
    categories: CategoryType
    media: { 0?: { original_url: string }, 1?: { original_url: string }, length: number }
}

type PaginateDataType = {
    from: number
    to: number
    total: number
    first_page: number
    current_page: number
    last_page: number
}


export default function ProductList() {
    const apiUrl: string = import.meta.env.VITE_APP_API_URL;
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [mainData, setMainData] = useState<PaginateDataType>({});
    const isFirstPage = mainData?.current_page == 1;
    const isLastPage = mainData?.current_page == mainData?.last_page;

    const [nameState, setNameState] = useState(searchParams.get('name') || '');
    const [priceState, setPriceState] = useState(searchParams.get('price') || '');
    const [descriptionState, setDescriptionState] = useState(searchParams.get('description') || '');
    const [categoryState, setcategoryState] = useState(searchParams.get('categories') || '');

    const nameRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const categoriesRef = useRef<HTMLInputElement>(null);

    const [productsArray, setProductsArray] = useState<ProductsArrayType[]>([]);

    useEffect(() => {
        handleSearch();
    }, []);
    const handleFIlterKeypress = () => {
        setSearchParams(prevState => ({
            ...prevState,
            name: nameRef?.current?.value,
            price: priceRef?.current?.value,
            description: descriptionRef?.current?.value,
            categories: categoriesRef?.current?.value,
        }));
    }

    const handleSearch = (page = 1) => {
        axios.post(apiUrl + 'products/search?page=' + page,
            {
                name: nameState,
                price: Number(priceState),
                description: descriptionState,
                category: categoryState,
            })
            .then(function (res) {
                if (res.status == 200) {
                    console.log(res);
                    setProductsArray(res?.data?.products?.data);
                    setMainData(res?.data?.products);
                }
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    return (
        <>
            <div className="product-list">
                <div className="header-dynamic">
                    <h1 className="title">
                        Product<span>List &#40;Admin Panel&#41;</span>
                    </h1>
                    <div className="buttons">
                        <button
                            className="btn"
                            onClick={() => { navigate("/products") }}
                        >
                            Product List Main
                        </button>
                        <button
                            className="btn"
                            onClick={() => { navigate("/admin/categories") }}
                        >
                            Category List
                        </button>
                        <button
                            className="btn"
                            title="ADD Product"
                            onClick={() => { navigate("/admin/products/add") }}
                        >
                            <span className="icon">
                                <img src={addIcon} alt="" />
                            </span>
                            Product
                        </button>
                    </div>
                </div>
                <div className="products product-list-admin-panel">
                    <Paginate
                        data={mainData}
                        isFirstPage={isFirstPage}
                        isLastPage={isLastPage}
                        handleSearch={handleSearch}
                    />
                    <div className="product header filter">
                        <div className="card">
                            <div>
                                <input
                                    type="text"
                                    ref={nameRef}
                                    value={nameState}
                                    placeholder="Name filter"
                                    onChange={e => { setNameState(e.target.value); handleFIlterKeypress() }}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    ref={priceRef}
                                    value={priceState}
                                    placeholder="Price"
                                    onChange={e => { setPriceState(e.target.value); handleFIlterKeypress() }}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    ref={descriptionRef}
                                    value={descriptionState}
                                    placeholder="Description"
                                    onChange={e => { setDescriptionState(e.target.value); handleFIlterKeypress() }}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    ref={categoriesRef}
                                    value={categoryState}
                                    placeholder="Category"
                                    onChange={e => { setcategoryState(e.target.value); handleFIlterKeypress() }}
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
                    <div className="product header">
                        <div className="card">
                            <div>Name</div>
                            <div>Price</div>
                            <div>Description</div>
                            <div>Categories</div>
                            <div>Actions</div>
                        </div>
                    </div>
                    {productsArray.map((product) => {
                        return <ProductCard
                            key={product?.id}
                            data={product}
                        />;
                    })}
                </div>
            </div>
        </>
    )
}