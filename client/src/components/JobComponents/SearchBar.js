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
                <h5>Search Applications</h5>
                {/* search position */}
                <div className="form-center">
                    <div className="form-row">
                        <input
                            type="text"
                            className="form-input"
                            name="searchKeyWord"
                            value={searchKeyWord}
                            onChange={handleSearch}
                            placeholder="Please specify the job position you would like to search for"
                        />
                    </div>
                </div>
            </form>
        </Wrapper>
    );
}

export default SearchBar;
