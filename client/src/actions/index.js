import axios from 'axios';

export function getRecipes() {
    return async function(dispatch){
        let res = await axios.get(
            "http://localhost:3001/recipes",{
          });
          
          return dispatch({
              type: 'GET_RECIPES',
              payload: res.data
          });
    }
}

export function getDiets() {
    return async function(dispatch) {
        try{
            let res = await axios.get(
               "http://localhost:3001/",{
          })
          return dispatch({
              type: 'GET_DIETS',
              payload: res.data
          })

    }catch (error){
            console.log(error)
        }
        
    }
}

export function getNameRecipes(name) {
    return async function(dispatch){
        try{
            let res = await axios.get(
                'http://localhost:3001/recipes?name=' + name
            )
            return dispatch({
                type: "GET_NAME_RECIPES",
                payload: res.data
            })
        }catch (error) {
            console.log(error)
        }
    }
}

export function filterByTypes(payload) {
    console.log('types', payload)
    return {
        type: 'FILTER_BY_TYPES',
        payload
    };
};

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    };
};

export function postRecipe(payload) {
    return async function (dispatch) {
      const response = await axios.post('http://localhost:3001/new', payload)
      console.log(response)
      return response;
    }
  }

  export function filterByHealth(payload) {
    return {
        type: 'FILTER_BY_HEALTH',
        payload
    };
};

  export function getDetail (id) {
    return async function(dispatch){
        try{
            const res = await axios.get(
                `http://localhost:3001/${id}`
            );
            return dispatch({
                type: "GET_DETAILS",
                payload: res.data
            })
        } catch (err) {
            return {
                error: "Can't Get Details",
                originalError: err
            }
        }
    }
}