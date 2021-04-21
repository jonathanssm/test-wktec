
import { Routes } from '@angular/router';

// Componentes
import { HomeComponent } from './paginas/home/home.component';
import { ConsultaClienteComponent } from './paginas/cliente/consulta/consulta-cliente.component';
import { ConsultaProdutoComponent } from './paginas/produto/consulta-produto/consulta-produto.component';
import { VendaComponent } from './paginas/venda/venda.component';
import { CadastroProdutoComponent } from './paginas/produto/cadastro-produto/cadastro-produto.component';

// Permissao Rota
import { PermissaoRota } from 'src/app/permissao-rota';

export const ROTAS: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '', data: { title: 'Test WKTec' },
        children: [
            { path: 'home', component: HomeComponent, data: { title: 'Home' }, canActivate: [PermissaoRota] },
            {
                path: 'cliente', data: { title: 'Cliente' }, canActivate: [PermissaoRota],
                children: [
                    { path: 'consulta', component: ConsultaClienteComponent, data: { title: 'Cliente' }, canActivate: [PermissaoRota] }
                ]
            },
            {
                path: 'produto', data: { title: 'Produto' }, canActivate: [PermissaoRota],
                children: [
                    { path: 'consulta', component: ConsultaProdutoComponent, data: { title: 'Consulta' }, canActivate: [PermissaoRota] },
                    { path: 'cadastro', component: CadastroProdutoComponent, data: { title: 'Cadastro' }, canActivate: [PermissaoRota] }
                ]
            },
            { path: 'venda', component: VendaComponent, data: { title: 'Venda' }, canActivate: [PermissaoRota] }
        ]
    }
];
