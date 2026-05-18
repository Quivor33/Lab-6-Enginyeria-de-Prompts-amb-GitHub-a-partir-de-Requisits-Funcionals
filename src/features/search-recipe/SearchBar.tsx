import './SearchBar.css';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  resultCount?: number;
}

const SearchBar = ({ searchTerm, onSearchChange, resultCount }: SearchBarProps) => (
  <section className="card search-bar-card">
    <h2>Busca receptes</h2>
    <div className="form-group" style={{ position: 'relative' }}>
      <label htmlFor="search-term">Cerca per nom o ingredient</label>
      <input
        id="search-term"
        type="text"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Ex: arròs, tomàquet..."
        style={{ paddingRight: '2rem' }}
      />

      {searchTerm && searchTerm.length > 0 && (
        <button
          type="button"
          aria-label="Netejar cerca"
          onClick={() => onSearchChange('')}
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            padding: 0,
            margin: 0,
            cursor: 'pointer',
            fontSize: '1.2rem',
            lineHeight: 1
          }}
        >
          ×
        </button>
      )}

      {searchTerm && searchTerm.length > 0 && resultCount !== undefined && (
        <p style={{ marginTop: '0.5rem', color: resultCount === 0 ? 'red' : 'inherit' }}>
          {resultCount === 0 ? "No s'han trobat receptes" : `${resultCount} recepta(s) trobada(s)`}
        </p>
      )}
    </div>
  </section>
);

export default SearchBar;
