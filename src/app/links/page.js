import React from 'react';
import Link from "next/link";
import("./style.css")
function Page(props) {
  return (
      <div className='main'>
        <footer style={{display:"flex" , alignItems:"center",justifyContent:"center",height:"100%"}} className="footer-01">
          <div className="container">
            <div className="mainArea">
              <h1 className={"text-white text-center"}>Usefull Links</h1>
              <div className="links">
                <div className="link"><Link href={"/"}>Home Page</Link></div>
                <div className="link"><Link href={"/search"}>Search Page</Link></div>
                <div className="link"><Link href={"/protectme"}>Protect My Data</Link></div>
                <div className="link"><Link href={"/ai"}>PAK AI</Link></div>
                <div className="link"><Link href={"/privacy_policy"}>Privacy Policy</Link></div>
                <div className="link"><Link href={"/cookie_policy"}>Cookie Policy</Link></div>

              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-12 text-center">
                <p className="copyright text-white">

                  Copyright © All rights reserved | {" "}
                  <i className="ion-ios-heart" aria-hidden="true" />
                  <a className="text-white" href="https://pakservices.online" target="_blank">
                    Pakservices
                  </a>

                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
}

export default Page;