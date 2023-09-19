import { useEffect, useState } from "react";
import { Error } from "./Error";

export const Formulario = ({
  pacientes,
  setPacientes,
  paciente,
  setPaciente
}) => {
  const [nombreMascota, setNombreMascota] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [alta, setAlta] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombreMascota(paciente?.nombreMascota);
      setPropietario(paciente?.propietario);
      setEmail(paciente?.email);
      setAlta(paciente?.alta);
      setSintomas(paciente?.sintomas);
    }
  }, [paciente]);

  const handleChange = (event) => {
    switch (event.target.id) {
      case "nombreMascota":
        setNombreMascota(event.target.value);
        break;
      case "propietario":
        setPropietario(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "alta":
        setAlta(event.target.value);
        break;
      case "sintomas":
        setSintomas(event.target.value);
        break;

      default:
        break;
    }
  };
  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return fecha + random;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombreMascota, propietario, email, alta, sintomas].includes("")) {
      console.log("Al menos un campo esta vacio");
      setError(true);
      return;
    }
    const objetoPaciente = {
      nombreMascota,
      propietario,
      email,
      alta,
      sintomas
    };
    if (paciente.id) {
      //? actualizar registro
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      );
      setPacientes(pacientesActualizados);
      setPaciente({});
    } else {
      //? nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    //? Reseteo del formulario ↓
    setNombreMascota("");
    setPropietario("");
    setEmail("");
    setAlta("");
    setSintomas("");
    setError(false);
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">
        Seguimientos pacientes
      </h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade pacientes y{" "}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {error && <Error msj={"Todos los campos son obligatorios!"} />}
        <div className="mb-5">
          <label
            htmlFor="nombreMascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre mascota
          </label>
          <input
            id="nombreMascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
            value={nombreMascota}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre del propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
            value={propietario}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Alta
          </label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
            value={alta}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Describe los sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
            value={sintomas}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={paciente.id ? "Editar paciente" : "Agregar paciente"}
        />
      </form>
    </div>
  );
};
