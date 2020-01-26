import classnames from "classnames";
import {
  Icon,
  Form,
  Layout,
  Button,
  Slider,
  InputNumber,
  Row,
  Col,
  Input,
  Menu,
  Dropdown,
  Divider
} from "antd";
import Head from "next/head";
import { Stage, Layer, Rect, Circle } from "react-konva";
const { Header, Content, Sider } = Layout;
import ColorInput from "../components/ColorInput";

import "antd/dist/antd.css";
import s from "./index.less";
import BorderFrame from "../components/BorderFrame";

const downloadMenu = (
  <Menu>
    <Menu.Item key="1">Download as SVG</Menu.Item>
  </Menu>
);

const dimensionsMenu = (
  <Menu>
    <Menu.Item key="1">1024 × 768</Menu.Item>
    <Menu.Item key="2">800 × 600</Menu.Item>
  </Menu>
);

export default () => {
  let stageRef;
  const width = 600;
  const height = 600;
  const itemCount = 50;

  const totalArea = width * height;
  const pointArea = totalArea / itemCount;
  const length = Math.sqrt(pointArea);

  // $x = $i+((rand(0,$length)-$length/2)*$rand);
  // $y = $j+((rand(0,$length)-$length/2)*$rand);

  const dots = [];
  for (let i = length / 2; i < width; i += length) {
    for (let j = length / 2; j < height; j += length) {
      dots.push(
        <Circle
          key={`${i}-${j}`}
          x={i}
          y={j}
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
              <Form.Item label="Layouts" style={{ marginBottom: 0 }}>
                <div className={s["layouts"]}>
                  <BorderFrame
                    isActive
                    className={classnames(s["layout-thumb"])}
                  >
                    <img src="/layout_thumbs/1.png" alt="image.png" />
                  </BorderFrame>
                  <BorderFrame className={classnames(s["layout-thumb"])}>
                    <img src="/layout_thumbs/1.png" alt="image.png" />
                  </BorderFrame>
                  <BorderFrame className={classnames(s["layout-thumb"])}>
                    <img src="/layout_thumbs/1.png" alt="image.png" />
                  </BorderFrame>
                </div>
                <Divider>
                  <Button type="link" icon="down">
                    Show more
                  </Button>
                </Divider>
              </Form.Item>
              <Form.Item label="Item" style={{ marginBottom: 0 }}>
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
                <Divider>
                  <Button type="link" icon="down">
                    Show more
                  </Button>
                </Divider>
              </Form.Item>
              <Form.Item label="Item Size">
                <Row>
                  <Col span={6}>
                    <InputNumber
                      min={1}
                      max={20}
                      value={0}
                      className={"full-width-input"}
                    />
                  </Col>
                  <Col span={16} offset={1}>
                    <Slider min={1} max={20} value={10} />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item label="Item Count">
                <Row>
                  <Col span={6}>
                    <InputNumber
                      min={1}
                      max={20}
                      value={0}
                      className={"full-width-input"}
                    />
                  </Col>
                  <Col span={16} offset={1}>
                    <Slider min={1} max={20} value={10} />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item label="Padding">
                <Row>
                  <Col span={6}>
                    <InputNumber
                      min={1}
                      max={20}
                      value={0}
                      className={"full-width-input"}
                    />
                  </Col>
                  <Col span={16} offset={1}>
                    <Slider min={1} max={20} value={10} />
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Sider>
          <Layout>
            <Header
              style={{ background: "rgba(255, 255, 255, 0.3)", padding: 0 }}
            >
              <Row className={s["header-row"]}>
                <Col span={8} className={s["refresh-area"]}>
                  <Button type="primary" ghost icon="reload">
                    Reload
                  </Button>
                </Col>
                <Col span={8} className={s["dimensions-area"]}>
                  <div className={s["dimensions-form-wrapper"]}>
                    <Input className={s["dimensions-input"]} value={1024} />
                    <span className={s["dimensions-x"]}>×</span>
                    <Input className={s["dimensions-input"]} value={768} />
                    <Dropdown.Button
                      className={s["dimensions-dropdown"]}
                      size="large"
                      icon={<Icon type="down" />}
                      overlay={dimensionsMenu}
                    >
                      Dimensions
                    </Dropdown.Button>
                  </div>
                </Col>
                <Col span={8} className={s["download-area"]}>
                  <Dropdown.Button
                    type="primary"
                    size="large"
                    icon={<Icon type="down" />}
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
