import { FormEvent, useEffect, useState } from 'react';
import { Recipe } from '../../shared/types/Recipe';
import './EditRecipeForm.css';

interface EditRecipeFormProps {
  recipe: Recipe | null;
  onSave: (recipe: Recipe) => void;
  onCancel: () => void;
}

const EditRecipeForm = ({ recipe, onSave, onCancel }: EditRecipeFormProps) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  useEffect(() => {
    if (recipe) {
      setName(recipe.name);
      setIngredients(recipe.ingredients.join('\n'));
      setSteps(recipe.steps.join('\n'));
    } else {
      setName('');
      setIngredients('');
      setSteps('');
    }
  }, [recipe]);

  if (!recipe) {
    return (
      <section className="card edit-recipe-card">
        <h2>Selecciona una recepta</h2>
        <p>Fes clic a una recepta per editar la seva informació.</p>
      </section>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({
      ...recipe,
      name: name.trim(),
      ingredients: ingredients
        .split('\n')
        .map((value) => value.trim())
        .filter(Boolean),
      steps: steps
        .split('\n')
        .map((value) => value.trim())
        .filter(Boolean)
    });
  };

  return (
    <section className="card edit-recipe-card">
      <h2>Edita la recepta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="edit-recipe-name">Nom</label>
          <input
            id="edit-recipe-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-recipe-ingredients">Ingredients</label>
          <textarea
            id="edit-recipe-ingredients"
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-recipe-steps">Passos</label>
          <textarea
            id="edit-recipe-steps"
            value={steps}
            onChange={(event) => setSteps(event.target.value)}
          />
        </div>

        <div className="edit-recipe-card__controls">
          <button type="button" className="danger" onClick={onCancel}>
            Cancel·la
          </button>
          <button type="submit" className="primary">
            Desa canvis
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditRecipeForm;
