import { create } from "zustand";

export const useRecipes = create((set) => ({
  recipes: [],
  cursor: 0,
  loading: false,
  error: null,
  getAllRecipes: async () => {
    set({ loading: true });

    try {
      const res = await fetch("https://api.punkapi.com/v2/beers?page=1");
      if (!res.ok) throw new Error("Failed to fetch");

      set({ recipes: await res.json(), error: null });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  deleteRecipes: (arrayId) => {
    set({ loading: true });
    set((state) => ({
      recipes: state.recipes.filter((recipe) => !arrayId.includes(recipe.id)),
    }));
    set({ loading: false });
  },
}));
