
import { Layout} from 'antd';

const Helmet = () => {
  const { Header } = Layout
  return (
    <Header style={{ color: 'whitesmoke', height: 'auto', backgroundColor: "#072541", display:"flex", justifyContent:"space-between" }}>
      <div></div>
      <div><h1 className='helmet'>"Teh Movie Gallery"</h1></div>
      <div><label>powered by moviedb</label></div>
      

    </Header>
  )
}

export default Helmet
