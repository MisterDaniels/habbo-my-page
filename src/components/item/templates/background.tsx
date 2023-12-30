import { FC, useEffect, useState } from "react";
import { Image } from 'react-konva';

const Background: FC<BackgroundProps> = ({ category, name, extension }) => {
    const [ image, setImage ] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        const img = new window.Image();
        img.src = `/assets/backgrounds/${ category }/${ name }.${ extension }`;
        img.onload = () => setImage(img);
    }, [ category, name, extension ]);

    return (
        <Image
            x={ 0 }
            y={ 0 }
            image={ image as CanvasImageSource } />
    );
};

export default Background;