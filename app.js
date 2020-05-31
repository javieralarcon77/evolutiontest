const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')
const mongoose = require('mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const url = 'mongodb://localhost/taskjavier';

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.post('/api/user/login', (req, res) => {
	mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
		if(err){
            console.log("error al conectar con la base datos");
            return res.status(500).json({
                error:true,
                mensaje:"Conexion no establecida con la base de datos"
            })
        }
		User.find({
			email : req.body.email, password : req.body.password
		}, (err, user) => {
			if(err){
                console.log("error al conectar con el schema");
                return res.status(500).json({
					error:true,
					mensaje:"Error al conectar con el schema"
				})
            };
			if(user.length === 1){	
				return res.status(200).json({
					error:false,
					data: user[0]
				})
			} else {
				return res.status(200).json({
					error:true,
					mensaje: 'Login Fallo'
				})
			}			
		})
	});
})

app.post('/api/user/create', (req, res) => {
	mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
		if(err){
            console.log("error al conectar con la base datos");
            return res.status(500).json({
                error:true,
                mensaje:"Conexion no establecida con la base de datos"
            })
        }
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		})
		user.save((err, result) => {
			if(err){
                console.log("Error al crear el usuario");
                return res.status(500).json({
					error:true,
                    mensaje:"Error al crear el usuario",
                    error:err
				})
            }
			return res.status(200).json({
				error:false,
				data: user
			})
		})
	});
})

app.post('/api/task/list', (req, res) =>{
    mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
		if(err){
            console.log("error al conectar con la base datos");
            return res.status(500).json({
                error:true,
                mensaje:"Conexion no establecida con la base de datos"
            })
        }
        Task.find({ email_user : req.body.email }).sort({priority: 1}).then( 
            (tasks) => {
                return res.status(200).json({
                    error:false,
                    data: tasks
                })
            },
            (err)=>{
                console.log("error al conectar con el schema");
                return res.status(500).json({
                    error:true,
                    mensaje:"Error al conectar con el schema",
                    err: err
                })
            }
        )
    });
});

app.post('/api/task/create', (req, res) =>{
    mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
		if(err){
            console.log("error al conectar con la base datos");
            return res.status(500).json({
                error:true,
                mensaje:"Conexion no establecida con la base de datos"
            })
        }
        const task = new Task({
			name: req.body.name,
            priority: req.body.priority,
            expiration: new Date(req.body.expiration),
            email_user: req.body.email_user
		})
		task.save((err, result) => {
			if(err){
                console.log("Error al crear la tarea");
                return res.status(500).json({
					error:true,
                    mensaje:"Error al crear la tarea",
                    error:err
				})
            }
			return res.status(200).json({
				error:false,
				data: result
			})
		})

    });
});

app.post('/api/task/edit', (req, res) =>{
    mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
		if(err){
            console.log("error al conectar con la base datos");
            return res.status(500).json({
                error:true,
                mensaje:"Conexion no establecida con la base de datos"
            })
        }
        let emailUser = req.body.email;
        Task.updateOne({_id : req.body.id}, { $set: { name: req.body.name , priority: req.body.priority, expiration: req.body.expiration} }, (err, result) => {
			if(err){
                console.log("Error al editar la tarea");
                return res.status(500).json({
					error:true,
                    mensaje:"Error al editar la tarea",
                    error:err
				})
            }
			return res.status(200).json({
				error:false,
				data: result
			})
		});
    });
});

app.post('/api/task/delete', (req, res) =>{
    mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
		if(err){
            console.log("error al conectar con la base datos");
            return res.status(500).json({
                error:true,
                mensaje:"Conexion no establecida con la base de datos"
            })
        }
        Task.deleteOne({_id : req.body.id}, (err, result) => {
			if(err){
                console.log("Error al eliminar la tarea");
                return res.status(500).json({
					error:true,
                    mensaje:"Error al eliminar la tarea",
                    error:err
				})
            }
			return res.status(200).json({
				error:false,
				data: result
			})
		});
    });
});

app.use(express.static(__dirname + '/dist/evolutiontest'));
app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/evolutiontest/index.html'));
});
app.listen(3000);
console.log("server corriendo por el puerto 3000");
