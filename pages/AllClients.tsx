import { useState, useEffect, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextPageWithLayout } from "next";
import { useRouter } from "next/router";
import {Layout} from "../components/Layout";
import Loading from "../components/Loading";

type Trainee = {
  id: string;
  name: string;
  week: number;
  objective: string;
  lastUpdate: Date;
  creationDate: Date;
};

const AllClients: NextPageWithLayout = () => {
  const router = useRouter();
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handleSearch();
  });

  const handleSearch = async () => {
    setIsLoading(true);
    const searchTerm = searchInput.current?.value || "";
    if (router.query.name === searchTerm) return;

    try {
      const response = await axiosInstance.get<Trainee[]>("/clients", {
        params: { name: searchTerm },
      });
      setTrainees(response.data);

      router.push({
        pathname: router.pathname,
        query: { name: searchTerm },
      });
    } catch (error) {
      toast.error("Error al buscar clientes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const navigateToClientPage = (id: string) => {
    router.push(`/client/${id}`);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Busqueda por nombre"
          ref={searchInput}
          onKeyDown={handleKey}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Objetivo</th>
            <th>Semana de entrenamiento</th>
            <th>Miembro desde</th>
            <th>Última Actualización</th>
          </tr>
        </thead>
        {isLoading ? (
          <Loading />
        ) : (
          <tbody>
            {trainees.map((trainee) => (
              <tr
                key={trainee.id}
                onClick={() => navigateToClientPage(trainee.id)}
              >
                <td>{trainee.name}</td>
                <td>{trainee.objective}</td>
                <td>{trainee.week}</td>
                <td>{trainee.creationDate.toISOString()}</td>
                <td>{trainee.lastUpdate.toISOString()}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  );
};

AllClients.Layout = Layout;
export default AllClients;
