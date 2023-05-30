class Vertice{
    constructor(vertice, antecessor, distancia){
        this.vertice = vertice;
        this.antecessor = antecessor;
        this.distancia = distancia;
    }
}


class FilaPrioridade{
    constructor(){
        this.vertices = [];
        this.tam_heap = 0;
    }

    inicializar_fila(grafo, fonte){
        for(let vertice of grafo.vertices){
            if(fonte == vertice.rotulo){
                this.vertices.push(new Vertice(vertice.rotulo, null, 0))
                continue;
            }
            this.vertices.push(new Vertice(vertice.rotulo, null, Number.MAX_SAFE_INTEGER))
        }
    }

    no_pai(indice){
        return Math.ceil(indice/2 - 1);
    }

    no_esquerdo(indice){
        return 2*indice + 1;
    }

    no_direito(indice){
        return 2*indice + 2;
    }

    min_heapify(indice){
        const esquerdo = this.no_esquerdo(indice);
        const direito = this.no_direito(indice);
        let menor = 0;

        if(esquerdo < this.tam_heap && this.vertices[esquerdo].distancia < this.vertices[indice].distancia){
            menor = esquerdo;
        }
        else{
            menor = indice;
        }

        if(direito < this.tam_heap && this.vertices[direito].distancia < this.vertices[menor].distancia){
            menor = direito;
        }

        if(menor != indice){
            const temp = this.vertices[menor];
            this.vertices[menor] = this.vertices[indice];
            this.vertices[indice] = temp;
            this.min_heapify(menor);
        }
    }

    definir_heap_minimo(){
        this.tam_heap = this.vertices.length - 1
        for(let indice = Math.ceil(this.vertices.length / 2 - 1); indice >= 0; indice--){
            this.min_heapify(indice);
        }
    }

    // heapsort(){
    //     let temp;
    //     this.definir_heap_minimo();
    //     for(let indice = this.vertices.length - 1; indice >= 1; indice--){
    //         temp = this.vertices[0];
    //         this.vertices[0] = this.vertices[indice];
    //         this.vertices[indice] = temp;
    //         this.tam_heap = this.tam_heap - 1;
    //         this.min_heapify(0);
    //     }
    // }

    relaxar_vertice(lista_adjacencia_vertice, vertice_retirado){
        // for(let elemento in this.vertices){
        //     if(vertice == elemento.vertice && distancia < elemento.distancia){
        //         elemento.antecessor = antecessor;
        //         elemento.distancia = distancia;
        //     }
        // }

        let no = lista_adjacencia_vertice.prox_no;
        let lista_vertices = [];
        let vertice = null;
        let vertice_atual;
        // for(let elemento of this.vertices){
        //     if(elemento.vertice == lista_adjacencia_vertice.rotulo){
        //         vertice_atual = elemento;
        //         break;
        //     }
        // }

        while(no != null){
            vertice = new Vertice(no.rotulo, lista_adjacencia_vertice.rotulo, no.peso);
            lista_vertices.push(vertice);
            no = no.prox_no;
        }

        for(vertice of lista_vertices){
            for(let elemento of this.vertices){
                if(vertice.vertice == elemento.vertice && vertice.distancia + vertice_retirado.distancia < elemento.distancia){
                    elemento.antecessor = lista_adjacencia_vertice.rotulo;
                    elemento.distancia = vertice.distancia + vertice_retirado.distancia; 
                }
            }
        }
        this.definir_heap_minimo();
    }

    retirar_heap_min(){
        const vertice = this.vertices.shift();
        this.definir_heap_minimo();

        return vertice;
    }
}

module.exports = {FilaPrioridade, Vertice}