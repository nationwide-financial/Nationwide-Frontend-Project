import React, {useEffect, useState, useContext} from "react";
import Sidebar from "../components/Sidebar";
import {_verifyUser, _getUser} from '../services/authServices';
import Router from 'next/router'
import { Context } from "../context";

const AdminLayout = ({ children }) => {
  const { dispatch } = useContext(Context);
   const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    async function checkUserAccess() {
      const verify = await _verifyUser();
      console.log(verify, "verify");
      if (verify?.status !== 200) {
        Router.push("/login");
      } else {
        setPageReady(true);
      }
    }
    checkUserAccess();
  }, [children]);

  useEffect(() => {
    const getuser = async () => {
        const info = await _getUser();
        if (info?.status === 200) {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: info?.data,
          })
        }
    }
    getuser();
  }, []);

  
  return (
    <>
      {pageReady && (
        <>
          <div className="container">
            <Sidebar />
            <main className='pagecontainer'>
              {children}
              <div className="footer_content">© 2022 National Finance</div>
            </main>
          </div>
          {/* <div className="footer">
            <div className="footer_sidebar"></div>
            <div className="footer_content">© 2022 National Finance</div>
          </div> */}
        </>
      )}
    </>
  );
};

export default AdminLayout;
