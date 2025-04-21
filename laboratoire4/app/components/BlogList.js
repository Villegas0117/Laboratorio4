import React from "react";
import BlogCards from "./BlogCards";
import { initDB } from '../lib/idb';
import { getAllBlogs } from "../lib/idb";


export default function BlogList() {
    const [blogs, setBlogs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const urlBlogs = "http://localhost:3001/blogs";

    React.useEffect(() => {
        const loadData = async () => {
          try {
            // 1. Cargar desde IndexedDB primero
            const db = await initDB();
            const cachedBlogs = await getAllBlogs();
            if (cachedBlogs.length > 0) setBlogs(cachedBlogs);
    
            // 2. Fetch desde API
            const response = await fetch('/api/blogs'); // Cambia la URL
            const freshBlogs = await response.json();
            setBlogs(freshBlogs);
    
            // 3. Guardar en IndexedDB
            const tx = db.transaction('blogs', 'readwrite');
            freshBlogs.forEach(blog => tx.objectStore('blogs').put(blog));
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        loadData();
      }, []);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <main className="container">
            <div className="container">
                <div className="row mb-3 d-flex justify-content-between">

                    <div className="col-md-6 d-flex">
                        <form className="d-flex w-100" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-primary" type="submit">Search</button>
                        </form>
                    </div>

                   
                    <div className="col-md-4 d-flex align-items-center">
                        <label htmlFor="selectOption" className="me-2">Trier par:</label>
                        <select id="selectOption" className="form-select" defaultValue="">
                            <option value="" disabled>Select</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </select>

                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row d-flex justify-content-center" id="BlogContainer">
                    {blogs.map(blog => (
                        <BlogCards key={blog.id} blog={blog} />
                    ))}
                </div>
            </div>
        </main>
    );

}