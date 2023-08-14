import mongodb from 'mongodb'
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import chalk from 'chalk'

const mongoCreds = {name: 'challengebudies9', pwd: '4otdmsd0viomP4Yq'}
const mongoUri = `mongodb://${mongoCreds.name}:${mongoCreds.pwd}@ac-66eekxs-shard-00-00.r4j0nxm.mongodb.net:27017,ac-66eekxs-shard-00-01.r4j0nxm.mongodb.net:27017,ac-66eekxs-shard-00-02.r4j0nxm.mongodb.net:27017/?ssl=true&replicaSet=atlas-yybkp8-shard-0&authSource=admin&retryWrites=true&w=majority`
const jwtKey = '3d352c5851a672635842330846d4186ccaa7ca62853546098ead67ced124350e'

const app = express()

const mongoClient = new mongodb.MongoClient(mongoUri)
const connectMongo = async () => {
    console.log('Connecting to MongoDB...'); // Add this line
    try {
      await mongoClient.connect();
      console.log('Connected to MongoDB successfully!'); // Add this line
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };
connectMongo()

const db = mongoClient.db('webware')
const productCollection = db.collection('products')
const userCollection = db.collection('users')

let products = []
let productsFeatured = []
let productsSpecial = []

const fetchProducts = async () => {
    try {
        products = await productCollection.find({}).toArray();
        productsFeatured = await productCollection.find({featured:true}).toArray();
        productsSpecial = await productCollection.find({special:'batik dyeing'}).toArray();
        console.log(chalk.green('\n|| FETCHED PRODUCTS @ ' + Date.now() + '\n' + products ))
    } catch (e) {
        console.log(chalk.red('\n|| ERROR CAUGHT WHILE FETCH PRODUCTS: \n' + e))
    }
}
function generateRandomString() {
    const characters = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let randomString = '';
    
    for (let i = 0; i < 64; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
    
    return randomString;
}  
function convertHyphenToSpace(str) {
  return str.replace(/-/g, ' ');
}
function formatString(str) {
    return str.replace(/\s+/g, '-').toLowerCase();
}
function toBool(str) {
    if(str=='yes') {
        return true
    } else {
        return false
    }
}
fetchProducts()

setInterval(fetchProducts, 5000)
app.use(cors())
app.use(express.json());

app.get('/api/products', (req, res) => {
  return res.send({
      products: products || [],
  });
});
app.get('/api/products/featured', (req, res) => {
  return res.send({
      products: productsFeatured || [],
  });
});
app.get('/api/products/special', (req, res) => {
  return res.send({
      products: productsSpecial || [],
  });
});
app.get('/api/product/:id/:special', (req,res) => {
  const product = products.find(item => req.params.id === item.id && convertHyphenToSpace(req.params.special) === item.special);
  if(product) {
    return res.send({product, code: 200})
  } else {
    return res.send({msg: 'Product Not Found', code: 404})
  }
})
app.get('/api/getToken/:token', async (req, res) => {
    let token = req.params.token;
  
    try {
      const decodedUser = jwt.verify(token, jwtKey);
      const user = await userCollection.findOne({ username: decodedUser.username, password: decodedUser.password });
  
      if (!user || user == undefined || user == null) {
        return res.send({
          msg: 'User Not Found',
          code: 404,
        });
      } else {
        return res.send({
          username: user.username,
          password: user.password,
          code: 200,
        });
      }
    } catch (error) {
      return res.send({
        msg: 'Invalid Token',
        code: 400,
      });
    }
  });
  

app.get('/api/getUser/:username/:password', async (req, res) => {
    const user = await userCollection.findOne({username: req.params.username, password: req.params.password})
    if(!user || user == undefined || user == null) {
        return res.send(
            {
                msg: 'User Not Found',
                code: 404,
            }
        )
    } else {
        return res.send(
            {
                token: jwt.sign(user, jwtKey),
                code: 200,
            }
        )
    }
})
app.post('/api/insertUserAdmin/:token', async (req, res) => {
    let token = req.params.token;
  
    if (token === 'null') {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVua25vd251c2VyIiwicGFzc3dvcmQiOiJ1bmtub3dudXNlciIsImlhdCI6MTY4NzE2MjUwMH0.dMK_qEFv0P6s5c-3qK_buwSmQPQnDuBfHOvQHOzNPq0';
    }
  
    try {
      const decodedUser = jwt.verify(token, jwtKey);
      const user = await userCollection.findOne({
        username: decodedUser.username,
        password: decodedUser.password,
      });
  
      if (user.power > 1) {
        const userToAdd = await userCollection.findOne({
          username: req.body.username,
        });
  
        if (!userToAdd) {
          const requestBodyWithId = {
            ...req.body,
            id: generateRandomString(),
          };
          await userCollection.insertOne(requestBodyWithId);
          return res.send({
            msg: 'User Added',
            code: 200,
          });
        } else {
          return res.send({
            msg: 'User Already Exists with this Username',
            code: 403,
          });
        }
      } else {
        return res.send({
          msg: 'Insufficient Power Level',
          code: 403,
        });
      }
    } catch (error) {
      return res.send({
        msg: 'Invalid Token',
        code: 400,
      });
    }
  });

  app.post('/api/insertProduct/:token', async (req, res) => {
    let token = req.params.token;
  
    if (token === 'null') {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVua25vd251c2VyIiwicGFzc3dvcmQiOiJ1bmtub3dudXNlciIsImlhdCI6MTY4NzE2MjUwMH0.dMK_qEFv0P6s5c-3qK_buwSmQPQnDuBfHOvQHOzNPq0';
    }
  
    try {
      const decodedUser = jwt.verify(token, jwtKey);
      const user = await userCollection.findOne({
        username: decodedUser.username,
        password: decodedUser.password,
      });
  
      if (user.power > 1) {
        const productToAdd = await productCollection.findOne({ id: formatString(req.body.id), special: (req.body.special.toLowerCase()) });
  
        if (!productToAdd) {
          const prodToAddWithId = {
            ...req.body,
            id: formatString(req.body.id),
            inStock: toBool(req.body.inStock),
            inSale: toBool(req.body.inSale),
            featured: toBool(req.body.featured),
            description: req.body.description.toLowerCase(),
            price: Number(req.body.price),
            discountedPrice: Number(req.body.discountedPrice),
          };
          await productCollection.insertOne(prodToAddWithId);
          return res.send({
            msg: 'Product Added',
            code: 200,
          });
        } else {
          return res.send({
            msg: 'Product already exists with this ID',
            code: 403,
          });
        }
      } else {
        return res.send({
          msg: 'Insufficient Power Level',
          code: 403,
        });
      }
    } catch (error) {
      return res.send({
        msg: 'Invalid Token',
        code: 400,
      });
    }
  });
app.listen(8080, () => {
    console.log('Server listening on 8080!')
})