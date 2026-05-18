import { FormEvent, useState } from 'react';
import { Recipe } from '../types/recipe';

interface RecipeFormProps {
  onSave: (recipe: Recipe) => void;
}

const RecipeForm = ({ onSave }: RecipeFormProps) => {
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
        .map((item) => item.trim())
        .filter(Boolean),
      steps: steps
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString()
    };

    onSave(recipe);
    setName('');
    setIngredients('');
    setSteps('');
  };

  return (
    <section className="card">
      <h2>Afegeix una nova recepta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom de la recepta</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex: Paella de verdures"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (una per línia)</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
            placeholder="1 tomàquet\n1 pebrot\narròs"
          />
        </div>

        <div className="form-group">
          <label htmlFor="steps">Passos (una per línia)</label>
          <textarea
            id="steps"
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

export default RecipeForm;
