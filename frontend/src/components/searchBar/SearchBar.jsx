import { Button, SearchField, Card } from "@heroui/react";
import { useState } from "react";

const SearchBar = ({
	name = "search",
	placeholder = "Buscar...",
	onSearch,
	ariaLabel = "Buscar",
}) => {
	const [searchText, setSearchText] = useState("");

	const handleChange = (value) => {
		setSearchText(value);
	};

	return (
		<Card
			variant="secondary"
			className="max-w-3xl mx-auto mb-16 flex items-center gap-6"
		>
			<SearchField
				name={`search-${name}`}
				value={searchText}
				onChange={handleChange}
				aria-label={ariaLabel}
				fullWidth
				>
				<SearchField.Group>
					<SearchField.SearchIcon className="material-symbols-outlined text-muted">
						search
					</SearchField.SearchIcon>
					<SearchField.Input className="" placeholder={placeholder} />
					<SearchField.ClearButton />
				</SearchField.Group>
			</SearchField>

			<Button
				type="button"
				variant="primary"
				onPress={() => onSearch?.(searchText)}
			>
				Buscar
			</Button>
		</Card>
	);
};

export default SearchBar;
