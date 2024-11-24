export type Patient = {
    id: string
    name: string
    caretaker: string
    email: string
    date: Date
    symptoms: string
}

export type DraftPatient = Omit<Patient, 'id'> // Toma todo lo de Patient excepto el id