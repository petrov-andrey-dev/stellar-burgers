import s from './ingredient-details.module.css';
import { ingredientPropType } from '../../utils/prop-types';
import { useSelector } from 'react-redux';

export default function IngredientDetails() {
    const {details} = useSelector(state => state.modal);

    return (
        <>
            <h2 className="text text_type_main-large">
                Детали ингредиента
            </h2>
            <img src={details.image_large} alt={details.name} />
            <p className="text text_type_main-medium mt-4">{details.name}</p>
            <ul className={`${s.nutritionList}`}>
                <li className={s.nutritionItem}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className='text text_type_digits-default text_color_inactive'>{details.calories}</p>
                </li>
                <li className={s.nutritionItem}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{details.proteins}</p>
                </li>
                <li className={s.nutritionItem}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{details.fat}</p>
                </li>
                <li className={s.nutritionItem}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{details.carbohydrates}</p>
                </li>
            </ul>
        </>
    )
};

IngredientDetails.propTypes = {
    details: ingredientPropType
};