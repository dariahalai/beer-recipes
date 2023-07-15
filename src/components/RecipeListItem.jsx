import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { nanoid } from 'nanoid';
import { useRecipes } from 'store';

export const RecipeListItem = () => {
  const navigate = useNavigate();
  const { recipeId } = useParams();

  const { recipes } = useRecipes(state => ({
    recipes: state.recipes,
  }));
  const currentRecipe = recipes.find(recipe => recipe.id === Number(recipeId));
  const { name, abv, image_url, description, ingredients, method, volume } =
    currentRecipe;

  const handleNavigateGoBack = () => {
    navigate('/');
  };
  return (
    <>
      <Button onClick={handleNavigateGoBack}>Go back</Button>
      <RecipeCard>
        <Wrapper>
          <h5>Name:</h5>
          <p> {name}</p>
        </Wrapper>
        <Wrapper>
          <h5>Abv:</h5>
          <p> {abv}</p>
        </Wrapper>
        <TextWrapper>
          <img src={image_url} alt={name} width="150px" height="350px" />
          <div>
            <Wrapper>
              <h5>About:</h5>
              <p>{description}</p>
            </Wrapper>
            <div>
              <h5>Recipe:</h5>
              <SubTitle>Hops:</SubTitle>
              <ul>
                {ingredients.hops.map(({ amount: { value, unit }, name }) => (
                  <li key={nanoid()}>
                    <p>
                      {name}, {value} {unit}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SubTitle>Malt:</SubTitle>
              <ul>
                {ingredients.malt.map(({ amount: { value, unit }, name }) => (
                  <li key={nanoid()}>
                    <p>
                      {name}, {value} {unit}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SubTitle>Yeast:</SubTitle>
              <p>{ingredients.yeast}</p>
            </div>
            <div>
              <h5>Cooking method:</h5>
              <div>
                <SubTitle>Fermentation:</SubTitle>

                <p>
                  {method.fermentation.temp.value}
                  {method.fermentation.temp.unit}
                </p>
              </div>
              <div>
                <SubTitle>Mash temp:</SubTitle>
                <ul>
                  {method.mash_temp.map(
                    ({ duration, temp: { value, unit } }) => (
                      <li key={nanoid()}>
                        <p>
                          Duration:{duration}, {value}
                          {unit}
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </div>
              {method.twist && (
                <div>
                  <SubTitle>Twist</SubTitle>
                  <p>{method.twist}</p>
                </div>
              )}
            </div>
            <h5>
              Volume: {volume.value} {volume.unit}
            </h5>
          </div>
        </TextWrapper>
      </RecipeCard>
    </>
  );
};

const RecipeCard = styled.div({
  width: '800px',
  padding: '16px',
  overflow: 'hidden',
  margin: '20px auto 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  boxShadow:
    '12px 20px 9px rgba(46, 2, 100, 0.01), 7px 11px 8px rgba(46, 2, 100, 0.04), 3px 5px 6px rgba(46, 2, 100, 0.07), 1px 1px 3px rgba(46, 2, 100, 0.08), 0px 0px 0px rgba(46, 2, 100, 0.08)',
});
const TextWrapper = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '70px',
});
const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
});
const SubTitle = styled.p({
  textDecoration: 'underline',
});
const Button = styled.button({
  position: 'fixed',
  top: 5,
  left: 5,
  borderRadius: '8px',
  background: '#814EE7',
  padding: '8px 20px',
  color: 'white',
  border: 'none',
  '&:hover': {
    cursor: 'pointer',
    background: '#A076F5',
  },
});
