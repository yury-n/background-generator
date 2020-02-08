import React from "react";
import classnames from "classnames";
import { Icon, Form, Layout, Button, Divider } from "antd";
const { Sider } = Layout;
import BorderFrame from "../BorderFrame";
import s from "./ConfigPanel.less";
import NumberInput from "./NumberInput";
import RandomnessInput from "./RandomnessInput";

export interface Props {}

export const ConfigPanel: React.FC<Props> = props => {
  return (
    <Sider className={s["sider"]} width={330}>
      <h1 className={s["logo"]}>
        <Icon type="border-outer" className={s["logo-icon"]} />
        <a href="/">Background Generator</a>
      </h1>
      <Form layout="vertical" className={s["form"]}>
        <Form.Item label="Layouts" className={s["form-item-with-show-more"]}>
          <div className={s["layouts"]}>
            <BorderFrame isActive className={classnames(s["layout-thumb"])}>
              <img src="/layout_thumbs/1.png" alt="image.png" />
            </BorderFrame>
          </div>
          <Divider>
            <Button type="link" icon="down">
              Show more
            </Button>
          </Divider>
        </Form.Item>
        <Form.Item label="Item" className={s["form-item-with-show-more"]}>
          <div className={s["layout-items"]}>
            <BorderFrame
              className={classnames(s["item-thumb"], s["upload-item-thumb"])}
            >
              <Icon type="upload" />
              <span>Upload</span>
            </BorderFrame>
            <BorderFrame className={classnames(s["item-thumb"])}>
              <img src="/item_thumb/2.svg" alt="image.png" />
            </BorderFrame>
            <BorderFrame className={classnames(s["item-thumb"])}>
              <img src="/item_thumb/1.svg" alt="image.png" />
            </BorderFrame>
            <BorderFrame isActive className={classnames(s["item-thumb"])}>
              <img src="/item_thumb/3.svg" alt="image.png" />
            </BorderFrame>
          </div>
          <Divider>
            <Button type="link" icon="down">
              Show more
            </Button>
          </Divider>
        </Form.Item>
        <Form.Item label="Item Size">
          <NumberInput configKey="itemSize" />
        </Form.Item>
        <Form.Item label="Item Count">
          <NumberInput configKey="itemCount" />
        </Form.Item>
        <Form.Item label="Padding">
          <NumberInput configKey="padding" />
        </Form.Item>
        <Form.Item label="Randomness">
          <RandomnessInput />
        </Form.Item>
      </Form>
    </Sider>
  );
};
ConfigPanel.displayName = "ConfigPanel";

export default ConfigPanel;
