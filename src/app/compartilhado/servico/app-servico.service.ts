import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Modelos
import { Produto } from 'src/app/paginas/produto/produto.modelo';

@Injectable()
export class AppServico {

    constructor(private firestore: AngularFirestore) { }

    inserirAtualizarProduto(produto: Produto): Promise<void> {
        return this.firestore.collection('produto').doc(produto.codigo.toString()).set(produto);
    }

    getListaProduto(): Observable<DocumentChangeAction<unknown>[]> {
        return this.firestore.collection('produto').snapshotChanges();
    }

    excluirProduto(idProduto: number): void {
        this.firestore.doc('produto/' + idProduto).delete();
    }
}
