
# Trabajo Práctico : API RESTful

## Autor

Luciano Molinas

#### Este proyecto incluye un grupo de APIs con las operaciones CRUD de productos, categorias y registro y login de usuarios.

## Esquema de Base de datos :

####  Categorias (collection categories)

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "Sin descripción" },
}, {
  versionKey: false
})

####  Productos (collection products)

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  description: { type: String, default: "Sin descripción" },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }
}, {
  versionKey: false
})

#### Usuarios (collection users)

const UserSchema = new mongoose.Schema({
  username: { type: String, default: "Nuevo usuario" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},
  { versionKey: false }
)


## Tecnologias utilizadas :

- Node.js
- Express.js
- Mongoose
- MongoDB 
- JWT 
- bcrypt
- Git



## Instalación :

En la carpeta del proyecto ejecutar :

npm install

## Ejecución :

En la carpeta del proyecto ejecutar :

- npm start 


## Endpoints :


##### Obtener productos

```sh
curl http://localhost:3000/products
```

##### Agregar producto

```sh
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{
  "name": "Par de medias 2",
  "price": 50,
  "stock": 0,
  "category": "698cfab5ffada466cac4c1b2",
  "description": "Medias de algodón unisex."
}'
```

##### Modificar producto
```sh
curl -X PATCH http://localhost:3000/products/695d9fa29f59ec384ab62f3e -H "Content-Type: application/json" -d '{
  "price": 49.99,
  "stock": 100
}'

```
##### Borrar producto
```sh
curl -X DELETE http://localhost:3000/products/695d9fa29f59ec384ab62f3e

```



##### Obtener categorias

```sh
curl http://localhost:3000/category
```

##### Agregar categoria

```sh
curl -X POST http://localhost:3000/category -H "Content-Type: application/json" -d '{
  "name": "tecnologia",
  "description": "elementos para equipar tu PC "
}'
```

##### Modificar categoria
```sh
curl -X PATCH http://localhost:3000/category/698cf3d73911f98bbb706650 -H "Content-Type: application/json" -d '{
  "description": "accesorios de tecnologia"
}'

```
##### Borrar categoria
```sh
curl -X DELETE http://localhost:3000/category/698ce813221cbb4e6ae66937

```


##### Registrar nuevo usuario 


```sh
curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{
  
  "email": "lucianomolinas55@gmail.com",
  "password": "newells", 
  "username" : "lucho"
  
}'
```

##### Login

```sh
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{
   
  "email":"lucianomolinas55@gmail.com",
  "password":"newells"
 
}'
```