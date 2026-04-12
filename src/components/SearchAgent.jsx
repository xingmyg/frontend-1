import './Comp.css';

function SearchBar({searchText, setSearchText}) {
    return (
        <div className="search-box">
            <input
                className="search-input"
                placeholder="Zoek een agent"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
            />
        </div>
    );
}

export default SearchBar;