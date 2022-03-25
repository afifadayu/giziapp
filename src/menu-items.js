export default {
    items: [
        {
            id: 'navigation',
            title: 'Menu',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'home',
                    title: 'Beranda',
                    type: 'item',
                    url: '/beranda',
                    icon: 'feather icon-home',
                },
                {
                    id: 'prediksi',
                    title: 'Prediksi Kasus Gizi Buruk',
                    type: 'item',
                    url: '/analisis-data',
                    icon: 'feather icon-book',
                },
                {
                    id: 'laporan',
                    title: 'Laporan Gizi Balita',
                    type: 'item',
                    url: '/laporan',
                    icon: 'feather icon-pie-chart',
                }
            ]
        },
        {
            id: 'navigation',
            title: 'Operasi Timbang',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'masukkan-data',
                    title: 'Masukkan Data Balita',
                    type: 'item',
                    url: '/tambah-data',
                    icon: 'feather icon-sidebar',
                },
                {
                    id: 'akses-data',
                    title: 'Akses Data Balita',
                    type: 'item',
                    url: '/akses-data',
                    icon: 'feather icon-file-text',
                }
            ]
        }
    ]
}