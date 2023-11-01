import React, { useRef, useState } from "react";
import styled from "styled-components";
import IClient from "./IClient";
import Button from "../../components/Button";
import { editClient, createClient } from "../../services/clients";
import { equalObjects, isEmptyObject } from "../../utils/tools";
import { useClients } from "../../contexts/ClientsContext";
import Input from "../../components/Input";
import ErrorableInput from "../../components/ErrorableInput";

interface ClientFormProps {
  onClose: () => void;
  id?: string;
}
type MissingFields = {
  name?: boolean;
  lastName?: boolean;
  age?: boolean;
};

const EditClient: React.FC<ClientFormProps> = ({ onClose, id }) => {
  const { clients = [], setClients } = useClients();
  const isEditMode = !!id;
  const currentClient = clients
    ? clients.find((client) => client._id === id)
    : ({} as IClient);
  const [missingFields, setMissingFields] = useState<MissingFields>({
    name: false,
    lastName: false,
    age: false,
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = () => {
    if (!formRef.current) return;
    if (!isEmptyObject) {
      if (equalObjects(currentClient, formRef.current)) onClose();
    }
    const rawFormData: Record<string, any> = {};

    if (formRef.current) {
      new FormData(formRef.current).forEach((value, key) => {
        rawFormData[key] = value;
      });
    }

    const formData: Partial<IClient> = {
      name: rawFormData.name || "",
      lastName: rawFormData.lastName || "",
      middleName: rawFormData.middleName,
      secondLastName: rawFormData.secondLastName,
      age: Number(rawFormData.age) || 0,
      objective: rawFormData.objective,
      weight: Number(rawFormData.weight) || 0,
      height: Number(rawFormData.height) || 0,
    };

    const newMissingFields: MissingFields = {};

    ["name", "lastName", "age"].forEach((key) => {
      if (!formData[key as keyof IClient]) {
        newMissingFields[key as keyof MissingFields] = true;
      }
    });

    setMissingFields(newMissingFields);

    if (Object.keys(newMissingFields).length > 0) {
      return;
    }
    const updatedClients = clients
      ? clients.map((client) => (client._id === id ? formData : client))
      : [formData as IClient];

    setClients(updatedClients);

    if (isEditMode) {
      editClient({ ...formData, _id: id });
      onClose();
      return;
    }
    createClient(formData);
    onClose();
  };

  /* eslint-disable no-use-before-define*/
  return (
    <>
      <StyledForm ref={formRef}>
        <ErrorableInput
          name="name"
          defaultValue={currentClient?.name}
          placeholder="Nombre*"
          required={true}
          errorMessage="Obligatorio!"
          missingField={!!missingFields.name}
        />
        <ErrorableInput
          name="lastName"
          defaultValue={currentClient?.lastName}
          placeholder="Apellido Paterno*"
          required={true}
          errorMessage="Obligatorio!"
          missingField={!!missingFields.lastName}
        />
        <Input
          name="middleName"
          defaultValue={currentClient?.middleName}
          placeholder="Segundo Nombre"
        />
        <Input
          name="secondLastName"
          defaultValue={currentClient?.secondLastName}
          placeholder="Apellido Materno"
        />
        <ErrorableInput
          name="age"
          type="number"
          defaultValue={currentClient?.age}
          placeholder="Edad*"
          errorMessage="Obligatorio!"
          required={true}
          missingField={!!missingFields.age}
        />
        <Input
          name="objective"
          defaultValue={currentClient?.objective}
          placeholder="Objetivo"
        />
        <Input
          name="weight"
          type="number"
          step="0.01"
          defaultValue={currentClient?.weight}
          placeholder="Peso (kg)"
        />
        <Input
          name="height"
          type="number"
          defaultValue={currentClient?.height}
          placeholder="Altura (cm)"
        />
      </StyledForm>
      <div style={{ display: "flex" }}>
        <Button onClick={handleSubmit} label="Guardar" />
        <StyledSpan>Campos Obligatorios (*)</StyledSpan>
        <Button
          onClick={onClose}
          label="Cancelar"
          style={{ marginLeft: "auto", marginRight: "0" }}
        />
      </div>
    </>
  );
};

const StyledForm = styled.form`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // single column
  }
`;

const StyledSpan = styled.span`
  font-size: 0.8em;
  position: relative;
  top: 20px;
  right: -10px;
  text-style: italic;
  @media (max-width: 768px) {
    font-size: 0.6em;
  }
`;

export default EditClient;
