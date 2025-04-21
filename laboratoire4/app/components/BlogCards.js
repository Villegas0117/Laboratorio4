import Link from "next/link";
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function BlogCards({ blog }) {
    return (
        <div className="col-12 col-md-6 col-lg-4 d-flex">
            <div className="card shadow border mx-auto mt-3 first-card" role="cards">
                <img className="card-img-top" src="../assets/1358647.png" alt="Card image cap" role="imgcard" />
                <div className="card-body">
                    <div className="container text-center my-4">
                        <Link href={`/blog/${blog.id}`} className="btn fs-4" role="btnCard">
                            {blog.title}
                        </Link>
                    </div>
                    <p className="card-text">Author: {blog.author}</p>
                    <p className="card-text">Date: {blog.date}</p>
                </div>
            </div>
        </div>
    );

}