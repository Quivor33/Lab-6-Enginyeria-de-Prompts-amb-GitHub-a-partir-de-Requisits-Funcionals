import { useEffect, useMemo, useState } from 'react';
import { Recipe } from '../types/Recipe';
import { loadRecipes, saveRecipes, removeRecipe as removeRecipeFromStorage } from '../utils/storage';

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>(() => loadRecipes());
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    saveRecipes(recipes);
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    if (!searchTerm.trim()) {
      return recipes;
    }

    const term = searchTerm.toLowerCase();
    return recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(term) ||
        recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(term)) ||
        recipe.steps.some((step) => step.toLowerCase().includes(term))
    );
  }, [recipes, searchTerm]);

  const addRecipe = (recipe: Recipe) => {
    setRecipes((current) => [recipe, ...current]);
  };

  const updateRecipe = (updatedRecipe: Recipe) => {
    setRecipes((current) => current.map((recipe) => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe)));
    setEditingRecipe(null);
  };

  const deleteRecipe = (id: string) => {
    setRecipes((current) => current.filter((recipe) => recipe.id !== id));
    removeRecipeFromStorage(id);
  };

  const selectRecipe = (id: string) => {
    const recipe = recipes.find((item) => item.id === id) ?? null;
    setEditingRecipe(recipe);
  };

  const clearSelection = () => setEditingRecipe(null);

  return {
    recipes,
    filteredRecipes,
    searchTerm,
    setSearchTerm,
    editingRecipe,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    selectRecipe,
    clearSelection
  };
}
