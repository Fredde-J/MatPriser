import React from 'react'
import {withRouter} from 'react-router-dom'
import listIcon from '../images/listIcon.svg'
import { Row, Col } from 'reactstrap';

const Header = ()=>{
return(
<>
 <Row className="bg-secondary text-danger" >
  <Col className="px-0">
  <h1 style={{fontSize:50}} >SnålKöp</h1>
  </Col>
  <Col className="col-1">
  <img src={listIcon} className="rounded float-right" style={{width:70 }}></img>
  </Col>
 </Row>
</>)
}
export default withRouter(Header)