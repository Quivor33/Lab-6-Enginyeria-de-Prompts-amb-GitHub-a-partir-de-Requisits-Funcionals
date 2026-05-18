import './SearchBar.css';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => (
  <section className="card search-bar-card">
    <h2>Busca receptes</h2>
    <div className="form-group">
      <label htmlFor="search-term">Cerca per nom, ingredient o pas</label>
      <input
        id="search-term"
        type="text"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Ex: arròs, tomàquet, coure"
      />
    </div>
  </section>
);

export default SearchBar;
