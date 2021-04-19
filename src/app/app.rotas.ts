
import { Routes } from '@angular/router';

// Componentes
import { HomeComponent } from './paginas/home/home.component';
import { ClienteComponent } from './paginas/cliente/cliente.component';
import { ProdutoComponent } from './paginas/produto/produto.component';
import { VendaComponent } from './paginas/venda/venda.component';

// Permissao Rota
import { PermissaoRota } from 'src/app/permissao-rota';

export const ROTAS: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '', data: { title: 'Test WKTec' },
        children: [
            { path: 'home', component: HomeComponent, data: { title: 'Home' }, canActivate: [PermissaoRota] },
            { path: 'cliente', component: ClienteComponent, data: { title: 'Cliente' }, canActivate: [PermissaoRota] },
            { path: 'produto', component: ProdutoComponent, data: { title: 'Produto' }, canActivate: [PermissaoRota] },
            { path: 'venda', component: VendaComponent, data: { title: 'Venda' }, canActivate: [PermissaoRota] }
        ]
    }
];
