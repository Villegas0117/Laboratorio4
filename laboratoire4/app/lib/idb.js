export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('BlogDB', 1);

    request.onerror = (event) => {
      console.error("Error al abrir IndexedDB:", event.target.error);
      reject(event.target.error);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('blogs')) {
        db.createObjectStore('blogs', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('comments')) {
        db.createObjectStore('comments', { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      
      // Manejo de errores en la conexión
      db.onerror = (event) => {
        console.error("Error general en IndexedDB:", event.target.error);
      };
      
      resolve(db);
    };
  });
};
// Obtener todos los blogs
export const getAllBlogs = async () => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('blogs', 'readonly');
    const store = tx.objectStore('blogs');
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};



export const saveBlogToIDB = async (blog) => {
  try {
    const db = await initDB();
    const tx = db.transaction('blogs', 'readwrite');
    const store = tx.objectStore('blogs');
    const request = store.put(blog);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = (event) => {
        console.error("Error al guardar en IndexedDB:", event.target.error);
        reject(event.target.error);
      };

      // Asegura que la transacción se complete
      tx.oncomplete = () => console.log("Transacción completada");
      tx.onerror = (event) => {
        console.error("Error en la transacción:", event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error("Error en saveBlogToIDB:", error);
    throw error;
  }
};

// Obtener un blog específico por ID
export const getBlog = async (id) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('blogs', 'readonly');
    const store = tx.objectStore('blogs');
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Guardar o actualizar un blog
export const saveBlog = async (blog) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('blogs', 'readwrite');
    const store = tx.objectStore('blogs');
    const request = store.put(blog);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Eliminar un blog
export const deleteBlog = async (id) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('blogs', 'readwrite');
    const store = tx.objectStore('blogs');
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Funciones para comentarios (opcional)
export const getCommentsByBlog = async (blogId) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('comments', 'readonly');
    const store = tx.objectStore('comments');
    const request = store.getAll();
    request.onsuccess = () => {
      const comments = request.result.filter(c => c.blogId === blogId);
      resolve(comments);
    };
    request.onerror = () => reject(request.error);
  });
};

export const saveComment = async (comment) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('comments', 'readwrite');
    const store = tx.objectStore('comments');
    const request = store.put(comment);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};