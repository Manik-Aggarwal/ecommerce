import React, { Fragment, useState } from 'react';
import {SpeedDial, SpeedDialAction} from '@material-ui/lab';
import { Backdrop } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';

const UserOptions = ({user}) => {
    const {cartItems} = useSelector(state => state.cart);

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const options = [
        {icon: <PersonIcon/>, name: "Profile", func: account},
        {icon: <ListAltIcon/>, name: "Orders", func: orders},
        {icon: <ShoppingCartIcon style={{color : cartItems.length > 0 ? "red" : "unset" }} />, name: `Cart(${cartItems.length})`, func: cart},
        {icon: <ExitToAppIcon/>, name: "Logout", func: logoutUser},
    ];

    if(user && user.role === "admin"){
        options.unshift({icon: <DashboardIcon/>, name: "Dashboard", func: dashboard});
    }

    function dashboard(){
        navigate("/admin/dashboard");
    }
    function account(){
        navigate("/account");
    }
    function orders(){
        navigate("/orders");
    }
    function cart(){
        navigate("/cart");
    }
    function logoutUser(){
        dispatch(logout());
        alert.success("Logged out successfully");
        navigate("/");
    }

  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex:"10"}}/>
        <SpeedDial className='fixed right-4 top-4' ariaLabel='SpeedDial tooltip example' onClose={() => setOpen(false)} onOpen={() => setOpen(true)} style={{zIndex:"11"}} open={open} direction="down" icon={<img className='rounded-full w-full h-full' src={user.avatar.url ? user.avatar.url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'} alt='Profile'/>} >
            {options.map((option) => (
                <SpeedDialAction key={option.name} tooltipOpen={window.innerWidth <= 600 ? true : false} icon={option.icon} tooltipTitle={option.name} onClick={option.func} />
            ))}
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions