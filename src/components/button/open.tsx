import { FC } from "react";

type OpenProps = {
  text?: string,
  icon?: string,
  className?: string,
  onClick?: () => void
}

const Open: FC<OpenProps> = ({ text, icon, className = '', onClick = () => {} }) => {
  return (
    <a className={ `flex ${ className } text-xs text-black cursor-pointer decoration-solid underline-offset-1 hover:underline` }
      onClick={ onClick }>
      { icon && 
        <img className="w-4 h-4 mr-1" alt={ icon } src={ `/assets/icons/${ icon }_icon.png` } />
      }
      { text }
    </a>
  );
};

export default Open;