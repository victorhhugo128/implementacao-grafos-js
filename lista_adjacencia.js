class No {
    constructor(rotulo, peso, prox_no){
        this.rotulo = rotulo;
        this.peso = peso;
        this.prox_no = prox_no;
    }
}

class ListaAdjacencia {
    constructor(n_vertices){
        this.vertices = Array(n_vertices).fill().map((_, indice) => new No(indice, 0, null));
        this.n_arestas = 0;
    }

    nVertices(){
        console.log(`Há ${this.vertices.length} vértices no grafo.`);
        return this.vertices.length;
    }

    nArestas(){
        console.log(`Há ${this.n_arestas} arestas no grafo.`);
        return this.n_arestas;
    }

    adicionarAresta(rotulo_vertice, vertice_adjacente, peso = 1){
        // verifica se o vértice correspondente existe
        if(vertice_adjacente >= this.vertices.length){
            console.log("Vértice inexistente.");
            return;
        }

        // verifica se já existe uma aresta correspondente e, caso positivo, atualiza o peso da aresta
        let no_atual = this.vertices[rotulo_vertice].prox_no;
        let no_anterior = this.vertices[rotulo_vertice];
        let no_novo = null;
        let no_proximo = null;
        while(no_atual != null){
            console.log(`${no_atual.rotulo}, ${vertice_adjacente}`)
            if(no_atual.rotulo == vertice_adjacente){
                no_atual.peso = peso;
                console.log("Aresta já existente, peso atualizado.");
                return;
            }

            else if(no_atual.rotulo > vertice_adjacente){
                break;
            }
            no_anterior = no_atual;
            no_atual = no_atual.prox_no;
        }

        if(no_atual != null){
            no_proximo = no_atual;

            no_novo = new No(vertice_adjacente, peso, no_proximo);
            no_anterior.prox_no = no_novo;

            console.log("Novo nó adicionado com sucesso.");
        }
        else{
            no_novo = new No(vertice_adjacente, peso, null);
            no_anterior.prox_no = no_novo;
        }

        this.n_arestas++;

        return;
    }

    mostrarVertices(){
        for(const vertice of this.vertices){
            this.mostrarAdjacencias(vertice.rotulo);
        }
    }

    mostrarAdjacencias(rotulo_vertice){
        if(rotulo_vertice > this.vertices.length){
            console.log("Vértice inexistente.");
            return;
        }

        if(this.vertices[rotulo_vertice].prox_no == null){
            process.stdout.write(`|(${this.vertices[rotulo_vertice].rotulo})|`);
            console.log("");
            return;
        }

        process.stdout.write(`|(${this.vertices[rotulo_vertice].rotulo})|--`);
        let no_atual = this.vertices[rotulo_vertice].prox_no;
        while(no_atual.prox_no != null){
            process.stdout.write(`|(${no_atual.rotulo})|${no_atual.peso}|--`);
            no_atual = no_atual.prox_no;
        }
        process.stdout.write(`|(${no_atual.rotulo})|${no_atual.peso}|`);

        console.log("");
        return;
    }
}


let lista = new ListaAdjacencia(5);

lista.mostrarVertices();

lista.adicionarAresta(0, 0, 1);
lista.adicionarAresta(0, 1, 1);
lista.adicionarAresta(0, 2, 1);
lista.adicionarAresta(0, 2, 1);
lista.adicionarAresta(0, 1, 1);

lista.adicionarAresta(1, 4, 12);
lista.adicionarAresta(1, 2, 5);
lista.adicionarAresta(1, 1, 9);
lista.adicionarAresta(1, 3, 5);

lista.adicionarAresta(4, 2, 4);
lista.adicionarAresta(4, 4, 1);
lista.adicionarAresta(4, 1, 7);

lista.mostrarVertices();

lista.nVertices();
lista.nArestas();

// console.log(lista.vertices.length)