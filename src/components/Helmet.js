
import { Layout, Col, Row } from 'antd';

const Helmet = () => {
  const { Header } = Layout


  return (
    <Header style={{ color: 'whitesmoke', height: 'auto', backgroundColor: "#072541" }}>
      <Row between="xs" >
        <Col xs={24} lg={8}/> 
        <Col xs={24} lg={8}><h1 className='helmet'>"Teh Movie Gallery"</h1></Col>
        <Col xs={24} lg={8}>
        </Col>
      </Row>

    </Header>
  )
}

export default Helmet
