import React from 'react'
import {withRouter} from 'react-router-dom'
import listIcon from '../images/listIcon.svg'

const Header = ()=>{
return(
<>
<div className="row">
 <div className="col-12 bg-secondary text-danger" >
  <h1 className="row-6">SnålKöp</h1>
  <img src={listIcon} className="row-6"></img>
 </div>
 
</div>


</>)
}
export default withRouter(Header)