type ProductCategoryItemType = {
    id: number
    name: string
}

export default function ProductCategoryItemType({ id, name }: ProductCategoryItemType) {
    return (
        <>
            <div>
                <span>{name}</span>
            </div>
        </>
    )
}