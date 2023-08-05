import React from 'react'
import { useSelector } from 'react-redux';
import {  Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin,children }) => {
  const {user} = useSelector(state => state.user);

  if(user===false) return <Navigate to="/login" />
  if(isAdmin && user.role !== "admin") return <Navigate to="/login" />
  return children;
}


export default ProtectedRoute;