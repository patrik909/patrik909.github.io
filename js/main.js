/* ----- GENERAL ----- */

function getID(id){
    //Function to fetch elements in index.html.
    return document.getElementById(id);
}

var outputDiv = getID('output');
const randomizeButton = getID('randomize');

//EvenListener for randomize button in index.html
randomizeButton.addEventListener('click', fetchRandom);

/* ------ FETCHES ------ */

function fetchRandom(){
    //Function to fetch random food.
    const randomizedMeal = fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    
    randomizedMeal.then((response) => {
        
        return response.json();
        
    }).then((randomizedMeal) => {
        
        displayRandom(randomizedMeal);
        
    }).catch((error) => {
        
        displayError(error);
        
    }); 
    
}

function fetchRelatedFood(searchValue, storedRandom){
    //Function to fetch more recipes by category.

    const relatedFood = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchValue}`);
    
    relatedFood.then((response) => {
        
        return response.json();
        
    }).then((relatedFood) => {
        
        displayRelated(relatedFood, storedRandom)
        
    }).catch((error) => {
        
        displayError(error);
        
    }); 
    
}

function fetchReadMoreRelated(id, storedRelated, storedRandom){
    //Function to fetch more information of choosen recipe by id.
    
   const readMoreRelatedRecipe = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    
    readMoreRelatedRecipe.then((response) => {
        
        return response.json();
        
    }).then((readMoreRelatedRecipe) => {

        displayReadMoreRelated(readMoreRelatedRecipe, storedRelated, storedRandom);
        
    }).catch((error) => {
        
        displayError(error);
        
    });
}

/* ------ DISPLAYS ------ */

function displayRandom(food){
       
    for(const mealData of food.meals){
        // mealData.strMeal = Meal title
        randomFetchedMeal=`
            <div class="displayRandomWrapper fadeOut">
                <div class="headingWrapper">    
                    <h2><span class="textUppercase">${mealData.strMeal}</span></h2>
                    <h3><span class="textUnderline">Category: ${mealData.strCategory}</span></h3>
                </div>
                <div class="randomButtonWrapper">
                    <div class="interestedWrapper">
                        <p>INTERESTING?</p>
                        <button id="readMoreRandom">SHOW RECIPE</button>
                    </div>
                    <div class="tryAgainWrapper">
                        <p>NO?</p>
                        <button id="tryAgain">TRY AGAIN!</button>
                    </div>
                </div>
            </div>
        `;  
    }
    
    outputDiv.innerHTML=randomFetchedMeal;
    //Adds the content to index.html.
    
    setTimeout(function(){
        
        //Fades in the content of displayRandomWrapper
        outputDiv.firstElementChild.
        classList.remove('fadeOut');
        
    }, 500);
    
    const readMoreRandomButton = getID('readMoreRandom');
    const tryAgainButton = getID('tryAgain');
    
    readMoreRandomButton.addEventListener('click', function(){

        outputDiv.firstElementChild.
        classList.add('fadeOut');
        //Fades out the displayRandomWrapper.
        
        setTimeout(function(){  
            displayReadMoreRandom(food);
            //Waits til the content is faded out.
        }, 700);    
          
    });
    
    tryAgainButton.addEventListener('click', function(){
        
        outputDiv.firstElementChild.
        classList.add('fadeOut');
        //Fades out the displayRandomWrapper.
        
        setTimeout(function(){  
            fetchRandom();
            //Waits til the content is faded out.
        }, 700);
        
    });
    
}

function displayReadMoreRandom(food){
    //Displays the content for Read more of Random
    
    let meal = food.meals[0];
    const ingArray = [];
    const measArray = [];
    
    for (const ingMeas in meal){

        if(ingMeas.includes('strIngredient')){
            //Checks if strIngreient has value 
            //Then push it to an ingArray
            const ing = food.meals[0][ingMeas];
            if(ing){
                ingArray.push(ing);
            }  
        }
        
        if(ingMeas.includes('strMeasure')){
            //Checks if strIngreient has value 
            //Then push it to an ingArray
            const meas = food.meals[0][ingMeas];
            if(meas){
                measArray.push(meas);
            }  
        }
        
    }

    for(const mealData of food.meals){
        // mealData.strMeal = Meal title
        readMoreRandomMeal=`
            <div class="readMoreWrapper fadeOut">
                <h2><span class="textUppercase">${mealData.strMeal}</span></h2>
                <div class="readMoreCategory">
                    <h3><span class="textUnderline">Category: ${mealData.strCategory}</span></h3>
                    <button id="findMore" class="readMoreCatButton">SHOW RELATED</button>
                </div>
                <div class="ingredientsAndInstructions">
                    <div class="cookingIngredients">
                        <div id="ingredients">
                        </div>
                        <div id="measures">
                        </div>
                    </div>
                    <div class="cookingInstructions">
                        ${mealData.strInstructions}
                    </div>
                </div>
            </div>
        `;
        
        let ingTitles = "";
        for (const ingTitle of ingArray){
            ingTitles+=`<p>${ingTitle}</p>`;
        }
        
        let measTitles = "";
        for (const measTitle of measArray){
            measTitles+=`<p>${measTitle}</p>`;
        }

        
        //Adds the content to index.html.
        output.innerHTML=readMoreRandomMeal;
        
        const ingDiv = getID('ingredients');
        const measDiv = getID('measures');
        
        ingDiv.innerHTML=ingTitles;
        measDiv.innerHTML=measTitles;

        setTimeout(function(){

            //Fades in the content of displayRandomWrapper
            outputDiv.firstElementChild.
            classList.remove('fadeOut');

        }, 500);

        let meal = food;
        const findMoreButton = getID('findMore');

        findMoreButton.addEventListener('click', function(){
            
            outputDiv.firstElementChild.
            classList.add('fadeOut');
            //Fades out the displayRandomWrapper.
        
            setTimeout(function(){  
                fetchRelatedFood(mealData.strCategory, meal)
                //Waits til the content is faded out.
            }, 700);  
        });
    
    }
    
}

function displayRelated(food, storedRandom){
    
    let relatedTitles = ""
    
    let storedRelated = food;
    const heading = `<h2><span class="textUnderline">${storedRandom.meals[0].strCategory}</span></h2>`;
    
    for(const mealData of food.meals){

        relatedTitles+=`
            <div class="displayRelated">
                <button class="readMoreRelated">
                    <p>${mealData.strMeal}</p><span class="weight700">VIEW</span>
                </button>
                <input class="hiddenInput" type="hidden" value="${mealData.idMeal}">
            </div>
        `;
    
        const back = `<button id="back" class="displayRelatedBack">BACK</button>`;

        output.innerHTML=`<div class="displayRelatedWrapper">${heading + relatedTitles + back}</div>`;
        
        setTimeout(function(){
        
            //Fades in the content of displayRandomWrapper
            outputDiv.firstElementChild.
            classList.remove('fadeOut');
        
        }, 500);

        const readMoreRelatedButton = document.getElementsByClassName('readMoreRelated');
        
        const backButton = getID('back');
        
        for(i = 0; i < readMoreRelatedButton.length; i++){    
        
            readMoreRelatedButton[i].addEventListener('click', function(){
        
                let id = this.nextElementSibling.value
                
                outputDiv.firstElementChild.
                classList.add('fadeOut');
                //Fades out the displayRandomWrapper.
        
                setTimeout(function(){  
                    fetchReadMoreRelated(id , storedRelated, storedRandom)
                    //Waits til the content is faded out.
                }, 700);
                
            });
        
        }

        backButton.addEventListener('click', function(){

            outputDiv.firstElementChild.
            classList.add('fadeOut');
            //Fades out the displayRandomWrapper.
        
            setTimeout(function(){  
                displayReadMoreRandom(storedRandom)
                //Waits til the content is faded out.
            }, 700);

        });
        
    }
    
}

function displayReadMoreRelated(food, storedRelated, storedRandom){
    //Displays the content for Read more of Related
    
    let meal = food.meals[0];
    const ingArray = [];
    const measArray = [];
    
    for (const ingMeas in meal){

        if(ingMeas.includes('strIngredient')){
            //Checks if strIngreient has value 
            //Then push it to an ingArray
            const ing = food.meals[0][ingMeas];
            if(ing){
                ingArray.push(ing);
            }  
        }
        
        if(ingMeas.includes('strMeasure')){
            //Checks if strIngreient has value 
            //Then push it to an ingArray
            const meas = food.meals[0][ingMeas];
            if(meas){
                measArray.push(meas);
            }  
        }
        
    }

    for(const mealData of food.meals){
        // mealData.strMeal = Meal title
        readMoreRandomMeal=`
            <div class="readMoreWrapper fadeOut">
                <h2><span class="textUppercase">${mealData.strMeal}</span></h2>
                <div class="readMoreCategory">
                    <h3><span class="textUnderline">Category: ${mealData.strCategory}</span></h3>
                    <button id="back" class="readMoreCatButton">BACK</button>
                </div>
                <div class="ingredientsAndInstructions">
                    <div class="cookingIngredients">
                        <div id="ingredients">
                        </div>
                        <div id="measures">
                        </div>
                    </div>
                    <div class="cookingInstructions">
                        ${mealData.strInstructions}
                    </div>
                </div>
            </div>
        `;
        
        let ingTitles = ""
        for (const ingTitle of ingArray){
            ingTitles+=`<p>${ingTitle}</p>`;
        }
        
        let measTitles = ""
        for (const measTitle of measArray){
            measTitles+=`<p>${measTitle}</p>`;
        }

        //Adds the content to index.html.
        output.innerHTML=readMoreRandomMeal;
        
        const ingDiv = getID('ingredients');
        const measDiv = getID('measures');
        const backButton = getID('back');
        
        ingDiv.innerHTML=ingTitles;
        measDiv.innerHTML=measTitles;

        setTimeout(function(){

            //Fades in the content of displayRandomWrapper
            outputDiv.firstElementChild.
            classList.remove('fadeOut');

        }, 500);

        backButton.addEventListener('click', function(){

            outputDiv.firstElementChild.
            classList.add('fadeOut');
            //Fades out the displayRandomWrapper.
        
            setTimeout(function(){  
                //Waits til the content is faded out.
                displayRelated(storedRelated, storedRandom)
            }, 700);

        });
    
    }
    
}

function displayError(error){
    
    output.innerHTML=`
        <div class="errorMessage fadeOut">
            <p class="sorryMessage">
                SORRY, SOMETHING MUST HAVE GONE WRONG!
            </p>
            <p class="tryAgainMessage">
                <span class="weight700">
                PLEASE, TRY AGAIN!</span>
            </p>
        </div>
    `;
    
    setTimeout(function(){

        //Fades in the content of displayRandomWrapper
        outputDiv.firstElementChild.
        classList.remove('fadeOut');

    }, 500);
}