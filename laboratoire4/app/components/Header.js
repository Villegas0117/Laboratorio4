import Link from "next/link";
import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Header() {
    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    
                    <Link href="/" className="navbar-brand">
                        <Image
                            src="/assets/Logo.jpg"
                            width={120}
                            height={40}
                            alt="Logo del blog"
                            className="img-fluid"
                            role="img"
                        />
                    </Link>

                   
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                 
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Link href="#" className="nav-link fs-3">Menu 1</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="#" className="nav-link fs-3">Menu 2</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="#" className="nav-link fs-3">Menu 3</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="#" className="nav-link fs-3">Menu 4</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ms-auto">
                            
                            <li className="nav-item">
                                <Link 
                                    href="/blog/add" 
                                    className="btn btn-primary mx-2"
                                >
                                    <i className="bi bi-plus-lg me-2"></i>
                                    Ajouter un Blog
                                </Link>
                            </li>
                            
                          
                            <li className="nav-item">
                                <Link href="#" className="nav-link">
                                    <i className="bi bi-person-circle fs-1"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}