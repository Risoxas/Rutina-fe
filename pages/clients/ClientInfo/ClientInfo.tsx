import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { getClientById } from "../../../services/clients";
import { formatName } from "../../../utils/tools";
import Button from "../../../components/Button";
import Loading from "../../../public/icons/Loading";
import { useUser } from "../../../contexts/UserContext";
import Input from "../../../components/Input";
import media from "../../../utils/media";
import { v4 as uuidv4 } from "uuid";

type RoutineMissingFields = {
  routineWeek?: boolean;
  exerciseName?: boolean;
  exerciseRepetitionsMin?: boolean;
  exerciseRepetitionsMax?: boolean;
};

type Routine = {
  routineWeek: number;
  series: Array<{
    id: string;
    exercises: Array<{
      id: string;
      name: string;
      minReps: number;
      maxReps: number;
      bySide: boolean;
      video: string;
      update: boolean;
    }>;
  }>;
  notes: string;
  date: Date;
};

const ClientInfo: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [client, setClient] = useState<any>(null);
  // const [editableRow, setEditableRow] = useState<boolean>(false);
  const [newRoutine, setNewRoutine] = useState<any>(false);
  const [minReps, setMinReps] = useState<number>(1);
  const [maxReps, setMaxReps] = useState<number>(2);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [series, setSeries] = useState([
    {
      id: uuidv4(),
      exercises: [
        {
          id: uuidv4(),
          name: "",
          video: "",
          minReps: 0,
          maxReps: 0,
          bySide: false,
        },
      ],
    },
  ]);
  const [routineMissingFields, setRoutineMissingFields] =
    useState<RoutineMissingFields>({
      routineWeek: false,
      exerciseName: false,
      exerciseRepetitionsMin: false,
      exerciseRepetitionsMax: false,
    });

  const generalInfoFormRef = useRef<HTMLFormElement | null>(null);
  const routinesFormRef = useRef<HTMLFormElement | null>(null);
  const exerciseFormRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    const fetchClient = async () => {
      try {
        const { data } = await getClientById(id as string);
        const today = new Date();
        data.routines = Array(7)
          .fill(null)
          .map((routine, idx) => {
            const routineDate = new Date(today);
            today.setDate(today.getDate() - 1);
            return {
              routineWeek: idx + 1,
              series: [
                {
                  exercises: [
                    {
                      name: "pulldonw",
                      minReps: 10,
                      maxReps: 12,
                      bySide: false,
                      video: "unPinshiVideoCuleroDeYoutube",
                      update: false,
                    },
                    {
                      name: "nalgadon",
                      minReps: 10,
                      maxReps: 12,
                      bySide: false,
                      video: "unPinshiVideoCuleroDeYoutube",
                      update: false,
                    },
                    {
                      name: "puro bicep alv con perra mancuerna chingona",
                      minReps: 10,
                      maxReps: 12,
                      bySide: false,
                      video: "unPinshiVideoCuleroDeYoutube",
                      update: false,
                    },
                  ],
                },
                {
                  exercises: [
                    {
                      name: "pulldonw",
                      minReps: 10,
                      maxReps: 12,
                      bySide: false,
                      video: "unPinshiVideoCuleroDeYoutube",
                      update: false,
                    },
                    {
                      name: "nalgadon",
                      minReps: 10,
                      maxReps: 12,
                      bySide: false,
                      video: "unPinshiVideoCuleroDeYoutube",
                      update: false,
                    },
                    {
                      name: "puro bicep alv con perra mancuerna chingona",
                      minReps: 10,
                      maxReps: 12,
                      bySide: false,
                      video: "unPinshiVideoCuleroDeYoutube",
                      update: false,
                    },
                  ],
                },
                {
                  exercises: [
                    {
                      name: "pulldonw",
                      minReps: 10,
                      maxReps: 12,
                      bySide: false,
                      video: "unPinshiVideoCuleroDeYoutube",
                      update: false,
                    },
                    {
                      name: "nalgadon",
                      minReps: 10,
                      maxReps: 12,
                      bySide: false,
                      video: "unPinshiVideoCuleroDeYoutube",
                      update: false,
                    },
                    {
                      name: "puro bicep alv con perra mancuerna chingona",
                      minReps: 10,
                      maxReps: 12,
                      bySide: false,
                      video: "unPinshiVideoCuleroDeYoutube",
                      update: false,
                    },
                  ],
                },
              ],
              notes:
                "UNas pinches notas bien perronas y este perro texto puede ser que si este bien pinche largo alv por eso escribo tanto",
              date: routineDate,
            };
          });
        setClient(data);
      } catch (error) {
        toast.error("Error al buscar cliente");
      } finally {
        setIsLoading(false);
      }
    };

    if (isMounted) fetchClient();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateClient = () => {
    console.log("update client", client);
  };

  // const toggleEdit = (index: number) => {
  //   if (editableRow === index) {
  //     setEditableRow(null);
  //   } else {
  //     setEditableRow(index);
  //   }
  // };

  const addNewExerciseToSeries = (e: React.FormEvent, seriesIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSeries((prevSeries) => {
      // Clone the previous series state to ensure immutability
      const updatedSeries = JSON.parse(JSON.stringify(prevSeries));

      // Push the new exercise into the correct series
      updatedSeries[seriesIndex].exercises.push({
        id: uuidv4(),
        name: "",
        video: "",
        minReps: 1,
        maxReps: 2,
        bySide: false,
      });

      return updatedSeries;
    });
  };

  const addNewSeries = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSeries((prevSeries) => [
      ...prevSeries,
      {
        id: uuidv4(),
        exercises: [
          {
            id: uuidv4(),
            name: "",
            video: "",
            minReps: 1,
            maxReps: 2,
            bySide: false,
          },
        ],
      },
    ]);
  };

  const startAddingRoutine = () => {
    const today = new Date();
    const newRoutine = {
      routineWeek: 1,
      exercises: [
        {
          id: uuidv4(),
          name: "",
          repetitions: {
            min: 0,
            max: 0,
            joined: false,
          },
          video: "",
          update: false,
        },
      ],
      notes: "",
      routines: [],
      date: today,
    };
    setNewRoutine(newRoutine);
  };

  const saveNewRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!routinesFormRef.current || !exerciseFormRef.current) return;
    const rawFormData: Record<string, any> = {};
    new FormData(routinesFormRef.current).forEach((value, key) => {
      rawFormData[key] = value;
    });
    new FormData(exerciseFormRef.current).forEach((value, key) => {
      rawFormData[key] = value;
    });

    const newMissingFields: RoutineMissingFields = {};

    ["routineWeek", "exerciseName"].forEach((key) => {
      if (!rawFormData[key as keyof RoutineMissingFields]) {
        newMissingFields[key as keyof RoutineMissingFields] = true;
      }
    });
    setRoutineMissingFields(newMissingFields);
    setIsSubmitted(true);

    if (Object.keys(newMissingFields).length > 0) {
      return;
    }

    console.log("rawFormData", rawFormData);
    setNewRoutine(false);
  };

  const handleMinRepsBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentMinReps = Number(e.target.value);
    if (maxReps <= currentMinReps) {
      setMaxReps(minReps + 1);
    }
  };

  const handleMinRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinReps(Number(e.target.value));
  };

  const handleMaxRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < minReps + 1) return;
    setMaxReps(Number(e.target.value));
  };

  const removeExerciseFromSeries = (
    e: React.FormEvent,
    seriesIndex: number,
    exerciseId: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setSeries((prevSeries) => {
      const updatedSeries = [...prevSeries];
      updatedSeries[seriesIndex].exercises = updatedSeries[
        seriesIndex
      ].exercises.filter((exercise) => exercise.id !== exerciseId);
      return updatedSeries;
    });
  };

  const removeSeries = (e: React.FormEvent, seriesIndex: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSeries((prevSeries) =>
      prevSeries.filter((serie) => serie.id !== seriesIndex),
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  /* eslint-disable no-use-before-define*/
  return (
    <StyledWrapper>
      <StyledHeader>
        <div className="info">
          <DataWrapper>
            <strong style={{ fontSize: 24 }}>{formatName(client)}</strong>
            <InfoSpan style={{ alignSelf: "center" }}>
              ({client.active ? "Activo" : "Inactivo"})
            </InfoSpan>
          </DataWrapper>
          <DataWrapper>
            <InfoSpan>{client.weight} kg</InfoSpan>
            <InfoSpan>{client.height} cm</InfoSpan>
          </DataWrapper>
        </div>
        {user?.role === "user" && (
          <div className="button-group">
            <Button label="Editar" onClick={() => {}} />
            <Button label="Guardar" onClick={updateClient} />
          </div>
        )}
      </StyledHeader>
      <ObjectiveDiv>{client.objective}</ObjectiveDiv>
      {user?.role === "user" && (
        <StyledForm ref={generalInfoFormRef}>
          <Input
            name="weight"
            type="number"
            step="0.01"
            defaultValue={client?.weight}
            placeholder="Ingrese su peso"
            label="Peso (kg)"
          />
          <Input
            name="height"
            type="number"
            defaultValue={client?.height}
            placeholder="Ingrese su altura"
            label="Altura (cm)"
          />
        </StyledForm>
      )}

      {user?.role === "admin" && (
        <>
          <StyledLabel>
            <strong>Rutinas</strong>{" "}
            <Button label="Agregar" onClick={startAddingRoutine} />
          </StyledLabel>
          {newRoutine && (
            <>
              <StyledRoutineForm
                onChange={() => {
                  setRoutineMissingFields({});
                  setIsSubmitted(false);
                }}
                ref={routinesFormRef}
              >
                <div>
                  <Input
                    name="routineWeek"
                    type="number"
                    label="Semana*"
                    style={{ maxWidth: "110px" }}
                    defaultValue={1}
                    min={1}
                  />
                  <Button
                    style={{ maxWidth: "200px", maxHeight: "50px" }}
                    label="Guardar"
                    onClick={(e) => saveNewRoutine(e)}
                  />
                </div>
                <StyledSeriesForm>
                  {series.map((serie, serieIndex) => (
                    <div key={serie.id}>
                      <span style={{ display: "flex" }}>
                        {`Serie ${serieIndex + 1}`}{" "}
                        {serieIndex !== 0 && (
                          <RemoveButton
                            onClick={(e) => removeSeries(e, serie.id)}
                          />
                        )}
                      </span>
                      {serie.exercises.map((exercise, exerciseIndex) => (
                        <StyledExerciseForm
                          key={exercise.id}
                          ref={exerciseFormRef}
                        >
                          <Input
                            name={`exerciseName_${serieIndex}_${exerciseIndex}`}
                            type="text"
                            placeholder="Nombre del ejercicio"
                            label="Ejercicio*"
                          />
                          <Input
                            name={`exerciseVideo_${serieIndex}_${exerciseIndex}`}
                            type="text"
                            placeholder="Video del ejercicio"
                            label="Video"
                          />
                          <Input
                            name={`exerciseRepetitionsMin_${serieIndex}_${exerciseIndex}`}
                            type="number"
                            label="Reps mínimas*"
                            style={{ maxWidth: "95px", textAlign: "center" }}
                            onBlur={handleMinRepsBlur}
                            onChange={handleMinRepsChange}
                            value={minReps}
                            min={1}
                          />
                          <Input
                            name={`exerciseRepetitionsMax_${serieIndex}_${exerciseIndex}`}
                            type="number"
                            label="Reps máximas*"
                            style={{ maxWidth: "95px", textAlign: "center" }}
                            onChange={handleMaxRepsChange}
                            value={maxReps}
                            min={2}
                          />
                          <Input
                            name={`exerciseBySide_${serieIndex}_${exerciseIndex}`}
                            type="checkbox"
                            label="por lado?"
                            style={{ marginTop: "12px" }}
                          />

                          <AddRemoveWrapper>
                            {exerciseIndex === serie.exercises.length - 1 && (
                              <>
                                <AddButton
                                  onClick={(e) =>
                                    addNewExerciseToSeries(e, serieIndex)
                                  }
                                />
                                {exerciseIndex !== 0 && (
                                  <RemoveButton
                                    onClick={(e) =>
                                      removeExerciseFromSeries(
                                        e,
                                        serieIndex,
                                        exercise.id,
                                      )
                                    }
                                  />
                                )}
                              </>
                            )}
                            {exerciseIndex !== 0 &&
                              exerciseIndex !== serie.exercises.length - 1 && (
                                <RemoveButton
                                  onClick={(e) =>
                                    removeExerciseFromSeries(
                                      e,
                                      serieIndex,
                                      exercise.id,
                                    )
                                  }
                                />
                              )}
                          </AddRemoveWrapper>
                        </StyledExerciseForm>
                      ))}
                      {serieIndex === series.length - 1 && (
                        <AddButton onClick={(e) => addNewSeries(e)} />
                      )}
                    </div>
                  ))}
                </StyledSeriesForm>
                <Input
                  name="routineNotes"
                  type="text"
                  placeholder="Notas de la rutina"
                  label="Notas"
                  style={{ height: "100%" }}
                />
              </StyledRoutineForm>
              {/* <StyledSpan>
                <strong>* Campos Requeridos</strong>
                {!!Object.keys(routineMissingFields).length && isSubmitted && (
                  <ErrorLabel>Campo Requerido vacio</ErrorLabel>
                )}
              </StyledSpan> */}
            </>
          )}
          <StyledTable>
            <thead>
              <tr>
                <StyledTableHeader>Semana</StyledTableHeader>
                <StyledTableHeader>Ejercicios</StyledTableHeader>
                <StyledTableHeader>Notas</StyledTableHeader>
                <StyledTableHeader>Fecha</StyledTableHeader>
              </tr>
            </thead>
            <tbody>
              {client?.routines?.map((routine: Routine) => (
                <tr
                  style={{ border: "1px solid black" }}
                  key={routine.date.toISOString()}
                >
                  <td>{routine.routineWeek}</td>
                  <StyledTable>
                    <tbody>
                      {routine.series.map((serie, index) => (
                        <React.Fragment
                          key={routine.date.toISOString() + index}
                        >
                          <tr>
                            <td colSpan={4}>
                              <strong>Serie {index + 1}</strong>
                            </td>
                          </tr>
                          {serie.exercises.map(
                            ({
                              name,
                              minReps,
                              maxReps,
                              bySide,
                              video,
                              update,
                            }) => (
                              <ExerciseRow key={name}>
                                <td>{name}</td>
                                <td>
                                  <span>
                                    {minReps}-{maxReps}
                                  </span>
                                  <br />
                                  {!bySide && <span>por lado</span>}
                                </td>
                                <td>{video}</td>
                                <td>{update && "actualizar video"}</td>
                              </ExerciseRow>
                            ),
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </StyledTable>
                  <NotesColumn>{routine.notes}</NotesColumn>
                  <td>{routine.date.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  .info {
    margin-top: 2rem;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: baseline;
  @media (max-width: 768px) {
    align-items: center;
    gap: 1rem;
  }
  .button-group {
    display: flex;
    margin-left: auto;
    margin-right: 5rem;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0;
    }
  }
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-around;
  margin-bottom: 0.5rem;
`;

const InfoSpan = styled.span`
  color: #888;
  font-size: 0.8em;
  font-style: italic;
`;

const ObjectiveDiv = styled.div`
  font-size: 2.2em;
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-weight: 900;
  text-align: center;
  text-transform: uppercase;
`;

const StyledForm = styled.form`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // single column
  }
`;

const StyledLabel = styled.label`
  font-size: 1.2em;
  margin-bottom: 1rem;
  display: flex;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
  align-items: baseline;
  justify-content: space-between;
  Button {
    margin-right: 3rem;
    font-size: 0.8em;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse; // This ensures the borders of each cell connect nicely.
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15); // Adding a light shadow to the table.
  tr td {
    padding: 0 0.5rem;
    &:first-child {
      text-align: center;
    }
  }
  ${media.mobile`
    font-size: 0.8rem; // Reduce font-size or any other styles you want to adjust for mobile
    margin: 0 auto;
    max-height: 80vh; // This is an example height, adjust as needed.
    overflow-y: auto;
    overflow-x: hidden;

    // Custom scrollbar styles (for Webkit browsers such as Chrome and Safari)
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }
    &::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }

  `}

  ${media.tablet`
    font-size: 0.9rem; // Adjust for tablet
  `}
`;

const StyledTableHeader = styled.th`
  padding: 10px;
  background-color: #333; // Giving headers a dark background
  color: white; // Setting text color of headers to white
  text-align: left;
  border-bottom: 2px solid #ddd;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1); // Adding a light shadow to the headers.
  width: min-content;
  max-width: max-content;
  ${media.mobile`
    padding: 8px;  // Reduce padding for mobile
  `}
`;

const ExerciseRow = styled.tr`
  display: grid;
  grid-template-columns: 1fr 0.25fr 1fr 0.2fr;
  border-bottom: 1px solid black;
  padding: 0.25rem 0.25rem;
  align-items: center;
  justify-content: space-around;
  &:first-child {
    border-top: none;
  }
  &:last-child {
    border-bottom: none;
  }
  td {
    text-align: left !important;
  }
  ${media.mobile`
    grid-template-columns: 1fr 0.25fr 0.2fr;
    padding: 0.25rem 0.25rem;
    td{
      &:nth-child(3) {
        display: none;
      }
    }
  `}
`;

const NotesColumn = styled.td`
  word-wrap: break-word;
  padding: 0.5rem 1rem;
  border: 1px solid black;
  max-width: 25vw;
  ${media.mobile`
    padding: 0.5rem 0.25rem;
  `}
`;

const StyledRoutineForm = styled.form`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 10fr 5fr;
  margin-bottom: 2rem;
`;

const StyledExerciseForm = styled.form`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(2, 10fr) min-content min-content max-content max-content;
`;
// const ErrorLabel = styled.label`
//   color: red;
//   font-size: 1rem;
//   margin-left: 0.5rem;
// `;

// const StyledSpan = styled.span`
//   display: flex;
//   flex-direction: column;
//   gap: 5px;
//   position: absolute;
//   top: 54%;
//   right: 78%;
// `;

const AddButton = styled.button`
  height: 15px;
  width: 15px;
  background-color: white;
  color: #00cc00;
  border: 1px solid #000000;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: #00cc00;
  }

  &::before {
    height: 2px;
    width: 10px;
    left: 50%;
    transform: translateX(-50%);
    top: calc(50% - 1px); // considering 2px height
  }

  &::after {
    height: 10px;
    width: 2px;
    top: 50%;
    transform: translateY(-50%);
    left: calc(50% - 1px); // considering 2px width
  }
`;

const RemoveButton = styled.button`
  height: 15px;
  width: 15px;
  background-color: white;
  color: #cc0000;
  border: 1px solid #000000;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  align-self: center;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: #cc0000;
  }

  &::before {
    height: 2px;
    width: 10px;
    left: 50%;
    transform: translateX(-50%);
    top: calc(50% - 1px); // considering 2px height
  }
`;

const AddRemoveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const StyledSeriesForm = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  margin-bottom: 2rem;
`;
export default ClientInfo;
