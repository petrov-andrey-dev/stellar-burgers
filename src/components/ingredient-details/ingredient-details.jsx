import s from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

export default function IngredientDetails() {
    const { ingredientId } = useParams();

    const { ingredients } = useSelector(state => state.ingredients);
    const ingredient = useMemo(() => ingredients.find((item) => item._id === ingredientId), [ingredients, ingredientId]);
    
    return (
        <>
            <h2 className="text text_type_main-large">
                Детали ингредиента
            </h2>
            <img src={ingredient?.image_large} alt={ingredient?.name} />
            <p className="text text_type_main-medium mt-4">{ingredient?.name}</p>
            <ul className={`${s.nutritionList}`}>
                <li className={s.nutritionItem}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredient?.calories}</p>
                </li>
                <li className={s.nutritionItem}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredient?.proteins}</p>
                </li>
                <li className={s.nutritionItem}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredient?.fat}</p>
                </li>
                <li className={s.nutritionItem}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredient?.carbohydrates}</p>
                </li>
            </ul>
        </>
    )
};