import { AssetExtensions } from "@/types/enums.d";
import { FC, useEffect, useState } from "react";
import { Image } from 'react-konva';

const Sticker: FC<StickerProps> = ({ category, name, extension = AssetExtensions.Gif, position }) => {
    const [ image, setImage ] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        const img = new window.Image();
        img.src = `/assets/stickers/${ category }/${ name }.${ extension }`;
        img.onload = () => setImage(img);
    }, [ category, name, extension ]);

    return (
        <Image
            x={ position.x }
            y={ position.y }
            image={ image as CanvasImageSource } />
    );
};

export default Sticker;