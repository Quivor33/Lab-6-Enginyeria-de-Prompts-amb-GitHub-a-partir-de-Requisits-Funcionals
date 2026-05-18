import { FormEvent, useState } from 'react';
import { Recipe } from '../../shared/types/Recipe';
import './AddRecipeForm.css';

interface AddRecipeFormProps {
  onAddRecipe: (recipe: Recipe) => void;
}

const AddRecipeForm = ({ onAddRecipe }: AddRecipeFormProps) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      return;
    }

    const recipe: Recipe = {
      id: crypto.randomUUID(),
      name: name.trim(),
      ingredients: ingredients
        .split('\n')
        .map((value) => value.trim())
        .filter(Boolean),
      steps: steps
        .split('\n')
        .map((value) => value.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString()
    };

    onAddRecipe(recipe);
    setName('');
    setIngredients('');
    setSteps('');
  };

  return (
    <section className="card add-recipe-card">
      <h2>Afegeix una nova recepta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="recipe-name">Nom de la recepta</label>
          <input
            id="recipe-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex: Paella de verdures"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="recipe-ingredients">Ingredients (una per línia)</label>
          <textarea
            id="recipe-ingredients"
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
            placeholder="1 tomàquet\n1 pebrot\narròs"
          />
        </div>

        <div className="form-group">
          <label htmlFor="recipe-steps">Passos (una per línia)</label>
          <textarea
            id="recipe-steps"
            value={steps}
            onChange={(event) => setSteps(event.target.value)}
            placeholder="Escalfa l'oli\nAfegeix les verdures\nCuina l'arròs"
          />
        </div>

        <button type="submit" className="primary">
          Desa la recepta
        </button>
      </form>
    </section>
  );
};

export default AddRecipeForm;
