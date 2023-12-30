import { FC, useEffect, useState } from "react";
import Action from "./button/action";
import { ActionTypes, ItemTypes } from "@/types/enums.d";

type InventoryProps = {
  items: Array<ItemsList>,
  onClose?: () => void,
  onPlace?: (index: number) => void
}

const Inventory: FC<InventoryProps> = ({ items = [], onClose = () => {}, onPlace = () => {} }) => {
  const [ activeItem, setActiveItem ] = useState<number | null>(null);
  const [ activeCategory, setActiveCategory ] = useState<number>(0);

  useEffect(() => {
    setActiveItem(null);
  }, [ activeCategory ]);

  const categories = [ ItemTypes.Sticker, ItemTypes.Background, ItemTypes.Widget, ItemTypes.Note ];

  return (
    <div 
      id="inventory"
      className="flex items-center justify-center top-0 left-0 absolute w-full h-full">
      <div className="absolute w-full h-full bg-black bg-opacity-30"></div>
      <div id="inventory-modal" className="absolute flex flex-col mb-52 bg-white border border-black rounded-md max-w-[895px]">
        <div id="inventory-header" className="flex h-fit border-b border-black">
          <ul id="inventory-tabs" className="font-bold text-xs pt-1 px-2">
            <li className="px-3 border-t border-x border-black rounded-t-md cursor-pointer">Inventory</li>
          </ul>
          <img className="absolute w-[15px] h-[15px] right-0 self-center mr-2 cursor-pointer" alt="Close" src="/assets/icons/inventory_exit.png" onClick={ onClose } />
        </div>
        <div id="inventory-body" className="flex px-3 py-5 text-xs">
          <div id="inventory-categories">
            <p>Categories:</p>
            <div className="mt-1 bg-image-placeholder w-[150px] h-[306px]">
              <ul>
                { categories.map((category: ItemTypes, index: number) => {
                  return (
                    <li key={ index } className={ `px-3 bg-city-dark capitalize ${ category.length - 1 !== index ? 'border-x border-t' : 'border' } border-black cursor-pointer [&.active]:bg-city ${ activeCategory === index ? 'active' : '' }` }
                      onClick={ () => { setActiveCategory(index) } }>
                      { `${ category }s` }
                    </li>
                  );
                }) }
              </ul>
            </div>
          </div>
          <div id="inventory-items" className="ml-2 w-[516px]">
            <p>Select an item by clicking it</p>
            <div className="mt-1">
              <ul className="flex flex-wrap gap-1">
                { items.map((item: ItemsList, index: number) => {
                  if (item.quantity > 0 && item.type === categories[activeCategory]) { 
                    return (
                      <li key={ index } className={ `relative w-[61px] h-[61px] bg-image-placeholder [&.active]:outline [&.active]:outline-2 outline-tangerino cursor-pointer ${ activeItem === index  ? 'active' : '' }` }
                        onClick={ () => { setActiveItem(index) } }>
                        { item.quantity > 1 && 
                          <span className="absolute right-0 mr-1 mt-1 bg-greemish text-white font-bold px-2 border border-white rounded">x{ item.quantity }</span>
                        }
                      </li>
                    );
                  }
                }) }
              </ul>
            </div>
          </div>
          <div id="inventory-preview" className="w-[150px] ml-5 mt-5 relative">
            <div className={ `w-[150px] h-[150px] ${ activeItem !== null ? 'border border-black' : ''}` }>
              { activeItem !== null && (items[activeItem]?.props as SingleImageComponentProps)?.name && 
                <img 
                  className="w-full h-full object-none"
                  alt={ (items[activeItem].props as SingleImageComponentProps).name } 
                  src={ `/assets/${ categories[activeCategory] }s/${ (items[activeItem].props as SingleImageComponentProps).category }/${ (items[activeItem].props as SingleImageComponentProps).name }.${ (items[activeItem].props as SingleImageComponentProps)?.extension ?? 'png' }` } />
              }
            </div>
            <div className="mt-2 flex flex-row-reverse">
              { activeItem !== null && 
                <Action type={ ActionTypes.Generic } text="Place" onClick={ () => { onPlace(activeItem) } } />
              }
            </div>
            <div className="absolute bottom-0 right-0">
              <Action type={ ActionTypes.Generic } text="Close" onClick={ onClose } />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;