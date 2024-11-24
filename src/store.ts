import { create } from 'zustand' // Importamos zustand con npm i zustand para usar esa dependencia y hacer lo mismo que hicimos con reducer. La forma en la que vamos a crear store es importando create
import { devtools, persist } from 'zustand/middleware' // React devtools es para ver el contenido y las funciones de nuestro store de zustand. persist nos va a permitir tener un estado persistente y podemos especificarle si queremos almacenar en sessionstorage o en localStorage.
import { v4 as uuidv4 } from 'uuid' // Instalamos la dependencia de npm i uuid, usamos la versión 4. Y también hay que instalar sus types: npm i --save-dev @types/uuid
import { DraftPatient, Patient } from './types'

// El store de Zustand es básicamente lo mismo que el recucer, nos permite manejar el state de manera global junto con sus métodos y funciones que lo modifican.

type PatientState = {
    patients: Patient[] // Le decimos que patiens van a ser de tipo Patient como arreglo porque van a ser múltiples pacientes
    activeId: Patient['id'] // Generamos un state nuevo que es el que va a tener el id que está activo
    addPatient: (data: DraftPatient) => void // Guardar un paciente, toma un paciente y void porque no retorna nada.
    deletePatient: (id: Patient['id']) => void // Eliminar un paciente, toma el id del paciente
    getPatientById: (id: Patient['id']) => void // Creamos una función que dispare, identifique o agregue en activeId que estamos presionando en un paciente para editarlo.
    updatePatient: (data: DraftPatient) => void // Actualizando el paciente cuando editemos esa información
}

const createPatient = (patient: DraftPatient) : Patient => { // Va a tomar un paciente de tipo DraftPatient y retorna un paciente
    return { ...patient, id: uuidv4() } // Tomamos una copia del paciente que es el que le estamos pasando como argumento y le agregamos el id. De esa forma nos retorna un paciente con la información del DraftPatient pero genera su id.
}

// Lo que vamos a agregar en el type PatientState debemos irlo reflejando acá dentro del store, y ya con esto es suficiente para tener un store.
export const usePatientStore = create<PatientState>()( // Aquí vamos a colocar tanto el state como las funciones que lo modifican. Le pasamos como generic nuestro type. Esta linea de usePatientStore ya hace el custom hook que hice en los proyectos pasados. No es necesario crear ese custom hook. Es en el store dond vamos a almacenar nuestros pacientes para tener un estado global y sobre todo un lugar centralizado para manejar nuestro state y ahí tenemos las funciones que escriben en el state, acá vamos a tener toda la lógica.
    devtools( // De esa forma ya podemos ver esas funciones y contenido de nuestro state de zustand. Instalamos redux devtools para agregarlo como extensión en Chrom y eso nos permite ver ese componente de redux para ver nuestrab información.
    persist( (set) => ({ // persist nos va a permitir tener un estado persistente y podemos especificarle si queremos almacenar en sessionstorage o en localStorage. 
        patients: [], // Tenemos nuestro state y la función es addPatient, set es para setear o agregar un valor y get para obtener un valor del state
        activeId: '', // Va a iniciar como un string vacío
        addPatient: (data) => { // addPatient toma data y como ya le colocamos ese DraftPatient en el type no hay que especificarle el tipo de dato que recibe acá.

            // En este punto ya guarda ese paciente con su id
            const newPatient = createPatient(data)
            set((state) => ({ // Este es como decir el return de los reducer, queremos escribir sobre patients. Con ese state recupera el estado que tenemos en patients: []
                patients: [...state.patients, newPatient] // Tomamos una copia del arreglo para no perder esos pacientes que ya estaban almacenados, y le pasamos el nuevo paciente con su id.
            }))
        },
        deletePatient: (id) => { // Eliminar paciente y toma un id para identificar que paciente es
            set((state) => ({ // Tomamos el state porque vamos a actualizar patients
                patients: state.patients.filter( // Nos traemos todos los pacientes excepto al que le estamos dando click en eliminar. Traete todos los pacientes que sean diferentes al que le estamos pasando como id.
                    patient => patient.id !== id)
            }))
        },
        getPatientById: (id) => { // Va a tomar un id. Eso lo que hace es obtener e identificar el id al que le estamos dando click en editar
            set(() => ({ // No necesitamos el state porque vamos a escribir directamente en el activeId, y le pasamos el id
                activeId: id
            }))
        },
        updatePatient: (data) => { // Actualizando el paciente cuando editemos esa información. Y toma los datos, por eso el data
            set((state) => ({ // Requiero el state anterior
                patients: state.patients.map( // Para comenzar a iterar en cada uno de ellos
                    patient => patient.id === state.activeId ? { id: state.activeId, ...data } : patient),
                activeId: '' // Osea que si es igual retornamos el id del que estamos actualizando junto con la información de lo que el usuario ingresó que sería tomar la copia de data
            })) // Si el patiend.id es igual al id que está activo, porque ese es el que estamos actualizando, si es así vamos a retornar un objeto y caso contrario vamos a retornar el paciente que está en el state, es decir, la información que teníamos para no perder los otros pacientes. Y una vez que hacemos esta actualización del paciente, regresamos ese activeId a un string vacío, osea a que ya no hay ninguno activo y ya no estamos editando.
        }
    }), { // Lo que coloquemos aquí van a ser las opciones de persist, y el default es localStorage por eso no se debe especificar.
        name: 'patient-storage' // Ese nombre es como se va a almacenar ya sea en localStorage o sessionStorage

        // En caso de que quisiéramos almacenarlo en sessionStorage, supongamos que el usuario cierra la sesión, es decir, cierra la ventana, entonces queremos que se elimine esa información. Eso sería sessionStorage.
        // storage: createJSONStorage(() => sessionStorage) y se importa ese createJSONStorage, de esa forma se haría.
    })
))