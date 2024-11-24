type PatientDetailItemProps = {
    label: string
    data: string
}
export default function PatientDetailItem({label, data} : PatientDetailItemProps) { // Toma label y data
  return ( // Para hacerlo reutilizable tiene que tomar el label y la data que tiene la información
    <p className="font-bold mb-3 text-gray-700 uppercase">{label}: {''}
        <span className="font-normal normal-case">{data}</span>
    </p>
  )
}
