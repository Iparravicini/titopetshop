export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
      validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
      input.parentElement.classList.remove("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML = ""
    } else {
      input.parentElement.classList.add("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tipoDeErrores = {
  "valueMissing",
  "typeMisMatch",
  "patternMisMatch",
  "customError",
};

const mensajesDeError = {
  nombre: {
    valueMissing: "El nombre no puede estar vacío";
  },
  email: {
    valueMissing: "Este campo no puede estar vacío";
    typeMisMatch: "El correo no es válido";
  },
  password: {
    valueMissing: "La contraseña no puede estar vacío";
    patternMisMatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una mayúscula, un número y no puede contener caracteres especiales.";   
  },
  nacimiento: {
    valueMissing: "La fecha de nacimiento no puede estar vacía";
    customError: "Debes tener al menos 18 años de edad";
  },
  numero: {
    valueMissing: "Este campo no puede estar vacío";
    patternMisMatch: "El formato requerido es XXXX-XXXXXX";
  },
  direccion: {
    valueMissing: "Este campo no puede estar vacío";
    patternMisMatch: "La dirección debe tener de 10 a 40 caracteres";
  },
  ciudad: {
    valueMissing: "Este campo no puede estar vacío";
    patternMisMatch: "La ciudad debe tener de 4 a 40 caracteres";
  },
  estado: {
    valueMissing: "Este campo no puede estar vacío";
    patternMisMatch: "El estado debe tener de 4 a 40 caracteres";
  },
};


const validadores = {
    nacimiento: (input) => validarNacimiento(input), 
};

function mostrarMensajeDeError(tipoDeInput, input){
  let mensaje = ""
  tipoDeErrores.forEach( error => {
    if(input.validity[error]){
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  }) 
  return mensaje
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
