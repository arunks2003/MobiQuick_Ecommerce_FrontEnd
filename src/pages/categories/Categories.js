import React from "react";
import Layout from "../../components/Layout/Layout";
import useCategory from "../../custom-hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout>
      <div>
        <main className="">
          <div className="container">
            <section className="pt-5">
              {/* Heading & Description */}
              <div className="wow fadeIn">
                {/*Section heading*/}
                <h2 className="h1 text-center mb-5">All Categories</h2>
                {/*Section description*/}
                <p className="text-center">
                  This page consists of the categories present on the site, if
                  you want more variety of categories please contact the admin,
                  they'll add them.
                </p>
              </div>
              {/* Heading & Description */}
              {/*Grid row*/}
              {categories.map((c) => {
                return (
                  <div className="row wow fadeIn" key={c._id}>
                    {/*Grid column*/}
                    <div className="col-lg-5 col-xl-4 mb-4">
                      {/*Featured image*/}
                      <div className="view overlay rounded z-depth-1-half">
                        <div className="view overlay">
                          <div className="embed-responsive embed-responsive-16by9">
                            <img src="#" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*Grid column*/}
                    {/*Grid column*/}
                    <div className="col-lg-7 col-xl-7 ml-xl-4 mb-4">
                      <h3 className="mb-3 font-weight-bold dark-grey-text">
                        <strong className="text-uppercase">{c.name}</strong>
                      </h3>
                      <p className="grey-text">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Necessitatibus facere doloribus, eveniet a fuga
                        unde mollitia quis at voluptas ea magni excepturi quos
                        illo eligendi animi aliquid eos incidunt fugit.
                      </p>
                      <p>
                        <strong>
                          Cilck to search product of specefic category
                        </strong>
                      </p>
                      <Link
                        to={`/category/${c.slug}`}
                        className="btn btn-primary btn-md"
                      >
                        Search Category
                      </Link>
                    </div>
                    {/*Grid column*/}
                  </div>
                );
              })}

              {/*Grid row*/}
              <hr className="mb-5" />
              {/*Grid row*/}
            </section>
            {/*Section: Cards*/}
          </div>
        </main>
        {/*Main layout*/}
      </div>
    </Layout>
  );
};

export default Categories;
