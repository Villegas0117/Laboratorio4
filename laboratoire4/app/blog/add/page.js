'use client';
import { useActionState } from 'react';
import { createBlog } from '../../actions';
import Link from 'next/link';

export default function AddBlogPage() {
  const [state, formAction] = useActionState(createBlog, {
    success: false,
    message: null,
    blog: null
  });

  
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Créer un nouveau blog</h1>
      
      <form action={formAction} className="border p-4 rounded">
        <div className="mb-3">
          <label className="form-label">Titre*</label>
          <input 
            name="title" 
            className="form-control" 
            required 
            placeholder="Titre du blog"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Auteur*</label>
          <input
            name="author"
            className="form-control"
            required
            defaultValue="Eber Villegas"
            placeholder="Nom de l'auteur"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date*</label>
          <input
            type="date"
            name="date"
            className="form-control"
            required
            defaultValue={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contenu*</label>
          <textarea 
            name="content" 
            className="form-control" 
            rows={10}
            required 
            placeholder="Contenu détaillé du blog..."
          />
        </div>

        {state?.message && (
          <div className={`alert ${state.success ? 'alert-success' : 'alert-danger'}`}>
            {state.message}
          </div>
        )}

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Publier
          </button>
          <Link href="/" className="btn btn-outline-secondary">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}