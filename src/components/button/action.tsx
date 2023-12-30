import { FC } from "react";
import { ActionTypes } from "@/types/enums.d";

type ActionProps = {
  text?: string,
  type?: ActionTypes,
  className?: string,
  onClick?: () => void
}

const actionVariants: Record<ActionTypes, string> = {
  [ActionTypes.Add]: 'bg-gradient-normal hover:bg-gradient-normal-hover text-black',
  [ActionTypes.Cancel]: 'bg-gradient-cancel hover:bg-gradient-cancel-hover text-white',
  [ActionTypes.Edit]: 'bg-gradient-edit hover:bg-gradient-edit-hover text-white',
  [ActionTypes.Save]: 'bg-gradient-save hover:bg-gradient-save-hover text-white',
  [ActionTypes.Generic]: 'bg-gradient-normal hover:bg-gradient-normal-hover text-black'
}

const Action: FC<ActionProps> = ({ text, type = ActionTypes.Add, className = '', onClick = () => {} }) => {
  let buttonText;
  switch(type) {
    case ActionTypes.Edit:
      buttonText = 'Edit';
      break;
    case ActionTypes.Save:
      buttonText = 'Save changes';
      break;
    case ActionTypes.Cancel:
      buttonText = 'Cancel editing';
      break;
    case ActionTypes.Add:
      buttonText = `Add ${ text ? text : '' }`;
      break;
    default:
      buttonText = text;
  }

  const button = type === ActionTypes.Add ? 'text-red' : 'text-blue';
  return (
    <button className={ `flex items-center font-bold text-xs px-3 py-1 border-2 border-black rounded ${ actionVariants[type] } ${ className }` }
      onClick={ onClick }>
      { type !== ActionTypes.Add && type !== ActionTypes.Generic && 
        <img className="mr-2" alt={ type } src={ `/assets/icons/${ type }_icon.png` } />
      }
      { buttonText }
    </button>
  );
};

export default Action;