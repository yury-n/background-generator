import classnames from "classnames";
import {
  Icon,
  Form,
  Switch,
  Layout,
  Button,
  Slider,
  Row,
  Col,
  Input,
  Menu,
  Dropdown
  // Divider
} from "antd";
import Head from "next/head";
import { Stage, Layer, Rect, Circle } from "react-konva";
import random from "lodash.random";
const { Header, Content, Sider } = Layout;
import ColorInput from "../components/ColorInput";
import BorderFrame from "../components/BorderFrame";
import { withRedux } from "../lib/withRedux";
import Dimensions from "../components/Dimensions";

import "antd/dist/antd.css";
import s from "./index.less";

const downloadMenu = (
  <Menu>
    <Menu.Item key="1">Download as SVG</Menu.Item>
  </Menu>
);

const IndexPage = () => {
  let stageRef;
  const width = 600;
  const height = 600;
  const itemCount = 50;

  const totalArea = width * height;
  const pointArea = totalArea / itemCount;
  const length = Math.sqrt(pointArea);

  const randPower = 0;

  const dots = [];
  for (let i = length / 2; i < width; i += length) {
    for (let j = length / 2; j < height; j += length) {
      const x = i + (random(0, length) - length / 2) * randPower;
      const y = j + (random(0, length) - length / 2) * randPower;
      dots.push(
        <Circle
          key={`${i}-${j}`}
          x={x}
          y={y}
          radius={2}
          fill="#000"
          draggable
        />
      );
    }
  }

  return (
    <>
      <Head>
        <title>Background Generator</title>
        <link rel="icon" type="image/png" href="/favicon.png"></link>
      </Head>
      <Layout>
        <Layout>
          <Sider className={s["sider"]} width={330}>
            <h1 className={s["logo"]}>
              <Icon type="border-outer" className={s["logo-icon"]} />
              <a href="/">Background Generator</a>
            </h1>
            <Form layout="vertical" className={s["form"]}>
              <Form.Item label="Layouts">
                <div className={s["layouts"]}>
                  <BorderFrame
                    isActive
                    className={classnames(s["layout-thumb"])}
                  >
                    <img src="/layout_thumbs/1.png" alt="image.png" />
                  </BorderFrame>
                </div>
                {/* <Divider>
                  <Button type="link" icon="down">
                    Show more
                  </Button>
                </Divider> */}
              </Form.Item>
              <Form.Item label="Item">
                <div className={s["layout-items"]}>
                  <BorderFrame
                    className={classnames(
                      s["item-thumb"],
                      s["upload-item-thumb"]
                    )}
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
                {/* <Divider>
                  <Button type="link" icon="down">
                    Show more
                  </Button>
                </Divider> */}
              </Form.Item>
              <Form.Item label="Item Size">
                <div className={s["config-input-wrapper"]}>
                  <Input
                    min={1}
                    max={20}
                    value={0}
                    className={s["config-input"]}
                  />
                  <Slider min={1} max={20} value={10} />
                </div>
              </Form.Item>
              <Form.Item label="Item Count">
                <div className={s["config-input-wrapper"]}>
                  <Input
                    min={1}
                    max={20}
                    value={0}
                    className={s["config-input"]}
                  />
                  <Slider min={1} max={20} value={10} />
                </div>
              </Form.Item>
              <Form.Item label="Padding">
                <div className={s["config-input-wrapper"]}>
                  <Input
                    min={1}
                    max={20}
                    value={0}
                    className={s["config-input"]}
                  />
                  <Slider min={1} max={20} value={10} />
                </div>
              </Form.Item>
              <Form.Item label="Randomness">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 10
                  }}
                >
                  <Switch
                    defaultChecked={true}
                    style={{ marginRight: "12px" }}
                  />
                  <Button icon="reload">Refresh</Button>
                </div>
                <div className={s["config-input-wrapper"]}>
                  <Input
                    min={1}
                    max={20}
                    value={0}
                    className={s["config-input"]}
                  />
                  <Slider min={1} max={20} value={10} />
                </div>
              </Form.Item>
            </Form>
          </Sider>
          <Layout>
            <Header
              style={{ background: "rgba(255, 255, 255, 0.3)", padding: 0 }}
            >
              <Row className={s["header-row"]}>
                <Col span={8} className={s["refresh-area"]}></Col>
                <Col span={8} className={s["dimensions-area"]}>
                  <Dimensions />
                </Col>
                <Col span={8} className={s["download-area"]}>
                  <Dropdown.Button
                    type="primary"
                    size="large"
                    icon={
                      <Icon type="down" className={s["download-down-icon"]} />
                    }
                    overlay={downloadMenu}
                    onClick={() => {
                      console.log({
                        stageRef: stageRef.getStage().toDataURL()
                      });
                    }}
                  >
                    <Icon type="download" />
                    Download
                  </Dropdown.Button>
                </Col>
              </Row>
            </Header>
            <Content className={s["content"]}>
              <Stage
                width={width}
                height={height}
                ref={ref => {
                  stageRef = ref;
                }}
              >
                <Layer>
                  <Rect fill="#fff" x={0} y={0} width={width} height={height} />
                  {dots}
                </Layer>
              </Stage>
              <div className={s["color-side-bar"]}>
                <ColorInput color="#fff" />
                <ColorInput color="#000" />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default withRedux(IndexPage);
