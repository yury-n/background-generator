import React from "react";
import download from "downloadjs";
import { Menu, Icon, Dropdown } from "antd";

export interface Props {}

export const DownloadButton: React.FC<Props> = props => {
  return (
    <Dropdown.Button
      type="primary"
      size="large"
      icon={<Icon type="down" />}
      overlay={downloadMenu}
      onClick={downloadAsPNG}
    >
      <Icon type="download" />
      Download
    </Dropdown.Button>
  );
};
DownloadButton.displayName = "DownloadButton";

const downloadAsPNG = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.toBlob(blob => download(blob, "download.png", "image/png"));
};

const downloadAsSVG = () => {
  download(window["fabricCanvas"].toSVG(), "download.svg", "image/svg+xml");
};

const downloadAsJPEG = () => {
  download(
    window["fabricCanvas"].toDataURL({ format: "jpeg", quality: 0.95 }),
    "download.jpg",
    "image/jpeg"
  );
};

const downloadMenu = (
  <Menu>
    <Menu.Item key="1" onClick={downloadAsSVG}>
      as <strong>SVG</strong> file
    </Menu.Item>
    <Menu.Item key="2" onClick={downloadAsPNG}>
      as <strong>PNG</strong> file
    </Menu.Item>
    <Menu.Item key="2" onClick={downloadAsJPEG}>
      as <strong>JPEG</strong> file
    </Menu.Item>
  </Menu>
);

export default DownloadButton;
