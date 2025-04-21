// app/actions.js (Server Action)
'use server';

export const createBlog = async (prevState, formData) => {
  const title = formData.get('title');
  const content = formData.get('content');
  const author = formData.get('author') || "Eber Villegas";
  const date = formData.get('date') || new Date().toISOString().split('T')[0];

  if (!title || !content) {
    return { success: false, message: 'Le titre et le contenu sont requis' };
  }

  const newBlog = { id: `b${Date.now()}`, title, author, date, content };

  try {
    const response = await fetch('http://localhost:3000/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBlog),
    });

    if (!response.ok) throw new Error('Erreur du serveur');

    return { success: true, message: 'Blog publié avec succès', blog: newBlog };
  } catch (error) {
    return { success: false, message: 'Erreur lors de la publication' };
  }
};