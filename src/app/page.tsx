'use client';
import Action from "@/components/button/action";
import dynamic from "next/dynamic";
import { ActionTypes, Categories, ItemTypes } from "@/types/enums.d";
import Open from "@/components/button/open";
import { useState } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import Edit from "@/components/edit";
import Inventory from "@/components/inventory";

type EditMenuProps = {
  isActive: boolean,
  position: Position,
  itemId: number,
  canvasIndex: number
}

const Canvas = dynamic(() => import('../components/canvas'), {
  ssr: false
});

export default function Home() {
  const [ editMenu, setEditMenu ] = useState<EditMenuProps>({
    isActive: false,
    position: {
      x: 0,
      y: 0
    } as Position
  } as EditMenuProps);
  const [ items, setItems ] = useState<Array<ItemsList>>([
    {
      id: 0,
      type: ItemTypes.Sticker,
      props: {
        category: Categories.General,
        name: 'addogs',
        text: 'I love pets',
        extension: 'gif',
        position: {
          x: 10,
          y: 10
        } as Position
      } as StickerProps,
      isVisible: true,
      quantity: 2
    } as ItemsList,
    {
      id: 0,
      type: ItemTypes.Background,
      props: {
        category: Categories.General,
        name: 'bg_rain',
        text: 'Its raining',
        extension: 'gif'
      } as BackgroundProps,
      isVisible: true,
      quantity: 1
    } as ItemsList
  ]);
  const [ canvasItems, setCanvasItems ] = useState<Array<ItemsList>>([]);
  const [ isInventoryOpen, setIsInventoryOpen ] = useState<boolean>(false);
  const [ isEditingMode, setIsEditingMode ] = useState<boolean>(false);

  function openMenu(e: KonvaEventObject<MouseEvent>, id: number, canvasIndex: number): void {
    setEditMenu({
      isActive: true,
      position: {
        x: e.target.parent?.attrs.x,
        y: e.target.parent?.attrs.y
      } as Position,
      itemId: id,
      canvasIndex: canvasIndex
    } as EditMenuProps);
  }

  function placeItem(index: number): void {
    let newItems = [...items];
    newItems[index].quantity -= 1;
    setItems(newItems);

    let newCanvasItems = [...canvasItems];
    newCanvasItems.push({ ...newItems[index] });
    setCanvasItems(newCanvasItems);

    setIsInventoryOpen(false);
  }

  function removeItem(): void {
    let newItems = [...items];
    const itemIndex = newItems.findIndex((newItem: ItemsList) => newItem.id === editMenu.itemId);

    if (itemIndex === -1) return;

    newItems[itemIndex].quantity += 1;

    let newCanvasItems = [...canvasItems];
    newCanvasItems[editMenu.canvasIndex].isVisible = false;
    setCanvasItems(newCanvasItems);

    setEditMenu({
      isActive: false,
      position: {
        x: 0,
        y: 0
      } as Position
    } as EditMenuProps);
  }

  function stopEditing(): void {
    setIsEditingMode(false);
    setEditMenu({
      isActive: false,
      position: {
        x: 0,
        y: 0
      } as Position
    } as EditMenuProps);
  }

  function saveEditing(): void {
    stopEditing();
  }

  return (
    <main className="bg-desert bg-desert-habbo font-arial flex min-h-screen flex-col items-center justify-between p-24">
      <div id="page" className="flex flex-col bg-white rounded-md border border-gray-400">
        <div id="header" className="flex flex-row border-b border-sky w-full px-2 py-1">
          { !isEditingMode &&
            <Action type={ ActionTypes.Edit } onClick={ () => { setIsEditingMode(true) } } />
          }
          <p className={ `text-sm font-bold text-sky self-center ${ !isEditingMode ? 'ml-3' : '' }` }>Testzera</p>
        </div>
        { isEditingMode &&
          <div id="sub-header" className="flex w-full p-2 justify-between">
            <div>
              <Open text="Inventory" icon="inventory" onClick={ () => { setIsInventoryOpen(true) } } />
            </div>
            <div className="flex">
              <Action className="mr-2" type={ ActionTypes.Save } onClick={ saveEditing } />
              <Action type={ ActionTypes.Cancel } onClick={ stopEditing } />
            </div>
          </div>
        }
        <div id="body" className="w-[922px] h-[1360px] my-2">
          <Canvas
            items={ canvasItems }
            isEditingItem={ editMenu.isActive }
            isEditingMode={ isEditingMode }
            onItemDrag={ () => { setEditMenu({
              isActive: false,
              position: {
                x: 0,
                y: 0
              } as Position
            } as EditMenuProps) } }
            onItemClick={ openMenu } />
        </div>
        { isEditingMode && editMenu.isActive && editMenu.itemId !== null &&
          <Edit 
            position={ editMenu.position } 
            onClose={ () => {
              setEditMenu({
                isActive: false,
                position: {
                  x: 0,
                  y: 0
                } as Position
              } as EditMenuProps);
            } }
            onRemove={ removeItem } />
        }
        { isEditingMode && isInventoryOpen &&
          <Inventory 
            items={ items } 
            onClose={ () => { setIsInventoryOpen(false) } }
            onPlace={ placeItem } />
        }
      </div>
    </main>
  )
}
