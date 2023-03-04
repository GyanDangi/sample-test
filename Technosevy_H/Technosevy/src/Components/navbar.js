import React from 'react'
import { useEffect, useState } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import  Tutorials from "./tutorials"
import {findUserByID} from "./api/user"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Paper } from '@mui/material';
export default (props) => {
    
  const [search,setSearch]=useState("")
  const [value,setValue]=useState("")
  const {sector,id}= useParams();
  const navigate=useNavigate()
  const [userinfo,setUserinfo]=useState({
    name:"",
    img:""
  })


  console.log("sector=>"+sector)
  useEffect(()=>{
    lodeuser();
  },[])
  const lodeuser= async()=>{
    
    console.log("User Id "+id)
     const data = await findUserByID({id:id})
     console.log(data.data.Fname)
     setUserinfo({...userinfo,name:data.data.Fname})
     setUserinfo({...userinfo,img:data.data.profilePic})
    }

  const  handleHange =(e)=>{
    setSearch(e.target.value);
    // console.log(search)
  }
  const  handleClick =(e)=>{
    setValue(search)
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handlClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
      setAnchorEl(null);
      console.log("hellow")
      if(e.target.name==="logout"){
        navigate(`/`)
      }
    };
    const logout = (e) => {
     
      console.log("hellow")
      // if(e.target.name==="logout"){
        navigate(`/`)
      // }
    };

  return(
    <>
    <nav class="navbar courses navbar-expand-lg bg-lblue  text-white">
    <div class="container-fluid ">
    {/* <span> <img style={{ height:"20px",width:"20px" }} src={`http://localhost:8000/public/profilePic/${userinfo.img}`} alt="img Not found" /> <h2>{userinfo.name}</h2></span>  */}

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            {/* <Link class="nav-link active text-white fs-4" aria-current="page" to={`/tutorial/${id}/all`}>All</Link> */}
            <Link class="nav-link active text-white fs-4" aria-current="page"  href="#">All</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link text-white fs-4" href="#">Programing</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link active text-white fs-4" aria-current="page" href="#">Devlopment</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link text-white fs-4" href="#">Online-Test</Link>
          </li>
         
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" name="search" type="search" value={search} onChange={handleHange} placeholder="Search subject " aria-label="Search"/>
          <button class="btn btn-outline-primary text-white fs-5" type="button" onClick={handleClick}>Search</button>
        </form>
     

           
      

        
        <Button id="basic-button"
           variant='text'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handlClick}
      >
       <img style={{ height:"60px",width:"60px" }} data-toggle="modal" data-target="#orangeModalSubscription" className="rounded-circle img-cover" src='/img/ourfo.jpg' alt="img Not found" />
      </Button >
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{py:5}}
        >
        <Paper></Paper>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem  onClick={logout}>Logout</MenuItem>
      </Menu>

  {/* <span> <img style={{ height:"60px",width:"60px" }} data-toggle="modal" data-target="#orangeModalSubscription" className="ms-2 rounded-circle" src={`http://localhost:8000/public/profilePic/${userinfo.img}`} alt="img Not found" /> <h2>{userinfo.name}</h2></span> */}
  

      </div>
    </div>
   </nav>
     <Tutorials  search={value} sector={sector}/>
    </>
  );
}
