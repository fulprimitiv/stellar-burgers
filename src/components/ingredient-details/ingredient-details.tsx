import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredients';
import { useNavigate, useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ingredients = useSelector(selectIngredients);
  const ingredientData = ingredients.find((item) => item._id === params.id);

  useEffect(() => {
    if (!params.id) {
      navigate('/', { replace: true });
    }
  }, []);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
