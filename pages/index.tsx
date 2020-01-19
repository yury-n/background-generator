import { NextPage } from "next";
import { DatePicker } from "antd";

const Home: NextPage<{ userAgent?: string }> = ({ userAgent }) => (
  <>
    <h1>Hello world! - user agent: {userAgent}</h1>
    <DatePicker />
  </>
);

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
  return { userAgent };
};

export default Home;
