import {
  ConstructorElement,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { del, moveItem } from "../../services/constructorSlice";
import { TIngredient } from "../../types/types";
import { useAppDispatch } from "../../utils/hook";
import s from './other-ingredients.module.css';

type TOtherIngredientsProps = {
  item: TIngredient;
  index: number;
}

export default function OtherIngredients({ item, index }: TOtherIngredientsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [, dropRef] = useDrop({
    accept: 'item',
    hover(item: TIngredient & {index: number}, monitor) {
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
      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0
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
    <div 
    className={s.item} 
    // index={index} 
    draggable 
    style={{ opacity }} 
    ref={dragPreviewRef}>
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
