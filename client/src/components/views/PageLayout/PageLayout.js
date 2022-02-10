import { Layout } from "antd";
const { Header, Footer, Content } = Layout;

export default function PageLayout({ children }) {
    return (
        <Layout>
            <Header>Header</Header>
            <Content>
                <div
                    style={{
                        maxWidth: "500px",
                        margin: "0 auto",
                        padding: "60px 20px"
                    }}
                >
                    {children}
                </div>
            </Content>
            <Footer>Footer</Footer>
        </Layout>
    );
}
