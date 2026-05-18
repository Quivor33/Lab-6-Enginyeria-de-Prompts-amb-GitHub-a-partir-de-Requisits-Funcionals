import { Recipe } from '../types/Recipe';

const STORAGE_KEY = 'gestio-receptes';

export function loadRecipes(): Recipe[] {
  try {
    const item = window.localStorage.getItem(STORAGE_KEY);
    return item ? (JSON.parse(item) as Recipe[]) : [];
  } catch (error) {
    console.warn('Unable to load recipes from localStorage', error);
    return [];
  }
}

export function saveRecipes(recipes: Recipe[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  } catch (error) {
    console.warn('Unable to save recipes to localStorage', error);
  }
}

export function removeRecipe(id: string) {
  try {
    const recipes = loadRecipes();
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(recipes.filter((recipe) => recipe.id !== id))
    );
  } catch (error) {
    console.warn('Unable to remove recipe from localStorage', error);
  }
}
