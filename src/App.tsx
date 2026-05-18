import AddRecipeForm from './features/add-recipe';
import SearchBar from './features/search-recipe';
import EditRecipeForm from './features/edit-recipe';
import DeleteRecipeButton from './features/delete-recipe';
import RecipeCard from './shared/components/RecipeCard';
import { useRecipes } from './shared/hooks/useRecipes';
import './App.css';

function App() {
  const {
    filteredRecipes,
    searchTerm,
    setSearchTerm,
    editingRecipe,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    selectRecipe,
    clearSelection
  } = useRecipes();

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Gestió de Receptes</h1>
        <p>Organitza les teves receptes, ingredients i passos en un sol lloc.</p>
      </header>

      <main className="app-main">
        <section className="app-column">
          <AddRecipeForm onAddRecipe={addRecipe} />
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <EditRecipeForm recipe={editingRecipe} onSave={updateRecipe} onCancel={clearSelection} />
        </section>

        <section className="recipe-list-column">
          <section className="card">
            <h2>Receptes guardades</h2>
            {filteredRecipes.length === 0 ? (
              <p>Cap recepta disponible. Afegeix una recepta per començar.</p>
            ) : (
              filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  actions={
                    <>
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => selectRecipe(recipe.id)}
                      >
                        Edita
                      </button>
                      <DeleteRecipeButton recipeId={recipe.id} onDelete={deleteRecipe} />
                    </>
                  }
                />
              ))
            )}
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
