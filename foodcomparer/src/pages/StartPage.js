import React from "react";
import { withRouter } from "react-router-dom";
import { InputGroup, InputGroupAddon, Button, Input,Row,Col} from 'reactstrap';
  import CatagoryCard from '../components/CatagoryCard'
  import searchIcon from '../images/searchIcon.svg'
  import '../css/StartPage.css'


const StartPage = ()=>{
  let populareCatagorys = [0,1,2,3]
  let allCatagorys=[0,1,2,3,4,5,6,7,8,9,10,11]
    return (
        <>
        <br></br>
        <Row>
        <Col>
        <InputGroup className="d-flex justify-content-center" >
          <InputGroupAddon addonType="append">
          <Input placeholder="sök" />
          </InputGroupAddon>
          <Button>
           <img src={searchIcon}></img>
          </Button>
       </InputGroup>
        </Col>
        </Row>
       
        <h3 className="d-flex justify-content-center">Populära kategorier</h3>
        <Row>
          {populareCatagorys.map((catagory,index)=>{
            return <CatagoryCard/>
          })}
        </Row>
        <h3 className="d-flex justify-content-center" onClick>Alla kategorier</h3>
        <Row>
          {allCatagorys.map((catagory,index)=>{
            return <CatagoryCard/>
          })}
        </Row>
        </>
        )
}


    export default withRouter(StartPage);
