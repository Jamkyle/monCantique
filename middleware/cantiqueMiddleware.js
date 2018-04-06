import { AsyncStorage } from 'react-native'

export default cantiqueMiddleware = store => next => action => {

    const BASE_URL = "https://fihirana.org/wp-content/plugins/fihirana/api/post.php?"
    // console.log(action);
    if( action.type === 'GET_TRAD' ){
      let num
      num = action.id.toString()
      let database = action.firebase.database()
       database.ref('/Traduction').orderByChild('id').equalTo(num).once('value')
       .then( trad => {
          let obj = trad.val()
          let key = JSON.stringify(obj).match(/(?:")(.*)(?:"\:{)/)[1]
          next({ type: 'GET_TRAD', trad : obj[key] })
      }).catch( e => {
        next({ type: 'GET_TRAD', trad : {strophe : [ { trad:'Aucune traduction trouvée'} ]} })
      })
    }

    if( action.routeName === 'LeCantique'){
      fetch(BASE_URL + "d=idsearch&da=" + action.params +"&r=json")
      .then( response => response.json() )
      .then( data => {
        next({ type: 'GET_CANTIQUE_RECEIVE', data })
      })
    }

    if( action.type === 'GET_LIST_BY_TITLE' ){
      let txt
      txt = action.id.toString()
      let database = action.firebase.database()
       database.ref('/Traduction').orderByChild('id').on('value', trad => {
          let obj = []
          trad.forEach( e => {
              if ((e.val().titre.toLowerCase()).includes(txt.toLowerCase())) {
                obj.push( e.val() )
              }
            })
          next({ type: 'DO_LIST_CANTIQUES', list : obj })
        })
    }

    if(action.type === 'DO_FAV_LIST'){
      AsyncStorage.getItem('@favorite').then( res => {
        if( res !== null )
          next({ type: 'FAV_LIST_CANTIQUE', list : JSON.parse(res) })
      })
      .catch( error => console.log('error!') )


    }
}
