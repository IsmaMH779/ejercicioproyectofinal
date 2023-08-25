const express = require('express');
const multer = require('multer');
const path = require('path');

const fs = require('fs');




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


// Iniciar el servidor
app.listen(5000, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});
