import ingredientDetailsStyles from './ingredient-details.module.css';
import { ingredientPropType } from '../../utils/prop-types';

export default function IngredientDetails({ details }) {
    return (
        <>
            <h2 className="text text_type_main-large">
                Детали ингредиента
            </h2>
            <img src={details.image} alt={details.name} />
            <p className="text text_type_main-medium mt-4">{details.name}</p>
            <ul className={`${ingredientDetailsStyles.nutritionList}`}>
                <li className={ingredientDetailsStyles.nutritionItem}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className='text text_type_digits-default text_color_inactive'>{details.calories}</p>
                </li>
                <li className={ingredientDetailsStyles.nutritionItem}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{details.proteins}</p>
                </li>
                <li className={ingredientDetailsStyles.nutritionItem}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{details.fat}</p>
                </li>
                <li className={ingredientDetailsStyles.nutritionItem}>
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