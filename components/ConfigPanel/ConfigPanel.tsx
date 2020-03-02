import React from "react";
import { Icon, Form, Layout } from "antd";
const { Sider } = Layout;
import NumberInput from "./NumberInput";
import RandomnessInput from "./RandomnessInput";
import Objects from "./Objects";
import Layouts from "./Layouts";

import s from "./ConfigPanel.less";

export interface Props {
  selectedObjectCount: number;
  objectColorCount: number;
}

export const ConfigPanel: React.FC<Props> = ({
  selectedObjectCount,
  objectColorCount
}) => {
  return (
    <Sider className={s["sider"]} width={330}>
      <h1 className={s["logo"]}>
        <Icon type="border-outer" className={s["logo-icon"]} />
        <a href="/">Background Generator</a>
      </h1>
      <Form layout="vertical" className={s["form"]}>
        <Layouts />
        <Objects />
        <Form.Item label="Object Size">
          <NumberInput configKey="itemSize" />
        </Form.Item>
        <Form.Item label="Object Count">
          <NumberInput configKey="itemCount" />
        </Form.Item>
        <Form.Item label="Padding %">
          <NumberInput configKey="padding" />
        </Form.Item>
        <Form.Item label="Randomize Position">
          <RandomnessInput
            boolFlagName="withRandomPosition"
            strengthFlagName="randomizePositionStrength"
          />
        </Form.Item>
        {objectColorCount > 1 && (
          <Form.Item label="Randomize Color">
            <RandomnessInput boolFlagName="withRandomColor" />
          </Form.Item>
        )}
        {selectedObjectCount > 1 && (
          <Form.Item label="Randomize Object Order">
            <RandomnessInput boolFlagName="withRandomObjectOrder" />
          </Form.Item>
        )}
      </Form>
    </Sider>
  );
};
ConfigPanel.displayName = "ConfigPanel";

export default ConfigPanel;
