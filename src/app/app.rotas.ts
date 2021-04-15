
import { Routes } from '@angular/router';

// Componentes
import { HomeComponent } from './paginas/home/home.component';
import { ClienteComponent } from './paginas/cliente/cliente.component';
import { ProdutoComponent } from './paginas/produto/produto.component';
import { VendaComponent } from './paginas/venda/venda.component';

export const ROTAS: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'cliente', component: ClienteComponent, data: { title: 'Cliente' } },
    { path: 'produto', component: ProdutoComponent, data: { title: 'Produto' } },
    { path: 'venda', component: VendaComponent, data: { title: 'Venda' } }
];
