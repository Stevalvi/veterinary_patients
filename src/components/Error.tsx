export default function Error({children} : {children: React.ReactNode}) { // children es un prop propio de react 
    return (
      <p className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase text-sm">
          {children} 
      </p> 
    ) // Usamos {children} porque queremos pasarle todos los mensajes de error.
  }
  