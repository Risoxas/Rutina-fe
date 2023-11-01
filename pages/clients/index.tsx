import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextPageWithLayout } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { search } from "../../services/clients";
import List from "../../components/List";
import EditClient from "./EditClient";
import { useClients } from "../../contexts/ClientsContext";

const AllClients: NextPageWithLayout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchInput = useRef<HTMLInputElement>(null);

  const { clients, setClients } = useClients();

  const handleSearch = async () => {
    setIsLoading(true);
    const searchTerm = searchInput.current?.value || "";
    if (router.query.name === searchTerm) return;
    const query: any = {};
    if (searchTerm.trim()) query.name = searchTerm;
    try {
      const response = await search(query);
      setClients(response);

      router.push({
        pathname: router.pathname,
        query: query,
      });
    } catch (error) {
      toast.error("Error al buscar clientes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) handleSearch();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateToClientPage = (id: string) => {
    router.push(`/clients/${id}`);
  };

  /* eslint-disable no-use-before-define*/
  return (
    <div>
      <StyledHeader>
        <h1>Clientes</h1>
      </StyledHeader>
      <List
        stakeholders={clients}
        handleSearch={handleSearch}
        navigate={navigateToClientPage}
        headers={{
          name: "Nombre",
          weight: "Peso",
          height: "Altura",
          weekDay: "Semana",
          objective: "Objetivo",
          lastUpdate: "Última actualización",
        }}
        loading={isLoading}
        ModalContentComponent={EditClient}
        modelType="client"
        hidableHeaders={["weekDay", "height", "lastUpdate"]}
      />
    </div>
  );
};

const StyledHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
`;

AllClients.Layout = Layout;
export default AllClients;
