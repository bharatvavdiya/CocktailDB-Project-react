import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
	const { setSearchTerm } = useGlobalContext();
	const searchValue = React.useRef("");
	React.useEffect(() => {
		searchValue.current.focus();
	}, []);
	const searchCocktail = () => {
		setSearchTerm(searchValue.current.value);
	};
	const handleSubmit = (e) => {
		e.PreventDefault();
	};
	return (
		<section className="search section">
			<form className="search-form" onSubmit={handleSubmit}>
				<div className="form-control">
					<label htmlFor="name">search you favourite cocktail</label>
					<input type="text" id="name" ref={searchValue} onChange={searchCocktail} />
				</div>
			</form>
		</section>
	);
};

export default SearchForm;
