import { create } from 'zustand';

export const useRecipes = create(set => ({
  recipes: [],
  renderRecipes: [],
  loading: false,
  error: null,
  countToRender: 15,
  getAllRecipes: async page => {
    set({ loading: true });

    try {
      const res = await fetch('https://api.punkapi.com/v2/beers?page=1');
      const data = await res.json();
      if (!res.ok) throw new Error('Failed to fetch');

      set({ recipes: data, error: null });
      set(state => ({
        renderRecipes: state.recipes.slice().splice(0, 15),
      }));
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  deleteRecipes: arrayId => {
    set({ loading: true });
    set(state => ({
      recipes: state.recipes.filter(recipe => !arrayId.includes(recipe.id)),
    }));
    set({ loading: false });
  },
  lazyLoading: () => {
    set({ loading: true });

    set(state => ({
      renderRecipes: state.renderRecipes.concat(
        state.recipes.slice().splice(state.countToRender, 5)
      ),
      countToRender: state.countToRender + 5,
    }));

    set({ loading: false });
  },
}));
