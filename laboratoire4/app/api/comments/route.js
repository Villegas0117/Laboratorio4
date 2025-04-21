import db from '../../lib/db.json';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const blogId = searchParams.get('blogId');
  
  const comments = db.comments.filter(c => c.blogId === blogId);
  return Response.json(comments);
}

export async function POST(request) {
  const newComment = await request.json();
  newComment.id = `c${Date.now()}`;
  db.comments.push(newComment);
  return Response.json(newComment, { status: 201 });
}