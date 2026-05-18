import { FormEvent, useEffect, useRef, useState } from 'react';
import { Recipe } from '../../shared/types/Recipe';
import './EditRecipeForm.css';

interface EditRecipeFormProps {
  recipe: Recipe | null;
  onSave: (recipe: Recipe) => void;
  onCancel: () => void;
}

const EditRecipeForm = ({ recipe, onSave, onCancel }: EditRecipeFormProps) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [stepInput, setStepInput] = useState('');
  const [errors, setErrors] = useState<{ name?: string; ingredients?: string; steps?: string }>({});
  const [toastVisible, setToastVisible] = useState(false);
  const [originalRecipe, setOriginalRecipe] = useState<Recipe | null>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (recipe) {
      setName(recipe.name);
      setIngredients([...recipe.ingredients]);
      setSteps([...recipe.steps]);
      setOriginalRecipe(recipe);
      setIngredientInput('');
      setStepInput('');
      setErrors({});
      setToastVisible(false);
    } else {
      setName('');
      setIngredients([]);
      setSteps([]);
      setOriginalRecipe(null);
      setIngredientInput('');
      setStepInput('');
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

  const hasChanges = () => {
    if (!originalRecipe) return false;
    return (
      name.trim() !== originalRecipe.name ||
      ingredients.length !== originalRecipe.ingredients.length ||
      steps.length !== originalRecipe.steps.length ||
      ingredients.some((ing, idx) => ing !== originalRecipe.ingredients[idx]) ||
      steps.some((step, idx) => step !== originalRecipe.steps[idx])
    );
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

    onSave({
      ...recipe,
      name: name.trim(),
      ingredients,
      steps
    });

    showToast();
  };

  const handleCancel = () => {
    if (hasChanges()) {
      const confirmed = window.confirm('Tens canvis sense desar. Vols descartar-los?');
      if (!confirmed) {
        return;
      }
    }

    onCancel();
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
            onChange={(event) => {
              setName(event.target.value);
              if (errors.name) {
                setErrors((current) => ({ ...current, name: undefined }));
              }
            }}
          />
          {errors.name ? <p className="field-error">{errors.name}</p> : null}
        </div>

        <div className="form-group">
          <label htmlFor="edit-ingredient-input">Ingredients</label>
          <div className="inline-input-group">
            <input
              id="edit-ingredient-input"
              type="text"
              value={ingredientInput}
              onChange={(event) => setIngredientInput(event.target.value)}
              placeholder="Escriu un ingredient"
            />
            <button type="button" className="secondary" onClick={addIngredient}>
              Afegeix
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
          <label htmlFor="edit-step-input">Passos</label>
          <div className="inline-input-group">
            <input
              id="edit-step-input"
              type="text"
              value={stepInput}
              onChange={(event) => setStepInput(event.target.value)}
              placeholder="Escriu un pas"
            />
            <button type="button" className="secondary" onClick={addStep}>
              Afegeix
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

        <div className="edit-recipe-card__controls">
          <button type="button" className="danger" onClick={handleCancel}>
            Cancel·la
          </button>
          <button type="submit" className="primary">
            Desa canvis
          </button>
        </div>
      </form>

      {toastVisible ? (
        <div className="toast toast-success">Recepta actualitzada correctament</div>
      ) : null}
    </section>
  );
};

export default EditRecipeForm;
