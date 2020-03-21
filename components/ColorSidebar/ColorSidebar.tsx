import React from "react";
import classnames from "classnames";
import ColorInput from "../ColorInput";
import { Color } from "../../types";
import { Button } from "antd";

import s from "./ColorSidebar.less";

export interface Props {
  configColors: any;
  className?: string;
  setBackgroundColor: (obj: Color) => void;
  setItemColor: (obj: { index: number; color: Color }) => void;
  addItemColor: () => void;
  removeItemColor: ({ index: number }) => void;
}

export const ColorSidebar: React.FC<Props> = ({
  className,
  configColors,
  setBackgroundColor,
  setItemColor,
  addItemColor,
  removeItemColor
}) => {
  return (
    <div className={classnames(s["root"], className)}>
      <Button className={s["palette-button"]} shape="circle" icon="appstore" />
      <ColorInput
        color={configColors.backgroundColor}
        setColor={setBackgroundColor}
      />
      {configColors.objectColors.map((itemColor, index) => (
        <div key={index} className={s["color-input-wrapper"]}>
          <ColorInput
            color={itemColor}
            setColor={newColor => setItemColor({ index, color: newColor })}
          />
          {index > 0 && (
            <Button
              className={s["remove-button"]}
              size="small"
              shape="circle"
              icon="close"
              onClick={() => removeItemColor({ index })}
            />
          )}
        </div>
      ))}
      <Button
        className={s["plus-button"]}
        shape="circle"
        icon="plus"
        onClick={addItemColor}
      />
    </div>
  );
};
ColorSidebar.displayName = "ColorSidebar";

export default ColorSidebar;
