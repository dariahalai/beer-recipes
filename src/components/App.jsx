import { Route, Routes } from 'react-router-dom';
import { RecipesPage } from '../pages/RecipesPage';
import { BeerRecipePage } from '../pages/BeerRecipePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RecipesPage />} />
      <Route path="recipe/:recipeId" element={<BeerRecipePage />} />
    </Routes>
  );
};

export default App;
