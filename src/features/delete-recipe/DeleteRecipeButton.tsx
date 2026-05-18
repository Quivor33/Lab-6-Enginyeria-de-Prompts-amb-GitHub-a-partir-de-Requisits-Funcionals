import './DeleteRecipeButton.css';

interface DeleteRecipeButtonProps {
  recipeId: string;
  onDelete: (recipeId: string) => void;
}

const DeleteRecipeButton = ({ recipeId, onDelete }: DeleteRecipeButtonProps) => (
  <button type="button" className="danger delete-recipe-button" onClick={() => onDelete(recipeId)}>
    Esborra
  </button>
);

export default DeleteRecipeButton;
