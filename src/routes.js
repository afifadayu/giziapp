import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const SignIn = React.lazy(() => import('./Screen/Authentication/SignIn'));
const ReportData = React.lazy(() => import('./Screen/Report/Nvd3Chart'));
const InputForm = React.lazy(() => import('./Screen/InputForm'));
const TableView = React.lazy(() => import('./Screen/TableView'));
const EditForm = React.lazy(() => import('./Screen/EditForm'));
const SummaryView = React.lazy(() => import('./Screen/SummaryView'));
const SummaryAdd = React.lazy(() => import('./Screen/SummaryAdd'));
const Analysis = React.lazy(() => import('./Screen/Analysis'));
const Home = React.lazy(() => import('./Screen/Home'));


const routes = [
    { path: '/signin', exact: true, name: 'Default', component: SignIn },
    { path: '/beranda', exact: true, name: 'Default', component: Home },
    { path: '/laporan', exact: true, name: 'Default', component: ReportData },
    { path: '/tambah-data', exact: true, name: 'Default', component: InputForm },
    { path: '/akses-data', exact: true, name: 'Default', component: TableView },
    { path: '/edit-data', exact: true, name: 'Default', component: EditForm },
    { path: '/detail-data', exact: true, name: 'Default', component: SummaryView },
    { path: '/detail-tambah-data', exact: true, name: 'Default', component: SummaryAdd },
    { path: '/analisis-data', exact: true, name: 'Default', component: Analysis },
];

export default routes;