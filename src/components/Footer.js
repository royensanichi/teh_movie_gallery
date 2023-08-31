import { Layout } from "antd";

const Footer = () => {
    const { Footer } = Layout;
    return ( 
        <Footer
        style={{
          textAlign: 'center',
          fontSize:"14px"
        }}
        className="footer"
      >
         Teh Movie Gallery ©2023 by <strong>Albert Sany</strong>
      </Footer>
     );
}
 
export default Footer;