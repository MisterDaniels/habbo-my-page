import { ItemTypes } from "@/types/enums.d";
import { Layer as LayerType } from "konva/lib/Layer";
import { KonvaEventObject } from "konva/lib/Node";
import { ElementType, FC, useEffect, useRef, useState } from "react";
import { Image, Layer } from "react-konva";

type ItemProps = {
  type: ItemTypes,
  props: BackgroundProps | NoteProps | StickerProps | WidgetProps,
  isEditingItem?: boolean,
  isEditingMode?: boolean,
  onDrag?: () => void,
  onClick?: (e: KonvaEventObject<MouseEvent>) => void
}

const Item: FC<ItemProps> = ({ type, props, isEditingItem = false, isEditingMode = false, onDrag = () => {}, onClick = () => {} }) => {
  const layerRef = useRef<LayerType>(null);
  const [ DynamicComponent, setDynamicComponent ] = useState<ElementType<BackgroundProps | NoteProps | StickerProps | WidgetProps>>();
  const [ image, setImage ] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
      const img = new window.Image();
      img.src = `/assets/icons/edit_item_icon.gif`;
      img.onload = () => setImage(img);
  }, []);

  useEffect(() => {
    const importComponent = async () => {
      const module = await import(`./templates/${ type }`);

      if (module) {
        setDynamicComponent(() => module.default);
      }
    };

    importComponent();
  }, [ type ]);

  function startDrag() {
    layerRef.current?.moveToTop();
    onDrag();
  }

  return (
    <Layer draggable={ isEditingMode }
      ref={ layerRef }
      onDragStart={ startDrag }>
      { !isEditingItem && isEditingMode && 
        <Image 
          width={ 19 } 
          height={ 18 } 
          image={ image as CanvasImageSource } 
          onClick={ (e: KonvaEventObject<MouseEvent>) => { 
            onClick(e);
            document.body.style.cursor = 'default';
          } }
          onMouseOver={ () => {
            document.body.style.cursor = 'pointer';
          } }
          onMouseOut={ () => {
            document.body.style.cursor = 'default';
          } } />
      }
      { DynamicComponent &&
        <DynamicComponent { ...props as BackgroundProps | NoteProps | StickerProps | WidgetProps } />
      }
    </Layer>
  );
};

export default Item;