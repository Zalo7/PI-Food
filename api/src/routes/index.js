const { Router } = require('express');
const axios = require('axios')
const router = Router();
const {Recipe, DietType} = require('../db')
const { API_KEY } = process.env;


const infoApi = async() => {
    const getInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${100}`);
    const apiData = await getInfo.data.results.map(e => {
        return {
            id: e.id,
            name: e.title,
            diets: e.diets,
            type: e.dishTypes,
            image: e.image,
            healthScore: e.healthScore,

        }
    });
    return apiData;
}

const infoDB = async () => {
return await Recipe.findAll({
    include: {
        model: DietType,
        attributes: ['name'],
        through: {
            attributes: []
        }
    }
 })  
};


const allRecipes = async () => {
    const apiData = await infoApi();
    const apiDB = await infoDB();
    const infoTotal = apiData.concat(apiDB);
    return infoTotal;
};


//Buscamos una recipe por req.query (por nombre)
router.get('/recipes', async(req, res, next) => {
    const { name } = req.query;

    try {
        const totalRecipes = await allRecipes();

        if(name) {
            const nameRecipes = await totalRecipes.filter(e => 
                e.name.toLowerCase().includes(name.toLocaleLowerCase())
                )
                nameRecipes.length ?
                res.send(nameRecipes) :
                res.status(404).send({error: 'Recipe not found'})
        } else {
            res.status(200).send(totalRecipes)
        }
    } catch (error) {
        next(error)
    }
});

//Buscamos la recipe por ID mediante req.params
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try{
        let recipeDB
        if(typeof id === 'string' && id.length > 10){
            recipeDB = await Recipe.findByPk(id, {
                include: {
                    model: DietType,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                },
            })
            res.send(recipeDB)
            //si no esta en la DB
        } else {
            const recipeApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
            return res.json({
                id: recipeApi.data.id,
                image: recipeApi.data.image,
                name: recipeApi.data.title,
                diets: recipeApi.data.diets,
                type: recipeApi.data.dishTypes,
                summary: recipeApi.data.summary,
                score: recipeApi.data.healthScore,
                healthLevel: recipeApi.data.spoonacularScore,
                steps: recipeApi.data.instructions
            })

        }

    } catch(error) { 
        next(error)
    }
});

router.get('/', async (req, res, next) => {
    const dietTypes = ['dairy free', 'vegan', 'gluten free',
     'lacto ovo vegetarian', 'pescatarian', 'paleolithic', 
     'primal', 'fodmap friendly', 'whole30', 'vegetarian'
    ];

try {
    dietTypes.forEach((e) => {
        DietType.findOrCreate({
    where: {name: e},
    defaults: { name: e, 
    },
  });
  console.log(dietTypes)
});

const allDiets = await DietType.findAll();
res.send(allDiets)

} catch(error) {
    next(error)
}
});

router.post('/new', async (req, res, next) => {
    let {name, summary, score, healthLevel, steps, diets, image} = req.body;
    try{
        const newRecipe = await Recipe.create({
            name,
            summary,
            score,
            healthLevel,
            steps,
            diets,
            image
        })
        let typeDB = await DietType.findAll({
            where: { name: diets },
        })
        await newRecipe.addDietType(typeDB);
        res.send(newRecipe)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
