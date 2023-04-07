import { useState } from "react";
import { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

function Header({ setLoading, ...props }) {
  const history = useHistory()
  
  const [searchText, setSearchText] = useState('');

  function openSearch() {
    var searchInput = document.getElementById("search");
    searchInput.classList.add("active");
    searchInput.focus();
  }
  
  function closeSearch() {
    var searchInput = document.getElementById("search");
    searchInput.classList.remove("active");
    searchInput.blur();
  }

  const searchInput = useRef(null);
  
  const searchOnChange = (value) => {
    if(!value) {
      setLoading(false)
      return closeSearch()
    }
    openSearch()
    setLoading(true)
    setSearchText(value)
  }
  
  useEffect(() => {
    if (searchInput.current) {
      searchInput.current.focus();
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(false)
    history.push(`/search/${searchText}`)
  }
  
  return (
      <header className="bg flex">
        <div className="box flex justifySpaceBetween">
          <div className="logo flex">
            <Link to="/">
              <img src="/logo.png" alt="The Peaks" />
            </Link>
          </div>
            <form onSubmit={handleSubmit} className="search alignSelfEnd flex" id="search">
              <input 
                  ref={searchInput}
                  type="search" 
                  placeholder="Search all news"
                  onChange={(e) => searchOnChange(e.target.value)}
                  onBlur={closeSearch}
                  required
              />
              <button onClick={openSearch} type="button">
                <img src="/search.png" alt="Search" />
              </button>
            </form>
        </div>
      </header>
  );
}

export default Header;
