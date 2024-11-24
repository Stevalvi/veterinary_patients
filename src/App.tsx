import { ToastContainer } from 'react-toastify' // toastify va a estar en dos componentes, primero en el App.tsx, acá va a estar el componente registrado esperando a que ocurra el evento que lo mandemos a llamar, y el segundo va a estar ya en nuestro código, en las funciones donde queremos disparar los eventos de toastify. En este caso en PatientForm.tsx
import PatientForm from "./components/PatientForm"
import PatientsList from "./components/PatientsList"
import "react-toastify/dist/ReactToastify.css" // Debemos agregar la hoja de estilos de ese toast

// En este proyecto se usa zustand para reemplazar reducer y contextapi que es básicamente lo mismo. para manejar ese state de manera global.

function App() {

  return (
    <>
      <div className="container mx-auto mt-20">
          <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto">
            Seguimiento de pacientes {''}
            <span className="text-indigo-700">veterinaria</span>
          </h1>

          <div className="mt-12 md:flex">
              <PatientForm />
              <PatientsList />
          </div>
      </div>

      <ToastContainer /> 
    </>
  ) // Ese componente ToastContainer nos va a permitir mostrar esos toasts
}

export default App
