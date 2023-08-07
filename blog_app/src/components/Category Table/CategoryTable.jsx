import axios from "axios";
import React, { useEffect, useState } from "react";
import "./category.css"; // Import your CSS file for styling

const CategoryTable = ({ selected, setSelected }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const res = await axios.get("/api/category/");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getAllCategories();
  }, [categories.length]);

  const [searchQuery, setSearchQuery] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const handleSearch = () => {
    const filteredCategories = categories.filter(
      (category) =>
        category.name &&
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredCategories;
  };

  const handleAddCategory = async () => {
    if (newCategory && !categories.includes(newCategory)) {
      try {
        const res = await axios.post("/api/category/newCate", {
          name: newCategory,
        });
        setCategories([...categories, res.data.name]);
        setNewCategory("");
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  const handleSelectCategory = (category) => {
    if (!selected.find((item) => item.id === category._id)) {
      setSelected([...selected, { id: category._id, name: category.name }]);
      setSearchQuery("");
    }
  };

  const handleRemoveCategory = (categoryId) => {
    const updatedSelected = selected.filter((item) => item.id !== categoryId);
    setSelected(updatedSelected);
  };

  return (
    <div className="categoryTable">
      <h2>Category</h2>
      <input
        type="text"
        placeholder="Search categories"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="searchInput"
      />
      <ul className="categoryList">
        {searchQuery ? (
          handleSearch().map((category, index) => (
            <li
              key={index}
              className="categoryItem"
              onClick={() => handleSelectCategory(category)}
            >
              {category.name}
            </li>
          ))
        ) : (
          <li className="noMatchItem">No matching categories found.</li>
        )}
      </ul>
      <input
        type="text"
        placeholder="Add new category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        className="addInput"
      />
      <button onClick={handleAddCategory} className="addButton">
        Add Category
      </button>
      <div className="selectedCategories">
        <h3>Selected Categories:</h3>
        <ul className="selectedCategoryList">
          {selected.map((item, index) => (
            <li key={index} className="selectedCategoryItem">
              {item.name}
              <button
                onClick={() => handleRemoveCategory(item.id)}
                className="removeButton"
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryTable;
