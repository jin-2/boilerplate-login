import styled from "@emotion/styled";

export default function PageLayout({ children }) {
    return <ContentEl>{children}</ContentEl>;
}

const ContentEl = styled.div`
    max-width: 500px;
    margin: 0 auto;
    padding: 40px 20px;
`;
