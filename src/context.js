import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [loading, setloading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("A");
	const [cocktails, setCocktails] = useState([]);

	const fetchDrinks = useCallback( async () => {
		try {
			const response = await fetch(`${url}${searchTerm}`);
			const data = await response.json();
			const { drinks } = data;
			if (drinks) {
				const newCocktails = drinks.map((item) => {
					const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item;
					return {
						id: idDrink,
						name: strDrink,
						image: strDrinkThumb,
						info: strAlcoholic,
						glass: strGlass,
					};
				});
				setCocktails(newCocktails);
			} else {
				setCocktails([]);
			}
			setloading(false);
		} catch (error) {
			console.log(error);
			setloading(false);
		}
	},[searchTerm]);
	useEffect(() => {
		fetchDrinks();
	}, [searchTerm,fetchDrinks]);
	return (
		<AppContext.Provider
			value={{ loading, searchTerm, cocktails, setSearchTerm }}
		>
			{children}
		</AppContext.Provider>
	);
};
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
