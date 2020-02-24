import React from "react";
import classnames from "classnames";
import ColorInput from "../ColorInput";
import { Color } from "../../types";
import s from "./ColorInput.less";
import { Icon, Button } from "antd";

export interface Props {
  configColors: any;
  className?: string;
  setBackgroundColor: (obj: Color) => void;
  setItemColor: (obj: { index: number; color: Color }) => void;
}

export const ColorSidebar: React.FC<Props> = ({
  className,
  configColors,
  setBackgroundColor,
  setItemColor
}) => {
  return (
    <div className={classnames(s["root"], className)}>
      <Button
        type="dashed"
        className={s["plus-button"]}
        shape="circle"
        icon="appstore"
      />
      <ColorInput
        color={configColors.backgroundColor}
        setColor={setBackgroundColor}
      />
      <ColorInput
        color={configColors.itemColors[0]}
        setColor={color => setItemColor({ index: 0, color })}
      />
      <Button
        type="dashed"
        className={s["plus-button"]}
        shape="circle"
        icon="plus"
      />
    </div>
  );
};
ColorSidebar.displayName = "ColorSidebar";

export default ColorSidebar;
