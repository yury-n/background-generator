import React from "react";
import classnames from "classnames";
import ColorInput from "../ColorInput";
import s from "./ColorInput.less";
import { FillType } from "../../types";

export interface Props {
  backgroundColor: { type: FillType; value: string };
  className?: string;
  setBackgroundColor: ({ color: string }) => void;
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
