export function getUser(idUser, callback) {
  fetch('/api/usuario/' + idUser)
    .then( res => res.json())
    .then( res => {
      callback(res);
    })
    .catch(err => {
      console.log(err)
    });
}

export function deleteGasto(idGasto, callback){
  fetch('/api/gastos-delete', {
    method: 'POST',
    body: JSON.stringify({
      gastoId: idGasto
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => {
      callback(res);
    })
}

export function updateGastos(idUser, callback){
  fetch('/api/gastos/' +idUser)
  .then(res => res.json())
  .then(res => {
    callback(res);
  });
}

export function newGasto(gasto, callback){
  fetch('/api/gastos', {
    method: 'POST',
    body: JSON.stringify({
      categoria: gasto.categoria,
      nombre: gasto.nombre,
      cantidad: gasto.cantidad,
      fecha: gasto.fecha,
      user_id: gasto.idUsuario
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(res => {
    callback(res);
  }) 
}