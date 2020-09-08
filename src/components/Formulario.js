import React, { useState } from "react";
import Error from "./Error";
import shortid from "shortid";
import PropTypes from "prop-types";

const Formulario = ({ guardarGasto, guardarCrearGasto }) => {
  const [nombre, guardarNombre] = useState("");
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);
  const agregarGasto = (e) => {
    e.preventDefault();
    if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === "") {
      guardarError(true);
    } else {
      guardarError(false);
    }
    const gasto = {
      nombre,
      cantidad,
      id: shortid.generate(),
    };
    guardarGasto(gasto);
    guardarCrearGasto(true);
    guardarNombre("");
    guardarCantidad(0);
  };
  return (
    <form onSubmit={agregarGasto}>
      <h2>Agrega gastos aquí</h2>
      {error ? (
        <Error mensaje="Ambos campos son obligatorios, o Presupuesto Incorrecto" />
      ) : null}
      <div className="campo">
        <label>Nombre gasto</label>
        <input
          type="text"
          className="u-full-width"
          placeholder="Ej. Transporte"
          value={nombre}
          onChange={(e) => guardarNombre(e.target.value)}
        />
      </div>
      <div className="campo">
        <label>Cantidad Gasto</label>
        <input
          type="number"
          className="u-full-width"
          placeholder="Ej. 300"
          value={cantidad}
          onChange={(e) => guardarCantidad(parseInt(e.target.value, 10))}
        />
      </div>

      <input
        type="submit"
        className="button-primary u-full-width"
        value="Agregar Gasto"
      />
    </form>
  );
};

Formulario.prototype = {
  guardarGasto: PropTypes.func.isRequired,
  guardarCrearGasto: PropTypes.func.isRequired,
};

export default Formulario;
