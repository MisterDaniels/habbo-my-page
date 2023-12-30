import { Stage } from 'react-konva';
import Item from './item';
import { FC } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';

type CanvasProps = {
  items?: Array<ItemsList>,
  isEditingItem?: boolean,
  isEditingMode?: boolean,
  onItemDrag?: () => void,
  onItemClick?: (e: KonvaEventObject<MouseEvent>, id: number, canvasIndex: number) => void
}

const Canvas: FC<CanvasProps> = ({ items = [], isEditingItem = false, isEditingMode = false, onItemDrag = () => {}, onItemClick = () => {} }) => {
  return (
    <Stage width={ 922 } height={ 1360 }>
      { items.map((item: ItemsList, index: number) => {
        if (item.isVisible) {
          return (
            <Item 
              key={ index }
              type={ item.type }
              props={ item.props }
              isEditingItem={ isEditingItem }
              isEditingMode={ isEditingMode }
              onDrag={ onItemDrag }
              onClick={ (e: KonvaEventObject<MouseEvent>) => { onItemClick(e, item.id, index) } } />
          );
        }
      }) }
    </Stage>
  );
};

export default Canvas;