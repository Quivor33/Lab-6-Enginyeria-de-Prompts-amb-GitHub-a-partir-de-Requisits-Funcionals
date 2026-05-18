import { useMemo } from 'react';
import { Recipe } from './types/recipe';
import { useLocalStorage } from './hooks/useLocalStorage';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import './App.css';

function App() {
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>('gestio-receptes', []);

  const sortedRecipes = useMemo(
    () => [...recipes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [recipes]
  );

  const addRecipe = (recipe: Recipe) => {
    setRecipes([recipe, ...recipes]);
  };

  const removeRecipe = (id: string) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Gestió de Receptes</h1>
        <p>Organitza les teves receptes, ingredients i passos en un sol lloc.</p>
      </header>
      <main className="app-main">
        <RecipeForm onSave={addRecipe} />
        <RecipeList recipes={sortedRecipes} onDelete={removeRecipe} />
      </main>
    </div>
  );
}

export default App;
