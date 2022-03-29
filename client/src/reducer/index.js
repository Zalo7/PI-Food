const initialState = {
    recipes : [],
    diets: [],
    filtrados: [],
    filtrados2: [],
    detail: []
}

function rootReducer (state=initialState, action) {
   switch(action.type) {
       case 'GET_RECIPES':
           return {
               ...state,
               recipes: action.payload,
               filtrados: action.payload,
               filtrados2: action.payload
           }
               case "GET_DIETS":
                return {
                    ...state,
                    diets: action.payload
                }
                case "GET_NAME_RECIPES":
                    return {
                        ...state,
                        filtrados: action.payload    
           }
           case "POST_RECIPE":
            return {
              ...state,
            };
          case "FILTER_BY_HEALTH":
              const filterHealth = action.payload === "max" 
              ? state.filtrados2.sort((a, b) => {
                if (a.healthScore > b.name) {
                    return 1;
                }
                if (b.healthScore > a.healthScore) {
                    return -1;
                } else {
                    return 0;
                }
            })
            : state.filtrados.sort((a, b) => {
                if (a.healthScore > b.healthScore) {
                    return -1;
                }
                if (b.healthScore > a.healthScore) {
                    return 1;
                } else {
                    return 0;
                }
            });
            case "GET_DETAILS": 
                return {
                    ...state,
                    filtrados: filterHealth
                }
                case "FILTER_BY_TYPES":
                    const typesFil = state.filtrados2;
                    const typeFiltered = 
                     action.payload === "All" 
                        ? typesFil 
                        : typesFil.filter((el) => 
                          el.createdInDB 
                          ? el.dietTypes.map((el) => el.name.includes(action.payload))
                            : el.diets.includes(action.payload)
                            );
                            console.log('typesFilter', typeFiltered)
                    return {
                        ...state,
                        filtrados: typeFiltered
                    };
            case "ORDER_BY_NAME":
                const filterName =
                    action.payload === "asc"
                        ? state.filtrados.sort((a, b) => {
                            if (a.name > b.name) {
                                return 1;
                            }
                            if (b.name > a.name) {
                                return -1;
                            } else {
                                return 0;
                            }
                        })
                        : state.filtrados.sort((a, b) => {
                            if (a.name > b.name) {
                                return -1;
                            }
                            if (b.name > a.name) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                        console.log('filtername', filterName)
                return {
                    ...state,
                    recipes: filterName,
                };
           default:
               return state;
   }
}

export default rootReducer;