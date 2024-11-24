import { toast } from 'react-toastify'
import { Patient } from "../types"
import PatientDetailItem from "./PatientDetailItem"
import { usePatientStore } from "../store"

type PatientDetailsProps = {
    patient: Patient
}

// Este componente va a contener la información de cada paciente para mostrarlos.

export default function PatientDetails({patient} : PatientDetailsProps) {

    const deletePatient = usePatientStore((state) => state.deletePatient) // Extraemos la función de deletePatient
    const getPatientById = usePatientStore((state) => state.getPatientById) // Extraemos esa función. Eso lo que hace es obtener e identificar el id al que le estamos dando click en editar

    // Eliminamos el paciente
    const handleClick = () => {
        deletePatient(patient.id) // Le pasamos el id del paciente a la función del state
        toast('Paciente eliminado', { // Enviamos un mensaje cuándo se elimina el paciente
            type: 'error' // Caso contrario mostramos ese toast de tipo error que es en color rojo.
        })
    }
        
    return ( // Usamos ese componente PatientDetailItem para hacerlo reutilizable y más dinámico
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PatientDetailItem label="ID" data={patient.id} />
            <PatientDetailItem label="Nombre" data={patient.name} />
            <PatientDetailItem label="Propietario" data={patient.caretaker} />
            <PatientDetailItem label="Email" data={patient.email} />
            <PatientDetailItem label="Fecha alta" data={patient.date.toString()} />
            <PatientDetailItem label="Síntomas" data={patient.symptoms} />

            <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                    onClick={() => getPatientById(patient.id)} // Toma un id y esa función es para editar el paciente. Eso lo que hace es obtener e identificar el id al que le estamos dando click en editar
                >Editar</button>

                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                    onClick={handleClick}
                >Eliminar</button>
            </div>
        </div>
    )
}
