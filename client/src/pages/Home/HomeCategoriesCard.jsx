export const HomeCategoriesCard = ({categories}) => {
    return (
        <div className="d-flex justify-content-around flex-wrap mt-2">
            {categories?.map((category, key) => (
                <div className="home-category-card p-4 mt-4">
                    <h3 key={key}>{category.name}</h3>
                    <p className="text-truncate-3">{category.description}</p>
                </div>
            ))} 
        </div>
    )
}