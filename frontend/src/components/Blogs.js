// src/BlogList.js
import React, { useState, useEffect } from "react";
import "./Home.css";
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const apiKey = "bd7b12ca4ff64f1a9316823d0d2f4856";

  useEffect(() => {
    const apiUrl = `https://newsapi.org/v2/everything?q=health&apiKey=${apiKey}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data.articles);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div>
      <h2 className="title" style={{ textAlign: "center" }}>
        Medical Blogs
      </h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.title} className="news-card">
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              <img
                src={blog.urlToImage}
                width={"80%"}
                style={{ margin: "auto" }}
              />
              <h2 className="news-title" style={{ textAlign: "center" }}>
                {blog.title}
              </h2>
              <p className="news-desc">{blog.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
