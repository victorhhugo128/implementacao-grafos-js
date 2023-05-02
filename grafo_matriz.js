class Grafo {
    constructor(n_vertices){
        this.matriz = Array(n_vertices).fill().map(() => Array(n_vertices).fill(0));
        this.n_vertices = n_vertices;
        this.n_arestas = 0;
    }

    nVertices(){
        console.log(`Há ${this.n_vertices} vértices no grafo.`);
        return this.n_vertices;
    }

    nArestas(){
        console.log(`Há ${this.n_arestas} arestas no grafo.`);
        return this.n_arestas;
    }

    adicionarAresta(rotulo_vertice, vertice_adjacente, peso = 1){
        if(this.matriz[rotulo_vertice][vertice_adjacente] != 0){
            console.log("Aresta já existente. Atualizando peso...");
        }
        else{
            console.log("Adicionando aresta...");
        }

        this.matriz[rotulo_vertice][vertice_adjacente] = peso;
        return;
    }

    mostrarAdjacencias(rotulo_vertice){
        process.stdout.write(`Adjacências de ${rotulo_vertice}: `);

        vertice_adj = 0;
        for(aresta of this.matriz[rotulo_vertice]){
            process.stdout.write(`$|{vertice_adj}| `);
            vertice_adj++;
        }
        console.log("");
        return;
    }
}