
// Redux action to update the projet store
export const editProjet = (itemId) => ({
    type: '@@router/LOCATION_CHANGE',
    payload: {
        pathname: '/projets/' + itemId,
        search: '',
        hash: '',
        state: null,
        action: 'PUSH',
        //key: '3b130u',
        query: {},
        $searchBase: {
            search: '',
            searchBase: ''
        }
    }

})


export const loadProjets = () => ({

    type: 'CRUD_GET_LIST',
    payload: {
        pagination: {
            page: 1,
            perPage: 10
        },
        sort: {
            field: 'id',
            order: 'DESC'
        },
        filter: {}
    },
    meta: {
        resource: 'projets',
        fetch: 'GET_LIST',
        cancelPrevious: true
    }
})


export const updateDateProjet = (item, newDate, edge, projets) => ({
    type: 'CRUD_UPDATE',
    payload: {
        id: item, //'9',
        data: {  // body envoyé au serveur pour traitement
            id: item, //9,
            Nom: projets.data[item].Nom, // pas de chgt mais necessaire pour retour serveur
            DateDebut: edge === "left" ? newDate : projets.data[item].DateDebut,
            DateFin: edge === "right" ? newDate : projets.data[item].DateFin,
            IdentifiantMinos: projets.data[item].IdentifiantMinos,
            IdentifiantHermes: projets.data[item].IdentifiantMinos,
            Adm: projets.data[item].Adm,
            id_Client: projets.data[item].id_Client,
        },
        basePath: '/timelines'  //affiche timelines à la fin du traitement
    },
    meta: {
        resource: 'projets',
        fetch: 'UPDATE',
        cancelPrevious: false
    }
})