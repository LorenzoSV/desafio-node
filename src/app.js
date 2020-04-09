const express = require("express");
const cors = require("cors");

 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title , url, techs} = request.body;
  var repositorio = {id:uuid(), title, url, techs, likes: 0};
  repositories.push(repositorio);

  return response.json(repositorio);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const {title, url, techs} = request.body;
  
  const repositorioIndex = repositories.findIndex(repositorio =>{
     return (repositorio.id === id) ;
  });

  if(repositorioIndex < 0){
  return  response.status(400).json({error : "Repository not found"});
  }
  


 
  const repositorio ={
      id,
      title,
      url,
      techs,
      "likes":repositories[repositorioIndex].likes
      
  };

  repositories[repositorioIndex] = repositorio;
  response.json(repositorio);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;

  const repositorioIndex = repositories.findIndex(repositorio =>{
    return (repositorio.id === id) ;

  });

  if(repositorioIndex < 0){
  return   response.status(400).json({error : "Repository not found"});
  }

  repositories.splice(repositorioIndex, 1);

  return response.status(204).send();
    
    
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params;
  
  
  const repositorioIndex = repositories.findIndex(repositorio =>{
    return (repositorio.id === id) ;

  });

  if(repositorioIndex < 0){
    return   response.status(400).json({error : "Repository not found"});
  }
  repositories[repositorioIndex].likes += 1;
  
 
   

  return response.status(204).json(repositories[repositorioIndex]);


});

module.exports = app;
