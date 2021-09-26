import { CustomOffCanvas, CustomOffCanvasProps } from "../custom-off-canvas";
import {
  SocialMediaShareMenu,
  SocialMediaShareMenuProps,
} from "desktop-app/components/social-media-share-menu";

const offCanvasStyle = {
  content: {
    backgroundColor: "white",
    boxShadow: "0px 0px 20px #0000001a",
    borderRadius: "8px 8px 0 0",
  },
};

function getMergedStyles(style: CustomOffCanvasProps["style"]) {
  if (!style) return offCanvasStyle;
  const styleCopy = { ...style };
  styleCopy.content = { ...offCanvasStyle.content, ...styleCopy?.content };
  return styleCopy;
}

export type OffCanvasShareLinkMenuProps = {
  closeOnClickItem?: boolean;
} & Omit<CustomOffCanvasProps, "children"> &
  SocialMediaShareMenuProps;

function OffCanvasShareLinkMenu({
  style,
  width,
  height,
  closeOnClickItem = true,
  ...props
}: OffCanvasShareLinkMenuProps) {
  const {
    className,
    itemClassName,
    link,
    message,
    mailSubject,
    onClickItem: onClickItemProp,
    ...offCanvasProps
  } = props;

  function onClickItem(item) {
    onClickItemProp?.(item);
    if (!closeOnClickItem) return;
    props?.onClose?.();
  }

  return (
    <CustomOffCanvas
      position="bottom"
      width="100%"
      height="auto"
      style={getMergedStyles(style)}
      {...offCanvasProps}
    >
      <SocialMediaShareMenu
        className={className}
        itemClassName={itemClassName}
        link={link}
        message={message}
        mailSubject={mailSubject}
        onClickItem={onClickItem}
      />
    </CustomOffCanvas>
  );
}

export { OffCanvasShareLinkMenu };
