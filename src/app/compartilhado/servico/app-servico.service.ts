import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Modelos
import { Produto } from 'src/app/paginas/produto/produto.modelo';

@Injectable()
export class AppServico {

    constructor(private firestore: AngularFirestore) { }

    inserirAtualizarProduto(produto: Produto): Promise<any> {
        return this.firestore.collection('produto').doc(produto.codigo.toString()).set(produto);
    }

    getListaProduto(): Observable<Array<any>> {
        return this.firestore.collection('produto').snapshotChanges();
    }

    atualizarProduto(idProduto: number, produto: Produto): void {
        this.firestore.doc('produto/' + idProduto).update(produto);
    }

    excluirProduto(idProduto: number): void {
        this.firestore.doc('produto/' + idProduto).delete();
    }
}
