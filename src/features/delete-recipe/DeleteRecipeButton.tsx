import { useState, useEffect } from 'react';
import './DeleteRecipeButton.css';

interface DeleteRecipeButtonProps {
  recipeId: string;
  onDelete: (recipeId: string) => void;
}

const DeleteRecipeButton = ({ recipeId, onDelete }: DeleteRecipeButtonProps) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleDeleteClick = () => {
    setIsConfirming(true);
  };

  const handleConfirmDelete = () => {
    onDelete(recipeId);
    setIsConfirming(false);
    setShowToast(true);
  };

  const handleCancel = () => {
    setIsConfirming(false);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="delete-recipe-button-container">
      {!isConfirming ? (
        <button
          type="button"
          className="danger delete-recipe-button"
          onClick={handleDeleteClick}
        >
          Esborra
        </button>
      ) : (
        <div className="delete-recipe-confirmation">
          <p className="delete-recipe-confirmation-label">Estàs segur?</p>
          <div className="delete-recipe-confirmation-buttons">
            <button
              type="button"
              className="danger delete-recipe-confirm-btn"
              onClick={handleConfirmDelete}
            >
              Sí, esborra
            </button>
            <button
              type="button"
              className="secondary delete-recipe-cancel-btn"
              onClick={handleCancel}
            >
              Cancel·la
            </button>
          </div>
        </div>
      )}
      {showToast && (
        <div className="delete-recipe-toast">
          Recepta eliminada correctament
        </div>
      )}
    </div>
  );
};

export default DeleteRecipeButton;
