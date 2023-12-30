import { FC } from "react"

type EditProps = {
  position: Position,
  onClose?: () => void,
  onRemove?: () => void,
}

const Edit: FC<EditProps> = ({ position, onClose = () => {}, onRemove = () => {} }) => {
  return (
    <div 
      id="edit-menu" 
      className="absolute w-40 p-1 bg-city border border-black rounded-lg" 
      style={ {
        "top":  169 + position.y,
        "left": 499 + position.x
      } }>
      <div id="menu-header" className="relative flex justify-center border-dashed border-b border-black">
        <h3 className="text-xs font-bold">Edit</h3>
        <img 
          className="absolute right-0 self-center cursor-pointer"
          alt="Close"
          src="/assets/icons/menu_exit.gif"
          style={ { "width": "11px", "height": "11px" } }
          onClick={ onClose } />
      </div>
      <div id="menu-body">
        <button 
          className="text-xs border border-gray-400 rounded-sm w-full bg-gray-100 hover:bg-city cursor-pointer"
          onClick={ onRemove }>
          Remove
        </button>
      </div>
      <div id="menu-footer">

      </div>
    </div>
  );
}

export default Edit;