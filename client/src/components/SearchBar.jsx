function SearchBar({ searchQuery, setSearchQuery }) {
  return (
      <div className="pt-5 w-full max-w-xl mx-auto">
          <input
              type="text"
              placeholder="Search..."
              id="global-search"
              name="search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => {setSearchQuery(e.target.value)}}
              className="w-full px-4 py-2 rounded-full border border-gray-700"
          />
      </div>
  );
}

export default SearchBar;