import {
  Icon,
  Form,
  Layout,
  Button,
  Select,
  Slider,
  InputNumber,
  Row,
  Col,
  Input,
  Menu,
  Dropdown
} from "antd";
import Head from "next/head";
import { Stage, Layer, Rect, Star } from "react-konva";
const { Header, Content, Sider } = Layout;
const { Option } = Select;

import "antd/dist/antd.css";
import s from "./index.less";

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

export default () => (
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
            <Form.Item label="Layout">
              <Select defaultValue="lucy" style={{ width: 120 }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
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
                >
                  <Icon type="download" />
                  Download
                </Dropdown.Button>
              </Col>
            </Row>
          </Header>
          <Content className={s["content"]}>
            <Stage width={800} height={600}>
              <Layer>
                <Rect fill="#fff" x={0} y={0} width={800} height={600} />
                {[...Array(10)].map((_, i) => (
                  <Star
                    key={i}
                    x={Math.random() * 800}
                    y={Math.random() * 600}
                    numPoints={5}
                    innerRadius={20}
                    outerRadius={40}
                    fill="#89b717"
                    opacity={0.8}
                    draggable
                    rotation={Math.random() * 180}
                    shadowColor="black"
                    shadowBlur={10}
                    shadowOpacity={0.6}
                  />
                ))}
              </Layer>
            </Stage>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </>
);
