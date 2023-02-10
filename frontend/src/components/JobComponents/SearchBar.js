import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/SearchContainer";

function SearchBar() {
    const { searchKeyWord, handleSearchKeyChange } = useAppContext();

    const handleSearch = (e) => {
        handleSearchKeyChange({
            name: e.target.name,
            value: e.target.value,
        });
    };

    return (
        <Wrapper>
            <form className="form">
                <h4>Search Based On Job Position</h4>
                {/* search position */}
                <div className="form-center">
                    <div className="form-row">
                        <input
                            type="text"
                            className="form-input"
                            name="searchKeyWord"
                            value={searchKeyWord}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </form>
        </Wrapper>
    );
}

export default SearchBar;
