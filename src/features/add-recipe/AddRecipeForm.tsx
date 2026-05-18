import { FormEvent, useRef, useState } from 'react';
import { Recipe } from '../../shared/types/Recipe';
import './AddRecipeForm.css';

interface AddRecipeFormProps {
  onAddRecipe: (recipe: Recipe) => void;
}

const AddRecipeForm = ({ onAddRecipe }: AddRecipeFormProps) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [stepInput, setStepInput] = useState('');
  const [errors, setErrors] = useState<{ name?: string; ingredients?: string; steps?: string }>({});
  const [toastVisible, setToastVisible] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  const resetForm = () => {
    setName('');
    setIngredients([]);
    setSteps([]);
    setIngredientInput('');
    setStepInput('');
    setErrors({});
  };

  const showToast = () => {
    setToastVisible(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  const addIngredient = () => {
    const trimmed = ingredientInput.trim();
    if (!trimmed) {
      return;
    }

    setIngredients((current) => [...current, trimmed]);
    setIngredientInput('');
    setErrors((current) => ({ ...current, ingredients: undefined }));
  };

  const removeIngredient = (index: number) => {
    setIngredients((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const addStep = () => {
    const trimmed = stepInput.trim();
    if (!trimmed) {
      return;
    }

    setSteps((current) => [...current, trimmed]);
    setStepInput('');
    setErrors((current) => ({ ...current, steps: undefined }));
  };

  const removeStep = (index: number) => {
    setSteps((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const validate = () => {
    const nextErrors: { name?: string; ingredients?: string; steps?: string } = {};

    if (!name.trim()) {
      nextErrors.name = 'El nom de la recepta és obligatori';
    }

    if (ingredients.length === 0) {
      nextErrors.ingredients = 'Afegeix com a mínim un ingredient';
    }

    if (steps.length === 0) {
      nextErrors.steps = 'Afegeix com a mínim un pas';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const recipe: Recipe = {
      id: crypto.randomUUID(),
      name: name.trim(),
      ingredients,
      steps,
      createdAt: new Date().toISOString()
    };

    onAddRecipe(recipe);
    resetForm();
    showToast();
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
            onChange={(event) => {
              setName(event.target.value);
              if (errors.name) {
                setErrors((current) => ({ ...current, name: undefined }));
              }
            }}
            placeholder="Ex: Paella de verdures"
          />
          {errors.name ? <p className="field-error">{errors.name}</p> : null}
        </div>

        <div className="form-group">
          <label htmlFor="ingredient-input">Ingredients</label>
          <div className="inline-input-group">
            <input
              id="ingredient-input"
              type="text"
              value={ingredientInput}
              onChange={(event) => setIngredientInput(event.target.value)}
              placeholder="Escriu un ingredient"
            />
            <button type="button" className="secondary" onClick={addIngredient}>
              Afegeix ingredient
            </button>
          </div>
          {errors.ingredients ? <p className="field-error">{errors.ingredients}</p> : null}
          {ingredients.length > 0 ? (
            <ul className="item-list">
              {ingredients.map((ingredient, index) => (
                <li key={`${ingredient}-${index}`}>
                  {ingredient}
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeIngredient(index)}
                    aria-label={`Esborra ingredient ${ingredient}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="step-input">Passos</label>
          <div className="inline-input-group">
            <input
              id="step-input"
              type="text"
              value={stepInput}
              onChange={(event) => setStepInput(event.target.value)}
              placeholder="Escriu un pas"
            />
            <button type="button" className="secondary" onClick={addStep}>
              Afegeix pas
            </button>
          </div>
          {errors.steps ? <p className="field-error">{errors.steps}</p> : null}
          {steps.length > 0 ? (
            <ul className="item-list">
              {steps.map((step, index) => (
                <li key={`${step}-${index}`}>
                  {step}
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeStep(index)}
                    aria-label={`Esborra pas ${index + 1}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="form-actions">
          <button type="button" className="secondary" onClick={resetForm}>
            Neteja el formulari
          </button>
          <button type="submit" className="primary">
            Desa la recepta
          </button>
        </div>
      </form>

      {toastVisible ? <div className="toast toast-success">Recepta afegida correctament</div> : null}
    </section>
  );
};

export default AddRecipeForm;
