import db from '../../lib/db.json';

// GET /api/blogs → Obtener TODOS los blogs
export async function GET() {
  return Response.json(db.blogs);
}

// POST /api/blogs → Crear nuevo blog
export async function POST(request) {
  const newBlog = await request.json();
  
  // Validación básica
  if (!newBlog.title || !newBlog.content) {
    return Response.json(
      { error: 'Se requieren título y contenido' },
      { status: 400 }
    );
  }

  // Generar ID y fecha
  newBlog.id = `b${Date.now()}`;
  newBlog.date = new Date().toISOString();
  
  // Agregar a la "base de datos"
  db.blogs.push(newBlog);
  
  return Response.json(newBlog, { status: 201 });
}