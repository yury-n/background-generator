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
const { Option } = Select;

import "antd/dist/antd.css";
import s from "./index.less";

const { Header, Content, Sider } = Layout;

const downloadMenu = (
  <Menu>
    <Menu.Item key="1">Download as SVG</Menu.Item>
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
        <Sider width={330} style={{ background: "#fff" }}>
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
              <Col span={8}></Col>
              <Col span={8} className={s["dimensions-area"]}>
                <Input className={s["dimensions-input"]} value={1024} />
                <span className={s["dimensions-x"]}>×</span>
                <Input className={s["dimensions-input"]} value={768} />
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
            <div
              style={{
                width: 1024,
                height: 768,
                background: "linear-gradient(to right, #d1913c, #ffd194)"
              }}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </>
);
