const express = require('express');
const app = express()
const fs = require('fs')
app.use(express.json())



//GET – Retrieve data from a server (e.g., fetching a list of users).
//POST – Send data to the server to create a new resource (e.g., adding a new user).
//PUT – Update an entire resource by replacing it (e.g., updating a user’s profile).
//PATCH – Partially update a resource (e.g., changing only the user’s email).
//DELETE – Remove a resource from the server (e.g., deleting a user account).

//get can be tested in the browser
app.get('/', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.send('Resource created get')
});

//if we have two routes with the same path but different methods, the first one will be used ('/) and the second one will be ignored ('/users')
//for post we use postman to test
//post can't be tested in the browser
app.post('/', (req, res) => {
  //destructuring
  const {email,password} = req.body

  console.log(email,password);//(req.body);
  res.status(201).json
  ({
    message: 'Resource created post',
    data : {email,password}
  })
});

//post with fileSystem
app.post('/1fs', (req, res) => {
  //destructuring
  const {email,password} = req.body
  
  fs.writeFile("filePath.txt", JSON.stringify(req.body), (err) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error writing to file')
    } else {
      res.status(201).json({
        message:"Resource created",
      })
    }
  })

});

app.post('/2fs', (req, res) => {
  //destructuring
  const {id,email,password} = req.body
  
  fs.appendFile("data.txt", JSON.stringify(req.body), (err) => {
   if(err) {
    return res.status(500).json({
      message:err.message
   })}
    res.status(201).json({
      message:"data added",
    })  
  })

});


app.put('/:query', (req, res) => {
  const { query } = req.params
  //destructuring
  const {id,email, password } = req.body
  res.status(200).json({
    message: 'Resource updated',
    data: {id,email,password}
  })
})

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`)
})
