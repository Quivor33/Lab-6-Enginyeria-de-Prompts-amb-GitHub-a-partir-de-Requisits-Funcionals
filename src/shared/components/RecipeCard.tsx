import { ReactNode } from 'react';
import { Recipe } from '../types/Recipe';
import './RecipeCard.css';

interface RecipeCardProps {
  recipe: Recipe;
  actions?: ReactNode;
}

const RecipeCard = ({ recipe, actions }: RecipeCardProps) => (
  <article className="recipe-card">
    <div className="recipe-card__header">
      <div>
        <h3>{recipe.name}</h3>
        <p className="recipe-card__meta">Creada el {new Date(recipe.createdAt).toLocaleDateString('ca-ES')}</p>
      </div>
      {actions ? <div className="recipe-card__actions">{actions}</div> : null}
    </div>

    <div className="recipe-card__section">
      <strong>Ingredients</strong>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>

    <div className="recipe-card__section">
      <strong>Passos</strong>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  </article>
);

export default RecipeCard;
