import db from '../../../lib/db.json';


// Solución temporal para Next.js 14 (eliminará el warning)
export const dynamic = 'force-dynamic';

const handleError = (error, status = 500) => {
  console.error('Error:', error);
  return Response.json(
    { error: error.message || 'Error interno del servidor' },
    { status }
  );
};

// Versión compatible con futuras versiones de Next.js
const getResolvedParams = async (params) => {
  try {
    // Next.js 15+: return await params;
    return Promise.resolve(params); // Compatible con versiones actuales
  } catch (error) {
    throw new Error('Error al procesar parámetros de ruta');
  }
};

export async function GET(request, { params }) {
  try {
    const { id } = await getResolvedParams(params); // ¡Ahora usamos await!
    
    if (!id) return handleError(new Error('ID no proporcionado'), 400);
    
    const blog = db.blogs.find(b => b.id === id);
    return blog 
      ? Response.json(blog)
      : handleError(new Error('Blog no encontrado'), 404);

  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await getResolvedParams(params);
    if (!id) return handleError(new Error('ID no proporcionado'), 400);

    const updatedData = await request.json().catch(() => {
      throw new Error('Cuerpo de solicitud inválido');
    });
    
    const index = db.blogs.findIndex(b => b.id === id);
    if (index === -1) return handleError(new Error('Blog no encontrado'), 404);

    db.blogs[index] = { ...db.blogs[index], ...updatedData, id };
    return Response.json(db.blogs[index]);

  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await getResolvedParams(params);
    if (!id) return handleError(new Error('ID no proporcionado'), 400);

    const index = db.blogs.findIndex(b => b.id === id);
    if (index === -1) return handleError(new Error('Blog no encontrado'), 404);

    const [deletedBlog] = db.blogs.splice(index, 1);
    return Response.json({ 
      message: 'Blog eliminado',
      deleted: deletedBlog
    });

  } catch (error) {
    return handleError(error);
  }
}