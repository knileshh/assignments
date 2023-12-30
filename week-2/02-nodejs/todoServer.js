/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const express = require('express');
  const bodyParser = require('body-parser');
  
  const app = express();
  
  app.use(bodyParser.json());
  
  module.exports = app;


  //my code

  let todoArray = [
    {
    todo: "Todo 1: Your title",
    description: "this is todo's description",
    id: 5
    },
    
    {
    todo: "Todo 2: do number",
    description: "Desc of 2nd todo",
    id: 6
    }

  ];

  let titleArray = []; // second array to store the other elem's

  function getTodo(){ // push id and title to titleArray.
    for(i=0; i<todoArray.length; i++){
      // titleArray.push(todoArray[i].todo);
      // titleArray.push(todoArray[i].id);
      const items = {
        todo: todoArray[i].todo,
        id: todoArray[i].id
      };
      titleArray.push(items);
    }
  }

  app.get("/todos", (req, res) => {
    // let sentResponse = "What do you know"
    getTodo(); //iterate through array and push to new array.
    res.status(200).json({
      // ToDoArray: JSON.stringify(todoArray),
      "ToDoArray": todoArray
      // ToDoList: JSON.stringify(titleArray)
    })
  })

  getTodo(); // initialize once that's it, nothing more.


  //TODO: just generate a random id, tomorrow.
  app.get("/todos/:id", (req, res) => {
    let id2Check = req.params.id;
    let found = titleArray.find(array => array.id === parseInt(id2Check))
    if(found){
      res.status(200).json({
        titleArray: titleArray,
        What: found
      });
    }else {
      res.status(404).json({
        Error: "Invalid id"
      })
    }
  })

  //POST
  app.post("/todos", (req, res) => {
    let body = req.body;

    todoArray.push(body);
    // titleArray.push(body);

    res.status(201).json({
      Data: "Inserted successful",
      Array: todoArray
    })

  })

app.put("/todos/:id", (req, res) => {
  let id3Check = req.params.id;

  let updateContent = req.body;

  let found2 = todoArray.find(array => array.id === parseInt(id3Check)) //find the array of id

  let foundIndex = todoArray.findIndex(array => array.id === parseInt(id3Check))

  if(foundIndex !== -1){
    //index, no. of elem to remove, 
    // todoArray.splice(foundIndex, 1, updateContent);
    todoArray.splice(foundIndex, 1, updateContent);
    res.status(200).json({
      todoArray: todoArray,
      // titleArray: titleArray
    })
  } else{
    res.status(404).json({
      Error: "Id out of bound."
    })
  }  
})

app.delete("/todos/:id", (req, res) => {
  let theId = req.params.id;

  let toDel = todoArray.findIndex(array => array.id === parseInt(theId))

  if(toDel !== -1){
    todoArray.splice(toDel, 1);
    res.status(200).json({
      "msg": "Record deleted successfully.",

      "Updated": todoArray
    })
  }else{
    res.status(404).json({
      "Error": "Invalid id"
    })
  }

})

app.use((req, res, next) => {
  res.status(404).send('Page not found');
})

  app.listen(3000)