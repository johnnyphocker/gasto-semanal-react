import React, { Component } from 'react';
import './css/App.css';

import Header from './componentes/Header';
import FormularioGasto from './componentes/Formulario';
import Listado from './componentes/Listado';
import ControlPresupuesto from './componentes/ControlPresupuesto';

import {validarPresupuesto} from './helper';

class App extends Component {

  state = {
    presupuesto: '',
    restante: '',
    gastos: {}
  }

  componentDidMount() {
    this.obtenerPresupuesto();
  }

  obtenerPresupuesto = () => {
    let presupuesto = prompt('¿Cuál es el presupuesto');
    let resultado = validarPresupuesto(presupuesto);
    if(resultado) {
      this.setState({presupuesto: presupuesto, restante: presupuesto});
    } else {
      this.obtenerPresupuesto();
    }
    
  }

  agregarGasto = gasto => {
    const gastos = {...this.state.gastos};
    gastos[`gasto${Date.now()}`] = gasto;

    this.restarPresupuesto(gasto.cantidadGasto);

    this.setState({
      gastos
    })
  }

  restarPresupuesto = cantidad => {

    let restar = Number(cantidad);
    let restante = this.state.restante;
    restante -= restar;

    this.setState({restante});

  }

  render() {
    return (
      <div className="App container">

        <Header
          titulo='JP'
        />

        <div className="contenido-principal contenido">
          <div className="row">
            <div className="one-half column">
              <FormularioGasto
                agregarGasto={this.agregarGasto}
              />
            </div>
            <div className="one-half column">
              <Listado
                gastos={this.state.gastos}
              />
              <ControlPresupuesto presupuesto={this.state.presupuesto} restante={this.state.restante} />
            </div>
          </div>
        </div>

      </div>

    );
  }
}

export default App;
