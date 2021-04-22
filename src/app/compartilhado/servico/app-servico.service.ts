import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Modelos
import { Produto } from 'src/app/paginas/produto/produto.modelo';
import { Cliente } from 'src/app/paginas/cliente/cliente.modelo';
import { Venda } from 'src/app/paginas/venda/venda.modelo';

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

    inserirAtualizarCliente(cliente: Cliente): Promise<void> {
        return this.firestore.collection('cliente').doc(cliente.documento.toString()).set(cliente);
    }

    getListaCliente(): Observable<DocumentChangeAction<unknown>[]> {
        return this.firestore.collection('cliente').snapshotChanges();
    }

    excluirCliente(documento: number): void {
        this.firestore.doc('cliente/' + documento).delete();
    }

    inserirAtualizarVenda(venda: Venda): Promise<void> {
        return this.firestore.collection('venda').doc(venda.codigo.toString()).set(venda);
    }

    excluirVenda(documento: number): void {
        this.firestore.doc('venda/' + documento).delete();
    }

    getListaVenda(): Observable<DocumentChangeAction<unknown>[]> {
        return this.firestore.collection('venda').snapshotChanges();
    }
}
