//index.js
// endpoint /api/act
// endpoint /api/act/:id"  http://localhost:3000/api/act/1

const express = require("express");
const app = express();
const host = "localhost";
const port = 3000;
app.set("port", port);
app.use(express.urlencoded({ extended: false }));
// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
const actDeportivas = [
  {
    id: 1,
    nombre: "Gabriel",
    apellidos: "Santana Medina",
    actividad: "kendo",
  },
  {
    id: 2,
    nombre: "Francisco",
    apellidos: "Dav",
    actividad: "senderismo",
  },
  {
    id: 3,
    nombre: "Pre",
    apellidos: "Jimenez Santana",
    actividad: "Running",
  },
  {
    id: 4,
    nombre: "Yudi",
    apellidos: "Melián Sánchez",
    actividad: "Yoga",
  },
];
app.use(express.json());

//Petición a la raíz del endpoint
app.get("/", (req, res) => {
  res.send("Respuesta desde servidor al acceso al endpoint /");
});
//Listado de todos los elementos del recurso solicitados a la API
app.get("/api/act", (req, res) => {
  res.send(actDeportivas);
});
//Listado de un elemento individual
app.get("/api/act/:id", (req, res) => {
  let idAct = parseInt(req.params.id);
  const laActividad = actDeportivas.find((act) => {
    return act.id === idAct;
  });
  if (!laActividad) {
    res.status(404);
    res.send("No hemos encontrado la actividad deportiva con ese id");
  } else {
    res.send(laActividad);
  }
});
//Creación de un usuario nuevo
app.post("/api/act/", (req, res) => {
  const nuevaAct = {
    id: actDeportivas.length + 1,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    actividad: req.body.actividad,
  };
  actDeportivas.push(nuevaAct);
  res.status(200).send(actDeportivas);
});

app.put("/api/act/:id", (req, res) => {
  let idAct = parseInt(req.params.id);
  const laActividad = actDeportivas.find((act) => {
    return act.id === idAct;
  });
  // No existe?
  if (!laActividad) {
    res.status(404).send("Id de actividad no encontrado");
    return;
  } else {
    laActividad.nombre = req.body.nombre;
    laActividad.apellidos = req.body.apellidos;
    laActividad.actividad = req.body.actividad;
    // Devolver a cliente actividad actualizada
    res.status(200).send(laActividad);
  }
});
app.delete("/api/act/:id", (req, res) => {
  let idAct = parseInt(req.params.id);
  const laActividad = actDeportivas.find((act) => {
    return act.id === idAct;
  });
  // Si no existe devolver 404
  if (!laActividad) {
    res.status(404).send("No hemos encontrado una actividad con esa id");
    return;
  }
  const posicion = actDeportivas.indexOf(laActividad);
  actDeportivas.splice(posicion, 1);
  res.status(200).send("Curso eliminado");
});

/* app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
}); */
