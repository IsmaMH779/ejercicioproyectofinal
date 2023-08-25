const express = require('express');
const cors = require('cors');

const multer = require('multer');
const path = require('path');

const fs = require('fs');

const { spawn } = require('child_process');

const app = express();

// Configuración de Multer para el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    // Generar un nombre único para el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});
const upload = multer({ storage });
// Habilitar CORS para todas las rutas
app.use(cors());






// Ruta para subir el archivo
app.post('/upload', upload.single('file'), (req, res) => {
  // Obtener el nombre del archivo subido
  const fileName = req.file.filename;
  console.log('Nombre del archivo:', fileName);
  res.send('Archivo subido correctamente.');
});
// Ruta para obtener la lista de archivos en el directorio "uploads"
app.get('/api/files', (req, res) => {
  // Agregar el encabezado Access-Control-Allow-Origin a la respuesta
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

  const directoryPath = path.join(__dirname, 'uploads');
  fs.readdir(directoryPath, (error, files) => {
    if (error) {
      console.error('Error al leer el directorio:', error);
      res.status(500).json({ error: 'Error al leer el directorio' });
    } else {
      res.json(files);
    }
  });
});

// Ruta para abrir un archivo desde el script de Python
app.get('/open-file/:filename', (req, res) => {
  const { filename } = req.params;

  // Ruta completa al script de Python

  const pythonScriptPath = path.join(__dirname, 'src/py/script2.py');


  // Ejecutar el script de Python y pasar el nombre del archivo como argumento
  // const pythonScript = spawn('C:/Users/PC/anaconda3/python', [pythonScriptPath, filename]);
  const pythonScript = spawn('python', [pythonScriptPath, filename]);
  console.log(pythonScript);
  // Manejar la salida del script de Python
  pythonScript.stdout.on('data', (data) => {
    console.log(`Salida del script de Python: ${data}`);
  });

  // Manejar los errores del script de Python
  pythonScript.stderr.on('data', (data) => {
    console.error(`Error en el script de Python: ${data}`);
  });

  // Finalizar la respuesta con un mensaje
  res.send('Archivo abierto desde el script de Python.');
});

// subir formulario
//prediccion

app.get('/predict/:embarazos/:glucosa/:presionsanguinea/:grosorpiel/:insulina/:bmi/:diabtespf/:edad', (req, res) => {
  const { embarazos } = req.params;
  const { glucosa } = req.params;
  const { presionsanguinea } = req.params;
  const { grosorpiel } = req.params;
  const { insulina } = req.params;
  const { bmi } = req.params;
  const { diabtespf } = req.params;
  const { edad } = req.params;

  // Ruta completa al script de Python

  const pythonScriptPath = path.join(__dirname, 'src/py/script3.py');


  // Ejecutar el script de Python y pasar el nombre del archivo como argumento
  // const pythonScript = spawn('C:/Users/PC/anaconda3/python', [pythonScriptPath, filename]);
  const pythonScript = spawn('python', [pythonScriptPath, embarazos, glucosa, presionsanguinea, grosorpiel, insulina, bmi, diabtespf, edad]);
  console.log(pythonScript);
  // Manejar la salida del script de Python
  pythonScript.stdout.on('data', (data) => {
    console.log(`Salida del script de Python: ${data}`);
  });

  // Manejar los errores del script de Python
  pythonScript.stderr.on('data', (data) => {
    console.error(`Error en el script de Python: ${data}`);
  });

  // Finalizar la respuesta con un mensaje
  res.send('Archivo abierto desde el script de Python.');
});









// Iniciar el servidor
app.listen(5000, () => {
  console.log('Servidor en ejecución en el puerto 5000');
});
