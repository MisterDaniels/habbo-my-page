type Position = {
  x: number,
  y: number
}

type SingleImageComponentProps = {
  category: Categories,
  name: string,
  text: string,
  extension?: AssetExtensions
}

type DynamicComponentProps = {
  position: Position
}

type SkinnedComponentProps = {
  skin: Skins
}

interface SingleImageComponentBaseProps extends SingleImageComponentProps { }
interface DynamicComponentBaseProps extends DynamicComponentProps { }
interface SkinnedComponentBaseProps extends SkinnedComponentProps { }

type BackgroundProps = SingleImageComponentBaseProps & {}

type NoteProps = DynamicComponentBaseProps & {
  text: string
}

type StickerProps = SingleImageComponentBaseProps & DynamicComponentBaseProps & {}

type WidgetProps = DynamicComponentBaseProps & SkinnedComponentBaseProps & {}

type ItemsList = {
  id: number,
  type: ItemTypes,
  props: BackgroundProps | NoteProps | StickerProps | WidgetProps,
  isVisible: boolean,
  quantity: number
}