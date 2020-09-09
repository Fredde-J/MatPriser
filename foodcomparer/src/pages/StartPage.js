import React from "react";
import { withRouter } from "react-router-dom";
import { InputGroup, InputGroupAddon, Button, Input,Row,Col} from 'reactstrap';
  import CatagoryCard from '../components/CatagoryCard'
  import searchIcon from '../images/searchIcon.svg'
  import '../css/StartPage.css'


const StartPage = ()=>{
  let catagorys = ["Lätt mjölk",]
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
          <CatagoryCard></CatagoryCard>
        <h3 className="d-flex justify-content-center">Alla kategorier</h3>
        </>
        )
}


    export default withRouter(StartPage);
