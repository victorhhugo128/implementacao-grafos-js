const fila_de_prioridade = require("./fila_de_prioridade");

class No {  // classe auxiliar para lista adjacencia no grafo
    constructor(rotulo, peso, prox_no){
        this.rotulo = rotulo;
        this.peso = peso;
        this.prox_no = prox_no;
    }
}

class Grafo {
    constructor(n_vertices, direcionado = true){
        this.vertices = Array(n_vertices).fill().map((_, indice) => new No(indice, 0, null));
        this.n_arestas = 0;
        this.n_vertices = n_vertices;
        this.direcionado = direcionado;
    }

    nVertices(){
        console.log(`Há ${this.vertices.length} vértices no grafo.`);
        return this.vertices.length;
    }

    nArestas(){
        console.log(`Há ${this.n_arestas} arestas no grafo.`);
        return this.n_arestas;
    }

    adicionarNaLista(rotulo_vertice, vertice_adjacente, peso){
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
    }

    adicionarAresta(rotulo_vertice, vertice_adjacente, peso = 1){
        // verifica se o vértice correspondente existe
        if(vertice_adjacente >= this.vertices.length){
            console.log("Vértice inexistente.");
            return;
        }

        this.adicionarNaLista(rotulo_vertice, vertice_adjacente, peso);

        if(!this.direcionado){
            this.adicionarNaLista(vertice_adjacente, rotulo_vertice, peso);
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

class Vertice{  // classe auxiliar para busca
    constructor(){
        this.descoberta = null;
        this.termino = null;
        this.antecessor = null;
        this.cor = null;
    }
}

class BuscaProfundidade{
    constructor(grafo){
        this.grafo = grafo;
        this.vertices = Array(this.grafo.n_vertices).fill().map(() => new Vertice());
        this.tempo = 0;
    }

    BRANCO(){
        return 0;
    }

    CINZA(){
        return 1;
    }

    PRETO(){
        return 2;
    }

    dfs(vertice_inicial){
        for(let vertice of this.vertices){
            vertice.cor = this.BRANCO();
        }

        const n_vertices = this.grafo.n_vertices;
        let vertice_atual = vertice_inicial;

        if(vertice_inicial >= n_vertices){
            console.log("Vértice inicial inválido.");
            return;
        }

        do{
            if(this.vertices[vertice_atual].cor == this.BRANCO()){
                console.log("passou!");
                this.dfsVisita(vertice_atual);
            }

            vertice_atual++;
            vertice_atual = vertice_atual % n_vertices;
        }while(vertice_atual != vertice_inicial);
    }

    dfsVisita(vertice){
        let vertice_atual = this.vertices[vertice];
        vertice_atual.cor = this.CINZA();
        this.tempo++;
        vertice_atual.descoberta = this.tempo;

        let prox_adj = this.grafo.vertices[vertice].prox_no;

        while(prox_adj != null){
            if(this.vertices[prox_adj.rotulo].cor == this.BRANCO()){
                this.vertices[prox_adj.rotulo].antecessor = vertice;
                this.dfsVisita(prox_adj.rotulo);
            }
            prox_adj = prox_adj.prox_no;
        }

        vertice_atual.cor = this.PRETO();
        this.tempo++;
        vertice_atual.termino = this.tempo;
    }

    mostraResultado(){
        for(const vertice in this.vertices){
            console.log(`Antecessor[${vertice}] = ${this.vertices[vertice].antecessor}\nDescoberta[${vertice}] = ${this.vertices[vertice].descoberta}\nTermino[${vertice}] = ${this.vertices[vertice].termino}\n\n`)
        }
    }
}


class BuscaLargura{
    constructor(grafo){
        this.grafo = grafo;
        this.vertices = Array(this.grafo.n_vertices).fill().map(() => new Vertice());
        this.tempo = 0;
    }

    BRANCO(){
        return 0;
    }

    CINZA(){
        return 1;
    }

    PRETO(){
        return 2;
    }

    bfs(vertice_inicial){
        for(let vertice in this.vertices){
            if(vertice == vertice_inicial){
                continue;
            }
            this.vertices[vertice].cor = this.BRANCO();
            this.vertices[vertice].descoberta = Number.MAX_SAFE_INTEGER;
            this.vertices[vertice].antecessor = null;
        }

        this.vertices[vertice_inicial].cor = this.CINZA();
        this.vertices[vertice_inicial].descoberta = 0;
        this.vertices[vertice_inicial].antecessor = null;

        let fila = Array();
        let prox_adj = null;
        let vertice_atual = null;

        fila.unshift(vertice_inicial);

        while(fila.length != 0){
            vertice_atual = fila.pop();
            prox_adj = this.grafo.vertices[vertice_atual].prox_no;
            while(prox_adj != null){
                if(this.vertices[prox_adj.rotulo].cor == this.BRANCO()){
                    this.vertices[prox_adj.rotulo].cor = this.CINZA();
                    this.vertices[prox_adj.rotulo].descoberta = this.vertices[vertice_atual].descoberta + 1;
                    this.vertices[prox_adj.rotulo].antecessor = vertice_atual;
                    fila.unshift(prox_adj.rotulo);
                }
                prox_adj = prox_adj.prox_no;
            }
            this.vertices[vertice_atual].cor = this.PRETO();
        }
    }

    mostraResultado(){
        for(const vertice in this.vertices){
            console.log(`Antecessor[${vertice}] = ${this.vertices[vertice].antecessor}\nDescoberta[${vertice}] = ${this.vertices[vertice].descoberta}\n\n`)
        }
    }
}

class Dijkstra{
    constructor(grafo){
        this.grafo = grafo;
        this.fila_de_prioridade = new fila_de_prioridade.FilaPrioridade();
        this.conjunto_final = [];
    }

    encontrar_caminhos(fonte){
        this.fila_de_prioridade.inicializar_fila(this.grafo, fonte);
        let min_heap;

        while(this.fila_de_prioridade.vertices.length > 0){
            min_heap = this.fila_de_prioridade.retirar_heap_min();
            this.conjunto_final.push(min_heap);
            this.fila_de_prioridade.relaxar_vertice(this.grafo.vertices[min_heap.vertice], min_heap)
        }

    }
}

class FloydWarshall{
    constructor(grafo){
        this.grafo = grafo;
        this.n_vertices = this.grafo.nVertices();
        this.matriz = Array(this.n_vertices).fill().map((_,indice) => Array(this.n_vertices).fill().map((_, indice) => Number.MAX_SAFE_INTEGER)); 
    }

    encontrar_caminhos(){
        for(let diagonal = 0; diagonal < this.n_vertices; diagonal++){
            this.matriz[diagonal][diagonal] = 0;
        }
        
        let adjacencia = null;
        for(let vertice of this.grafo.vertices){
            adjacencia = vertice.prox_no;
            while(adjacencia != null){
                this.matriz[vertice.rotulo][adjacencia.rotulo] = adjacencia.peso;
                adjacencia = adjacencia.prox_no;
            }
        }

        for(let k = 0; k < this.n_vertices; k++){
            for(let j = 0; j < this.n_vertices; j++){
                for(let i = 0; i < this.n_vertices; i++){
                    if(this.matriz[i][j] > this.matriz[i][k] + this.matriz[k][j]){
                        this.matriz[i][j] = this.matriz[i][k] + this.matriz[k][j];
                    }
                }
            }
        }
    }
}

class BellmanFord{
    constructor(grafo){
        this.grafo = grafo;
        this.vertices = Array(this.grafo.nVertices()).fill().map((_, indice) => [Number.MAX_SAFE_INTEGER, null]); // this.vertices = [[distancia, antecessor]]; indice = vertice
    }

    encontrar_caminhos(vertice_inicial){
        this.vertices[vertice_inicial][0] = 0;  // inicializa do vértice escolhido
        let adjacencia = null;

        for(let iteracao = 0; iteracao < this.vertices.length - 1; iteracao++){
            for(let vertice in this.vertices){
                if(this.vertices[vertice][0] < Number.MAX_SAFE_INTEGER){ // verifica se o vértice já foi descoberto
                    adjacencia = this.grafo.vertices[vertice].prox_no;
                    while(adjacencia != null){  // anda pelas adjacencias do vértice
                        if(this.vertices[adjacencia.rotulo][0] > adjacencia.peso + this.vertices[vertice][0]){
                            this.vertices[adjacencia.rotulo][0] = adjacencia.peso + this.vertices[vertice][0];  // atualiza distancia
                            this.vertices[adjacencia.rotulo][1] = this.grafo.vertices[vertice].rotulo;    // atualiza antecessor
                        }

                        adjacencia = adjacencia.prox_no;
                    }
                }
            }
        }
    }

    mostrar_resultado(){
        for(let vertice in this.vertices){
            console.log(`Distância[${vertice}]: ${this.vertices[vertice][0]}\nAntecessor[${vertice}]: ${this.vertices[vertice][1]}\n`)
            console.log(``)
        }
    }
}

// let lista = new Grafo(5, false);

// lista.mostrarVertices();

// lista.adicionarAresta(0, 0, 1);
// lista.adicionarAresta(0, 1, 1);
// lista.adicionarAresta(0, 2, 1);
// lista.adicionarAresta(0, 2, 1);
// lista.adicionarAresta(0, 1, 1);

// lista.adicionarAresta(1, 4, 12);
// lista.adicionarAresta(1, 2, 5);
// lista.adicionarAresta(1, 1, 9);
// lista.adicionarAresta(1, 3, 5);

// lista.adicionarAresta(4, 2, 4);
// lista.adicionarAresta(4, 4, 1);
// lista.adicionarAresta(4, 1, 7);

// lista.mostrarVertices();

// lista.nVertices();
// lista.nArestas();

// console.log(lista.vertices.length)



// let grafo_teste = new Grafo(3);

// grafo_teste.adicionarAresta(1, 2);
// grafo_teste.adicionarAresta(2, 0);

// grafo_teste.mostrarAdjacencias(0);
// grafo_teste.mostrarAdjacencias(1);
// grafo_teste.mostrarAdjacencias(2);

// busca_profundidade = new BuscaProfundidade(grafo_teste);

// busca_profundidade.dfs(1);
// busca_profundidade.mostraResultado();

// let grafo_teste = new Grafo(8);

// grafo_teste.adicionarAresta(0, 3);
// grafo_teste.adicionarAresta(0, 4);
// grafo_teste.adicionarAresta(0, 1);
// grafo_teste.adicionarAresta(0, 2);
// grafo_teste.adicionarAresta(1, 5);
// grafo_teste.adicionarAresta(2, 5);
// grafo_teste.adicionarAresta(2, 6);
// grafo_teste.adicionarAresta(6, 7);

// busca_largura = new BuscaLargura(grafo_teste);

// busca_largura.bfs(0);
// busca_largura.mostraResultado();

// let grafo = new Grafo(5, true);

// grafo.adicionarAresta(0, 1, 4);
// grafo.adicionarAresta(0, 2, 2);
// grafo.adicionarAresta(1, 4, 5);
// grafo.adicionarAresta(2, 1, 1);
// grafo.adicionarAresta(2, 3, 3);
// grafo.adicionarAresta(3, 4, 1);

// let dijkstra = new Dijkstra(grafo);

// dijkstra.encontrar_caminhos(0);

// console.log(dijkstra.conjunto_final);


// let grafo = new Grafo(4, true);

// grafo.adicionarAresta(0, 2, -2);
// grafo.adicionarAresta(1, 0, 4);
// grafo.adicionarAresta(1, 2, 3);
// grafo.adicionarAresta(2, 3, 2);
// grafo.adicionarAresta(3, 1, -1);

// let floyd_warshall = new FloydWarshall(grafo);

// floyd_warshall.encontrar_caminhos();

// console.log(floyd_warshall.matriz);


let grafo = new Grafo(6, true);

grafo.adicionarAresta(0, 2, 2);
grafo.adicionarAresta(1, 0, 1);
grafo.adicionarAresta(2, 1, -2);
grafo.adicionarAresta(3, 0, -4);
grafo.adicionarAresta(3, 2, -1);
grafo.adicionarAresta(4, 3, 1);
grafo.adicionarAresta(5, 4, 8);
grafo.adicionarAresta(5, 0, 10);

let bellman_ford = new BellmanFord(grafo);

bellman_ford.encontrar_caminhos(5);

bellman_ford.mostrar_resultado();