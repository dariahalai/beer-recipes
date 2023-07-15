import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { nanoid } from 'nanoid';
import { useRecipes } from 'store';

export const BeersList = () => {
  const navigate = useNavigate();

  const {
    recipes,
    renderRecipes,
    loading,
    error,
    getAllRecipes,
    deleteRecipes,
    lazyLoading,
  } = useRecipes(
    state => ({
      recipes: state.recipes,
      renderRecipes: state.renderRecipes,
      getAllRecipes: state.getAllRecipes,
      loading: state.loading,
      error: state.error,
      deleteRecipes: state.deleteRecipes,
      lazyLoading: state.lazyLoading,
    }),
    shallow
  );
  useEffect(() => {
    if (recipes.length === 0) getAllRecipes();
  }, [getAllRecipes, recipes]);

  const shouldRender = !loading && !error;

  const [selectedRecipes, setSelectedRecipes] = useState([]);

  const toogleSelectedRecipes = id => {
    setSelectedRecipes(prev => {
      if (prev.includes(id)) {
        return prev.filter(recipeId => recipeId !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  const handleDelete = () => {
    deleteRecipes(selectedRecipes);
    setSelectedRecipes([]);
  };
  const handleNavigate = id => {
    navigate(`recipe/${id}`);
  };
  useEffect(() => {
    const trackScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeiht = document.documentElement.clientHeight;
      if (scrollTop + clientHeiht >= scrollHeight) {
        lazyLoading();
      }
    };
    window.onscroll = trackScroll;
  }, [lazyLoading, renderRecipes]);
  return (
    <>
      <Title>Beer`s Recipes List</Title>
      {loading && <h2>Loading ...</h2>}
      {error && <p>{error.message}</p>}
      {shouldRender && (
        <RecipesList>
          {renderRecipes.map(({ id, name, abv, image_url, description }) => (
            <li
              onContextMenu={() => toogleSelectedRecipes(id)}
              onClick={() => handleNavigate(id)}
              key={nanoid()}
            >
              <RecipeItem
                id="container-search"
                style={{
                  border: selectedRecipes.includes(id)
                    ? '2px solid #814EE7'
                    : 'none',
                }}
              >
                <Wrapper>
                  <h5>Name:</h5>
                  <p>{name}</p>
                </Wrapper>
                <Wrapper>
                  <h5>Abv:</h5>
                  <p> {abv}</p>
                </Wrapper>
                <AboutBeerText>
                  <img src={image_url} alt={name} width="75px" height="90px" />
                  <Wrapper>
                    <h5>About:</h5>
                    <p> {description}</p>
                  </Wrapper>
                </AboutBeerText>
              </RecipeItem>
            </li>
          ))}
        </RecipesList>
      )}
      {selectedRecipes.length !== 0 && (
        <Button onClick={handleDelete}>Remove</Button>
      )}
    </>
  );
};

const Title = styled.h1({
  margin: '20px 0',
  textAlign: 'center',
});
const RecipesList = styled.ul({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '20px',
  position: 'relative',
  margin: '20px auto 0',
});
const RecipeItem = styled.div({
  width: '250px',
  height: '370px',
  boxShadow:
    '12px 20px 9px rgba(46, 2, 100, 0.01), 7px 11px 8px rgba(46, 2, 100, 0.04), 3px 5px 6px rgba(46, 2, 100, 0.07), 1px 1px 3px rgba(46, 2, 100, 0.08), 0px 0px 0px rgba(46, 2, 100, 0.08)',
  padding: '16px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  '&:hover': {
    cursor: 'pointer',
  },
});
const AboutBeerText = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '20px',
});
const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
});
const Button = styled.button({
  position: 'fixed',
  top: 25,
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
