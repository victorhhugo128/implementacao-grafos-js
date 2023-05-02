class Grafo {
    constructor(n_vertices){
        this.matriz = Array(n_vertices).fill().map(() => Array(n_vertices).fill(0));
        this.n_vertices = n_vertices;
    }
}