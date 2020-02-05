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
  Input
  // Divider
} from "antd";
import Head from "next/head";
const { Header, Content, Sider } = Layout;
import BorderFrame from "../components/BorderFrame";
import { withRedux } from "../lib/withRedux";
import Dimensions from "../components/Dimensions";
import Canvas from "../components/Canvas";
import ColorSidebar from "../components/ColorSidebar";
import DownloadButton from "../components/DownloadButton";

import "antd/dist/antd.css";
import s from "./index.less";

const IndexPage = () => {
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
                  <Button icon="reload" className={s["refresh-button"]}>
                    Refresh
                  </Button>
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
            <Header className={s["header"]}>
              <Row className={s["header-row"]}>
                <Col span={8} className={s["refresh-area"]}></Col>
                <Col span={8} className={s["dimensions-area"]}>
                  <Dimensions />
                </Col>
                <Col span={8} className={s["download-area"]}>
                  <DownloadButton />
                </Col>
              </Row>
            </Header>
            <Content className={s["content"]}>
              <Canvas />
              <ColorSidebar className={s["color-side-bar"]} />
              <div className={s["scroll-cta"]}>
                <div>Scroll to see more</div>
                <Icon type="down" className={s["scroll-icon"]} />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <div className={s["extra-layout"]}></div>
    </>
  );
};

export default withRedux(IndexPage);
