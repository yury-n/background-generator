import React from "react";
import classnames from "classnames";
import items from "../../../items";
import ImageUpload from "./ImageUpload";
import { Form, Button, Divider } from "antd";
import BorderFrame from "../../BorderFrame";

import s from "./Items.less";

export interface Props {
  selectedItems: number[];
  selectItem: ({ id: number }) => void;
  deselectItem: ({ id: number }) => void;
}

export const Items: React.FC<Props> = ({
  selectedItems,
  selectItem,
  deselectItem
}) => {
  return (
    <Form.Item label="Items" className={s["form-item-with-show-more"]}>
      <div className={s["layout-items"]}>
        <ImageUpload />
        {items.map((item, index) => {
          const isSelected = selectedItems.includes(item.id);
          return (
            <BorderFrame
              isActive={isSelected}
              key={index}
              className={classnames(s["item-thumb"])}
              onClick={() =>
                isSelected
                  ? deselectItem({ id: item.id })
                  : selectItem({ id: item.id })
              }
            >
              <img src={item.src} alt="image.png" />
            </BorderFrame>
          );
        })}
      </div>
      <Divider>
        <Button type="link" icon="down" className={s["show-more"]}>
          Show More
        </Button>
      </Divider>
    </Form.Item>
  );
};
Items.displayName = "Items";

export default Items;
