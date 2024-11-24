import { usePatientStore } from "../store"
import PatientDetails from "./PatientDetails"

// Este componente va a mostrar el listado de pacientes

export default function PatientsList() {

    // Acá es donde instanciamos patients
    const patients = usePatientStore((state) => state.patients) // Accedemos al state y extraemos los pacientes, retornamos lo que necesitamos que son los pacientes.
    
    return ( // Ese md:w-1/2 es para agregarle la mitad de las columnas a ese div, la otra mitad la tenemos en PatientForm.tsx, en un tamaño grande toman 3/5, ese md:h-screen para que tome toda la altura disponible y overflow-y-scroll es para que cuándo demos scroll en los pacientes no se pierda ese formulario
        <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
            {patients.length ? ( // Si hay pacientes entonces los mostramos. Usamos el fragment <> </> porque vamos a retornar múltiples elementos.
                <>
                    <h2 className="font-black text-3xl text-center">Listado de pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        administra tus {''}
                        <span className="text-indigo-600 font-bold">pacientes y citas</span>
                    </p>
                    {patients.map( patient => ( // Iteramos sobre cada paciente para ir iterando y mostrando ese componente de PatientDetails. Como estamos iterando con map, le pasamod el id de cada paciente y luego el paciente completo.
                        <PatientDetails
                            key={patient.id}
                            patient={patient}
                        />
                    ))}
                </>
            ) : ( // Caso contrario, está vacío ejecutamos este código
                <>
                    <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Comienza agregando pacientes {''}
                        <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
                    </p>
                </>
            )}
        </div>
    )
}
