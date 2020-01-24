import React from "react";
import BorderFrame from "../BorderFrame";

import s from "./ColorInput.less";

export interface Props {
  color: string;
}

export const ColorInput: React.FC<Props> = ({ color }) => {
  return (
    <div className={s["root"]}>
      <BorderFrame className={s["color-wrapper"]}>
        <div
          className={s["color"]}
          style={{
            background: color
          }}
        />
      </BorderFrame>
    </div>
  );
};
ColorInput.displayName = "ColorInput";

export default ColorInput;
