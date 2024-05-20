const express=require("express")
const bodyParser=require("body-parser")
const sequelize=require("./config/db")

const app=express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });
app.use("/planning",require('./routes/planningRouter'))
app.use("/pointeuse",require("./routes/pointeuseRouter"))
app.use("/employe",require("./routes/employeRouter"))
app.use("/admin",require("./routes/adminRouter"))
app.use("/seance",require("./routes/SeanceRouter"))
app.use("/pointage",require("./routes/pointageRouter"))
app.use("/formule_mensuel",require("./routes/ForumuleRouter"))
app.use("/repos",require("./routes/reposRouter"))
app.use("/conge",require("./routes/congeRouter"))
app.use("/tableau_de_bord",require("./routes/tableau_board"))




const PORT=3000
app.listen(PORT,()=>{
    console.log(`serveur Running on port :${PORT}` )
})