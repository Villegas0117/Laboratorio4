'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../globals.css';

export default function BlogDetail() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogRes, commentsRes] = await Promise.all([
          fetch(`/api/blogs/${params.id}`),
          fetch(`/api/comments?blogId=${params.id}`)
        ]);

        const blogData = await blogRes.json();
        const commentsData = await commentsRes.json();

        setBlog(blogData);
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blogId: params.id,
          content: newComment,
          author: "Usuario",
          date: new Date().toISOString()
        }),
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments([...comments, newCommentData]);
        setNewComment('');
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );

  if (!blog) return (
    <div className="error-message">
      Blog no encontrado
    </div>
  );

  return (
    <>
      <Header />

      <main className="blog-detail-container">
        <div className="blog-header">
          <img
            src="/assets/1358647.png"
            alt={blog.title}
            className="blog-main-image"
            role="imgBlog"
          />
        </div>

        <article className="blog-content">
          <h1 className="blog-title">{blog.title}</h1>

          <div className="blog-meta">
            <span className="blog-author">
              <i className="bi bi-person-fill"></i> Author: {blog.author}
            </span>
            <span className="blog-date">
              <i className="bi bi-calendar"></i> Date: {new Date(blog.date).toLocaleDateString()}
            </span>
          </div>

          <div className="blog-text">
            {blog.content.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>

        <section className="comments-section">
          <h2 className="section-title">Donez-nous ton avis</h2>

          <form
            onSubmit={handleSubmitComment}
            className="comment-form"
            aria-label="Formulario para escribir un nuevo comentario"
          >
            <label htmlFor="comment-textarea" className="visually-hidden">Comentario</label>
            <textarea
              id="comment-textarea"
              placeholder="Escrivez y vos commentaires"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
              required
              aria-required="true"
              rows={4}
            ></textarea>

            <button
              type="submit"
              className="submit-button"
              disabled={!newComment.trim()}
              aria-disabled={!newComment.trim()}
            >
              {newComment.trim() ? 'Envoyer un commentaire' : 'Envoyer un comentaire'}
            </button>
          </form>

          <div className="comments-list" role="region" aria-live="polite">
            <h2 className="section-title">Commentaires</h2>

            {comments.length > 0 ? (
              comments.map((comment) => (
                <article
                  key={comment.id}
                  className="comment-card"
                  role="article"
                  aria-label={`Comentario de ${comment.author}`}
                >
                  <img
                    src="/assets/HollowKnight.jpg"
                    alt={`Avatar de ${comment.author}`}
                    className="comment-avatar"
                    role="imgProfile"
                  />
                  <div className="comment-content">
                    <header className="comment-header">
                      <h3 className="comment-author">{comment.author}</h3>
                      <time className="comment-date" dateTime={comment.date}>
                        {new Date(comment.date).toLocaleString()}
                      </time>
                    </header>
                    <p className="comment-text">{comment.content}</p>
                  </div>
                </article>
              ))
            ) : (
              <p className="no-comments">Il n'y a encore de commentaires</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
