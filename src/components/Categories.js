import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../styles/table.css";

const URL = "/getCategories";

const Categories = () => {
  const [categories, setCategories] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCategories = async () => {
      try {
        const response = await axiosPrivate.get(URL);
        if (response.data["status"] === "success") {
          isMounted && setCategories(response.data.categories);
          console.log(response.data);
        }
      } catch (err) {
        console.error(err);
        //navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getCategories();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <section className="users-flex">
      <h1>Categories List</h1>
      <Link to="/createCategory">
        <button>New Category</button>
      </Link>

      {categories?.length ? (
        <div className="flexDiv">
          <div className="table">
            <table className="table__content">
              <thead className="table__head">
                <tr>
                  <th className="table__heading-cell">Name</th>
                  <th className="table__heading-cell">Actions</th>
                </tr>
              </thead>
              <tbody className="table__body">
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="table__data-cell">{category?.name}</td>
                    <td className="table__data-cell">
                      <Link to={`/updateCategory/${category.id}`}>
                        <button>Update</button>
                      </Link>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>No categories Registered</p>
      )}
    </section>
  );
};

export default Categories;
