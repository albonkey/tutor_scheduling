const router = require('express').Router();
//require in our API TutorHub-api
const tutorApi = require('TutorHub-api');

// GET method expects a query parameter like below to search API for a keyword 
// Router endpoint url/search/item?keyword='something to search API'
router.get('/item', async (req, res) => {
    try {
        //object declaration
        const args = {
            
        };
        //object destructuring of query parameter:keyword within req with default value of jaguar
        const { keyword = 'biology' } = req.query;
        //assignment of query parameter:keyword to a string constant:search
        const search = keyword;
        /*assignment of a string constant:'tutors' to researchPeople
        researchPeople will be part of argument to TutorHub-api function call
        "tutors" tells TutorHub-api to limit search to Tutors, else the default search is all people
        index.js has a hard-coded constant of "all" for researching all people based on user needs
        */
        const researchPeople = 'tutors';
        //use object methods to add keys search & researchArt to object:args
        Object.assign(args, { search, researchPeople });
        //print object:args to console
        console.log(args);
        // get a list of entries related to keyword search by passing args to searchItem function in TutorHub-api
        const searchTutors = await tutorApi.searchItem(args);    
        console.log('- - - - - - - - - - - - - - - - - - - - -');
        //print search & keyword selection to console
        console.log(`browse type: ${researchPeople}`);
        console.log(`search key: ${search}`);
        console.log('- - - - - - - - - - - - - - - - - - - - -');
        if(args.researchPeople === 'tutors'){
            console.log('Search limited to tutors');
        }
        else{
            console.log('Search limited to All');
        }
        console.log('- - - - - - - - - - - - - - - - - - - - -\n');
        //array declaration to store data returned by TutorHub-api 
        const arr = [];
        for(let i = 0; i < searchItem.data.length; i++){
            //object declaration to store data to push to array
            const arrObj = {};
            /*access property:data of returned object:searchItem which is an array of objects using dot notation.
            iterate through array:data & access properties id & title of each object entry using dot notation.
            add keys id & name to object:arrObj using bracket notation w/ variable  
            */
            arrObj['id'] = searchItem.data[i].id;
            arrObj['fname'] = searchItem.data[i].fName;
            arrObj['lname'] = searchItem.data[i].lName;
            arrObj['subject'] = searchItem.data[i].subject;
            //push formed object:arrObj to array:arr for each iteration
            arr.push(arrObj);
            //print to console title by accessing object property:name of formed object:arrObj
            console.log(`${arrObj.fname}`);
        }
        //get length of arr which is equal to the number of tutors returned by TutorHub-api & print to console
        const numOfResults = arr.length;
        console.log(`numOfResults: ${numOfResults}`)
        console.log('- - - - - - - - - - - - - - - - - - - - -\n');

        // compose the JSON response

        const data = {
            numOfResults: numOfResults,
            searchResults: arr
        };
        //send json response to client:postman
        res.json(data);
        //catch errors related to http 
    } catch (error) {
        //error caused in server due to bugs in code 
        res.status(500).json({ error: error.toString() });
    }
});