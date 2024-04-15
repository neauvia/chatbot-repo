import express from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
    try {
        const gh = axios.create({
            baseURL: "https://api.github.com/users/takenet/repos?sort=created&direction=asc",
        });
        const response = await gh.get();
        var data = response.data
        const repoC = []
        for(let i=0;i<data.length;i++){
          if (data[i].language == "C#"){
            repoC.push({name:data[i].full_name, description: data[i].description, create: data[i].created_at, photo: data[i].owner.avatar_url})
          }
        }
        res.json(repoC);
    } catch (error) {
        console.error('Erro ao acessar a API do GitHub:', error);
        res.status(500).json({ error: 'Erro ao acessar a API do GitHub' });
    }
});

app.listen(port, () => {
    console.log('App running on port', port);
});
