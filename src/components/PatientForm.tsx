import { useEffect } from 'react'
import { useForm } from 'react-hook-form' // Es una librería para formularios cuándo son complejos, agrega validaciones, entre otras cosas. npm i react-hook-form se debe instalar.
import { toast } from 'react-toastify' // Se instala con npm i react-toastify y permite crear mensajes de alerta.  // toastify va a estar en dos componentes, primero en el App.tsx, allá va a estar el componente registrado esperando a que ocurra el evento que lo mandemos a llamar, y el segundo va a estar ya en nuestro código, en las funciones donde queremos disparar los eventos de toastify. En este caso en PatientForm.tsx
import Error from './Error'
import type { DraftPatient } from '../types'
import { usePatientStore } from '../store' // Importamos el custom hook de zustand que sería el store para poder utilizar esas funciones que creamos allá.

// Este componente va a ser el que muestra ese formulario

export default function PatientForm() {

    // De esta forma extraemos esas funciones del store para poder conectarlas con este PatientForm.tsx. De esta forma ya le pasamos nuestro paciente hacia nuestro store
    const addPatient = usePatientStore(state => state.addPatient)
    const activeId = usePatientStore(state => state.activeId) // Extraemos ese activeId para que cuándo el usuario presione en editar se llene ese formulario con los datos del paciente.
    const patients = usePatientStore(state => state.patients) // Requerimos la información de los pacientes, para que cuándo el usuario presione en editar se llene ese formulario con los datos del paciente. Por eso los extraemos.
    const updatePatient = usePatientStore(state => state.updatePatient)// Actualizando el paciente cuando editemos esa información. Y toma los datos, por eso el data

    const { register, handleSubmit, setValue , formState: { errors }, reset } = useForm<DraftPatient>() // Register permite registrar un input o un select y aplicar las reglas de validación de React-hook-form. El formState es el estado en el que se encuentra nuestro formulario y para recuperar los errores le colocamos {errors} para extraerlos y mostrarlos cuando haga esa validación. En los otros proyectos se utilizaba el state para recuperar esos datos, en este caso, con ese register lo hacemos. Cuando se genere esa función de registerPatient, para que no nos salga error, también debemos asignarle el DraftPatient a este useForm. Ese reset lo que hace es reiniciar el formulario cuando demos click en guardar paciente. setValue va a permitir regresar o va a permitir setear un valor por default al formulario.

    useEffect(() => { // useEffect va a revisar cuando activeId va a tener algo y ejecuta este código
        if(activeId) { // Si tiene algo
            const activePatient = patients.filter(patient => patient.id === activeId)[0] // Vamos a filtrar sobre cada paciente, y si el patient.id es igual al activeId, es decir, al id del paciente que estamos dando click en editar, entonces nos traemos esa información y la reflejamos en el formulario. Y eso retorna un arreglo pero como yo lo quiero como objeto le coloco la posición 0
            // Para setear esta información en mi formulario, para colocarla de mi state hacia el formulario de nuevo lo hago con setValue
            setValue('name', activePatient.name)
            setValue('caretaker', activePatient.caretaker)
            setValue('date', activePatient.date)
            setValue('email', activePatient.email)
            setValue('symptoms', activePatient.symptoms)
        }
    }, [activeId])

    const registerPatient = (data: DraftPatient) => { // De acá recuperamos esos valores que el usuario ingresó en el formulario, va a ser esa data de tipo DraftPatient, es decir, todo el cuerpo de un paciente a excepción del id.
        if(activeId) { // Si tenemos algo en ese activeId, es decir, algo en edición. Vamos a actualizar
            updatePatient(data) // Le pasamos data
            toast('Paciente actualizado correctamente', {
                type: 'success'
            }) // Ese toast manda la alerta cuando actualicemos el paciente y muestra ese mensaje con una alerta de tipo success, osea verde.
        } else { // Caso contrario creamos un paciente nuevo
            addPatient(data) // Disparamos esa función del state de patients y le pasamos los datos.
            toast.success('Paciente registrado correctamente') // Cuando creemos o registremos el nuevo paciente ese toast muestra esa alerta de tipo success, osea verde, con ese mensaje.
        }
        reset() // Reiniciamos el formulario en ambos casos, ya sea para registrar cuando demos en Guardar paciente o en editar cuando demos Guardar Cambios.
    }


  
    return (
      <div className="md:w-1/2 lg:w-2/5 mx-5">
          <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>
  
          <p className="text-lg mt-5 text-center mb-10">
              Añade pacientes y {''}
              <span className="text-indigo-600 font-bold">administralos</span>
          </p>

          <form 
              className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
              noValidate
              onSubmit={handleSubmit(registerPatient)} // Tenemos el evento, la función de handleSubmit que extraemos de react-hook-form y la función que creamos, es la forma que conectamos el formulario con react-hook-form
          >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente 
                    </label>
                    <input  
                        id="name"
                        className="w-full p-3  border border-gray-100"  
                        type="text" 
                        placeholder="Nombre del Paciente" 
                        {...register('name', {
                            required: 'El Nombre del paciente es obligatorio'
                        })} // Queremos que este formulario lo procese react-hook-form, tomamos una copia de esa función de register y pasarla via props hacia este input, ese nombre es el que vamos a utilizar para recuperar los datos que el usuario ingresó en este formulario, ese nombre tiene que ser único. Y en esas llaves u opciones va a estar la validación, en este caso que es required osea requerido.
                        
                        // Abajo mostramos ese componente de error, cuando haya un error errors.name && entonces mostramos ese componente con el mensaje de error que se presenta, en este caso es el name, por eso a ese register del input lo nombramos name. La forma en como lo nombremos en ese register es la forma en como lo recuperamos en errors. de esa forma no se mezclan los errores, por eso ese name debe ser único.
                    />

                    {errors.name && (
                        <Error>{errors.name?.message}</Error>
                    )}
                    
                </div>
  
                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                        Propietario 
                    </label>
                    <input  
                        id="caretaker"
                        className="w-full p-3  border border-gray-100"  
                        type="text" 
                        placeholder="Nombre del Propietario" 
                        {...register('caretaker', {
                                required: 'El Propietario es obligatorio'
                        })}
                        />

                        {errors.caretaker && (
                            <Error>{errors.caretaker?.message}</Error>
                        )}
                </div>
  
              <div className="mb-5">
                <label htmlFor="email" className="text-sm uppercase font-bold">
                    Email 
                </label>
                <input  
                    id="email"
                    className="w-full p-3  border border-gray-100"  
                    type="email" 
                    placeholder="Email de Registro" 
                    {...register("email", {
                    required: "El Email es Obligatorio",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email No Válido'
                        }
                    })} // Ese pattern con ese value valida que sea un email válido. Se le conoce como expresión regular.
                />

                {errors.email && (
                    <Error>{errors.email?.message}</Error>
                )}
              </div>
  
              <div className="mb-5">
                  <label htmlFor="date" className="text-sm uppercase font-bold">
                      Fecha alta 
                  </label>
                  <input  
                      id="date"
                      className="w-full p-3  border border-gray-100"  
                      type="date" 
                      {...register('date', {
                                required: 'La fecha de alta es obligatoria'
                        })}
                    />

                    {errors.date && (
                        <Error>{errors.date?.message}</Error>
                    )}
              </div>
              
              <div className="mb-5">
                  <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                    Síntomas 
                  </label>
                  <textarea  
                      id="symptoms"
                      className="w-full p-3  border border-gray-100"  
                      placeholder="Síntomas del paciente" 
                      {...register('symptoms', {
                        required: 'Los síntomas son obligatorios'
                        })}
                    />

                    {errors.symptoms && (
                        <Error>{errors.symptoms?.message}</Error>
                    )}
              </div>
  
              <input
                  type="submit"
                  className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                  value='Guardar paciente'
              />
          </form> 
      </div>
    )
  }