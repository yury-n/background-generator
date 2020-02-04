import React from "react";
import classnames from "classnames";
import ColorInput from "../ColorInput";
import s from "./ColorInput.less";

export interface Props {
  className?: string;
}

export const ColorSidebar: React.FC<Props> = ({ className }) => {
  return (
    <div className={classnames(s["root"], className)}>
      <ColorInput color="#fff" />
      <ColorInput color="#000" />
    </div>
  );
};
ColorSidebar.displayName = "ColorSidebar";

export default ColorSidebar;
