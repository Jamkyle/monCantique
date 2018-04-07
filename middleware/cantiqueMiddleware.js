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

    if(action.type === 'ADD_TO_AS'){
      AsyncStorage.getItem(action.key).then(e => {
        let val = action.val.toString().match(/\d+/)[0]
        let key = action.key
        let arr = [ val ]
        let el = JSON.parse(e)
        if ( val !== null && val !== 0 &&  val !== "0" ) {
          if (el !== null) {
            if ( !el.includes(val) ) {
              arr = [val, ...el]
              AsyncStorage.setItem( key, JSON.stringify(arr) )
              .then( json => console.log('success! '+key) )
              .catch(error => console.log('error!'));
            }
          }else {
            AsyncStorage.setItem( key, JSON.stringify(arr) )
            .then( json => console.log('success first! '+key) )
            .catch(error => console.log('error!'));
          }
        }
      })
    }

    if( action.type === 'GET_PAGES'){
      let num
      num = action.id.toString()
      let database = action.firebase.database()
       database.ref('/Liturgie').orderByChild('id').equalTo(num).once('value')
       .then( trad => {
          let obj = trad.val()
          let key = JSON.stringify(obj).match(/(?:")(.*)(?:"\:{)/)[1]
          next({ type: 'GET_LITURGIE_RECEIVE', data : obj[key] })
      }).catch( e => {
        next({ type: 'GET_LITURGIE_RECEIVE', data : {} })
      })
    }
}
