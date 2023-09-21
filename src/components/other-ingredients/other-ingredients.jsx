import { useDrag, useDrop } from "react-dnd";
import s from './other-ingredients.module.css';
import {
  ConstructorElement,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { del, moveItem } from "../../services/constructorSlice";
import { useRef } from 'react';
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from 'prop-types';


export default function OtherIngredients({ item, index }) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [, dropRef] = useDrop({
    accept: 'item',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      dispatch(moveItem({ dragIndex, hoverIndex }))
      item.index = hoverIndex
    },
  });

  const [{ opacity }, dragRef, dragPreviewRef] = useDrag({
    type: 'item',
    item: () => {
      return { index }
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1
    })
  });

  dragRef(dropRef(ref));
  return (
    <div className={s.item} index={index} draggable style={{ opacity }} ref={dragPreviewRef}>
      <div ref={ref} >
        <DragIcon type="primary" />
      </div>

      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => {
          dispatch(del(item.key))
        }}
      />
    </div>
  )
};

OtherIngredients.propTypes = {
  item: ingredientPropType.isRequired,
  index: PropTypes.number
};