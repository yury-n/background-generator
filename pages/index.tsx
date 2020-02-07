import Head from "next/head";
import { Icon, Layout, Row, Col } from "antd";
const { Header, Content } = Layout;
import { withRedux } from "../lib/withRedux";
import Dimensions from "../components/Dimensions";
import Canvas from "../components/Canvas";
import ColorSidebar from "../components/ColorSidebar";
import DownloadButton from "../components/DownloadButton";
import ConfigPanel from "../components/ConfigPanel";

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
          <ConfigPanel />
          <Layout>
            <Header className={s["header"]}>
              <Row className={s["header-row"]}>
                <Col span={8}></Col>
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
