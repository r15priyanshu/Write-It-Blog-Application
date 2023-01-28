import React from "react";
function Footer() {
  return (
    <div className="MyFooter container-fluid p-0 m-0">
      <footer className="bg-dark text-center text-white">
        <div className="container p-4 pb-0">
          <section className="">
            
              <div className="row d-flex justify-content-center">
                <div className="col-auto">
                  <p className="pt-2">
                    <strong>For more products and services</strong>
                  </p>
                </div>

                <div className="col-md-5 col-12">
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="form5Example29"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="form5Example29">
                      Email address
                    </label>
                  </div>
                </div>

                <div className="col-auto">
                  <button className="btn btn-outline-light mb-4">
                    Subscribe
                  </button>
                </div>
              </div>
            
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{backgroundColor:"black"}}
        >
          © 2023 Copyright : Priyanshu Anand
        </div>
      </footer>
    </div>
  );
}

export default Footer;
