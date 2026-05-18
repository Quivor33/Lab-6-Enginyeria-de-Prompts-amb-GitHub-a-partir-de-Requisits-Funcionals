import { Recipe } from '../types/recipe';

interface RecipeListProps {
  recipes: Recipe[];
  onDelete: (id: string) => void;
}

const RecipeList = ({ recipes, onDelete }: RecipeListProps) => {
  if (recipes.length === 0) {
    return (
      <section className="card">
        <h2>Cap recepta afegida</h2>
        <p>Utilitza el formulari per començar a gestionar les teves receptes.</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Receptes guardades</h2>
      {recipes.map((recipe) => (
        <article key={recipe.id} className="recipe-item">
          <div className="recipe-info">
            <h3>{recipe.name}</h3>
            <p className="recipe-meta">Creada el {new Date(recipe.createdAt).toLocaleDateString('ca-ES')}</p>
            <div>
              <strong>Ingredients</strong>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Passos</strong>
              <ol>
                {recipe.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
          <button type="button" className="danger" onClick={() => onDelete(recipe.id)}>
            Esborra
          </button>
        </article>
      ))}
    </section>
  );
};

export default RecipeList;
