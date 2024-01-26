
const ExploreSearchBar = ({setSearch}) => {
    return (
            <div className="explore-search-bar">
                <input
                    type="text"
                    placeholder="Search Decks..."
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div> 
    )
}



export default ExploreSearchBar;