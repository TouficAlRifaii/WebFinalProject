import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../styles/table.css";
import { faPenToSquare, faTrash , faPlus} from "@fortawesome/free-solid-svg-icons";
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
  }, [deleting]);

  return (
    <section className="users-flex">
      <h1>Categories List</h1>
      <Link to="/createCategory">
        <button className="createCat">Create new Category <FontAwesomeIcon icon={faPlus} /></button>
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
                        <button><FontAwesomeIcon className="icon edit" icon={faPenToSquare} /></button>
                      </Link>
                      <button onClick={() => handleDelete(category.id)}>
                      <FontAwesomeIcon className="icon delete" icon={faTrash} />
                      </button>
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
