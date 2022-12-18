import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../styles/table.css";
import {
  faPenToSquare,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const URL = "/getCategories";

const Categories = () => {
  const [categories, setCategories] = useState();
  const [deleting, setDeleting] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleDelete = async (categoryId) => {
    const formData = new FormData();
    formData.append("id", categoryId);
    const response = await axiosPrivate.post("/deleteCategory", formData);
    if (response.data["status"] === "success") {
      setDeleting(!deleting);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCategories = async () => {
      try {
        const response = await axiosPrivate.get(URL);
        if (response.data["status"] === "success") {
          isMounted && setCategories(response.data.categories);
          
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
  }, [deleting]);

  return (
    <>
      <section className="users-flex">
        <h1>Categories List</h1>
        <Link to="/createCategory">
          <button className="createCat">
            Create new Category <FontAwesomeIcon icon={faPlus} />
          </button>
        </Link>

        {categories?.length ? (
          <div className="table-container">
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-1">Name</div>
                <div className="col col-1">Edit</div>
                <div className="col col-1">Delete</div>
              </li>
              {categories?.map((category) => (
                <li key={category.id} className="table-row">
                  <div className="col col-1" data-label="Name">
                    {category.name}
                  </div>
                  <div className="col col-1" data-label="Edit">
                    <Link to={`/updateCategory/${category.id}`}>
                      <button>
                        <FontAwesomeIcon
                          className="icon edit"
                          icon={faPenToSquare}
                        />
                      </button>
                    </Link>
                  </div>
                  <div className="col col-1" data-label="Delete">
                    <button onClick={() => handleDelete(category.id)}>
                      <FontAwesomeIcon className="icon delete" icon={faTrash} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No categories Registered</p>
        )}
      </section>
    </>
  );
};

export default Categories;
