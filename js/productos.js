
export function obtenerProductos() {
    const productos = [
        { id: 1, name: 'El principito', description: 'Un clásico sobre la vida y la amistad.', amount: 15000, image:'../imagenes/elprincipito.jpeg'},
        { id: 2, name: 'Harry Potter y la piedra filosofal', description: 'El inicio de una saga mágica.', amount: 30000, image: '../imagenes/hp.jpeg' },
        { id: 3, name: 'Los juegos del hambre', description: 'Distopía y revolución.', amount: 30000, image: '../imagenes/losJDH.jpeg' },
        { id: 4, name: 'El eternauta', description: 'Historieta de ciencia ficción argentina.', amount: 30000, image: '../imagenes/el-eternauta.jpeg' },
        { id: 5, name: 'Atlas de anatomía humana', description: 'Recurso visual para estudiantes.', amount: 30000, image: '../imagenes/anatomia.jpeg' },
        { id: 6, name: 'Química general', description: 'Conceptos básicos para nivel universitario.', amount: 30000 , image: '../imagenes/quimica.jpeg'}
    ];

    console.log(productos);
    return productos;
}
