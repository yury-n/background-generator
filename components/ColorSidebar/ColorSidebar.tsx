import React from "react";
import classnames from "classnames";
import ColorInput from "../ColorInput";
import { Color } from "../../types";
import s from "./ColorInput.less";

export interface Props {
  backgroundColor: Color;
  className?: string;
  setBackgroundColor: (obj: Color) => void;
}

export const ColorSidebar: React.FC<Props> = ({
  className,
  backgroundColor,
  setBackgroundColor
}) => {
  return (
    <div className={classnames(s["root"], className)}>
      <ColorInput color={backgroundColor} setColor={setBackgroundColor} />
    </div>
  );
};
ColorSidebar.displayName = "ColorSidebar";

export default ColorSidebar;
