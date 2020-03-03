import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Input, Slider } from "antd";
import { getConfigValue } from "../../../selectors";
import { setConfigValue } from "../../../actions";

import s from "./NumberInput.less";

export interface Props {
  configKey: string;
}

export const NumberInput: React.FC<Props> = ({ configKey }) => {
  const dispatch = useDispatch();
  const configValue = useSelector(getConfigValue(configKey), shallowEqual);

  const setConfigValueFromInput = e =>
    dispatch(
      setConfigValue({
        configKey,
        configValue: +e.target.value
      })
    );

  return (
    <div className={s["config-input-wrapper"]}>
      <Input
        min={1}
        max={20}
        key={configValue}
        defaultValue={configValue}
        className={s["config-input"]}
        onBlur={setConfigValueFromInput}
        onPressEnter={setConfigValueFromInput}
      />
      <Slider
        min={1}
        max={100}
        value={configValue}
        onChange={value =>
          dispatch(
            setConfigValue({
              configKey,
              configValue: value
            })
          )
        }
      />
    </div>
  );
};
NumberInput.displayName = "NumberInput";

export default NumberInput;
