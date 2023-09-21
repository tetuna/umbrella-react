import { useState } from 'react'
import ProductCategoryItem from 'components/shared-components/specific/ProductCategoryItem';

type CategoryType = {
    id: number
    name: string
}
type DataType = {
    id: number
    name: string
    price: number
    description: string
    categories: CategoryType
    media: { 0?: { original_url: string }, 1?: { original_url: string }, length: number }
}

type PropsType = {
    data: DataType
    addRemoveForDeleteArray?: (id: number) => void;
}


export default function ProductCard({ data, addRemoveForDeleteArray }: PropsType) {

    const [modalIsActive, setmodalIsActive] = useState(false)

    return (
        <>
            <div className="product">
                <div className="card">
                    <label className="checkbox-container">
                        <input type="checkbox" className=".delete-checkbox" />
                        <span
                            className="checkmark"
                            onClick={() => {
                                addRemoveForDeleteArray(data?.id)
                            }}
                        ></span>
                    </label>
                    <div className="name">{data?.name}</div>
                    <div className="price">{data?.price} $</div>
                    <div className="description">{data?.description?.length > 30 ? data?.description.substring(0, 30) + '...' : data?.description}</div>
                    <div className="categories">
                        {data?.categories.map((category: CategoryType) => {
                            return <ProductCategoryItem key={category?.id} id={category?.id} name={category?.name} />;
                        })}
                    </div>
                    <div className="actions">
                        <button className="btn" disabled={data?.media?.length == 0}
                            onClick={() => { setmodalIsActive(true); document.body.classList.add("overflow-hidden"); }}
                        >Show Images</button>
                    </div>
                </div>
            </div>
            <div className="logout-dialogue-parent">
                <div className={`logout-dialogue${modalIsActive ? "" : " d-none"}`}
                    onClick={() => { setmodalIsActive(false); document.body.classList.remove("overflow-hidden"); }}
                >
                    <div className="card-logout fancy-scroll">
                        <h5>Images</h5>
                        {modalIsActive && data?.media?.[0]?.original_url ? <img src={data?.media?.[0]?.original_url} alt="" /> : null}
                        {modalIsActive && data?.media?.[1]?.original_url ? <img src={data?.media?.[1]?.original_url} alt="" /> : null}
                        <div className="yes-no-buttons">
                        </div>

                    </div>
                </div>
                <div
                    className={`logout-dialogue-back${modalIsActive ? "" : " d-none"}`}
                    onClick={() => { setmodalIsActive(false); document.body.classList.remove("overflow-hidden"); }}
                ></div>
            </div>
        </>
    )
}