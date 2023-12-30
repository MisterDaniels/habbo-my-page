import { FC } from "react";
import { Text } from 'react-konva';

const Note: FC<NoteProps> = ({ position, text }) => {
    return (
        <Text draggable
            x={ position.x }
            y={ position.y }
            text={ text } />
    );
};

export default Note;