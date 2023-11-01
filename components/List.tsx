import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import Loading from "../public/icons/Loading";
import Modal from "./Modal";
import EditIcon from "../public/icons/EditIcon";
import { formatClientTable, formatExerciseTable } from "../utils/tools";
import IClient from "../pages/clients/IClient";
import media from "../utils/media";

interface ListProps<T> {
  stakeholders: T[];
  handleSearch: () => void;
  navigate: (_id: string) => void;
  headers: Record<string, string>;
  loading: boolean;
  ModalContentComponent: React.FC<any>;
  modelType: "client" | "exercise";
  hidableHeaders?: string[];
}

const List = <T extends {}>({
  stakeholders = [],
  handleSearch,
  navigate,
  headers,
  loading,
  ModalContentComponent,
  modelType,
  hidableHeaders = [],
}: ListProps<T>) => {
  const searchInput = useRef<HTMLInputElement>(null);
  const [stakeholderId, setStakeholderId] = useState<string>("");
  const [isTextSelected, setIsTextSelected] = useState<boolean>(false);

  const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && handleSearch) {
      handleSearch();
    }
  };

  const memoizedColumns = useRef(new Map());

  const getColumns = useCallback(
    (stakeholder: any) => {
      // Check if we already have memoized data for this stakeholder
      const cachedData = memoizedColumns.current.get(stakeholder._id);
      if (cachedData) {
        return cachedData;
      }

      let formattedData = {};

      if (modelType === "client") {
        formattedData = formatClientTable(stakeholder as IClient);
      } else if (modelType === "exercise") {
        formattedData = formatExerciseTable(stakeholder);
      }

      // Store this computed data in our memoizedColumns map
      memoizedColumns.current.set(stakeholder._id, formattedData);

      return formattedData;
    },
    [modelType],
  );

  /* eslint-disable no-use-before-define*/
  return (
    <>
      <SearchBar>
        <Input
          placeholder="Busqueda"
          ref={searchInput}
          onKeyDown={handleKey}
          name="search"
        />
        <Button label="Buscar" onClick={handleSearch} />
      </SearchBar>
      <Button label="Agregar" onClick={() => setStakeholderId("new")} />
      <StyledTable>
        <thead>
          <tr>
            {Object.entries(headers).map(([header, value]) => (
              <StyledHeader
                key={header}
                hideonmobile={hidableHeaders?.includes(header)}
              >
                {value}
              </StyledHeader>
            ))}
            <StyledHeader key={"edit"}>Editar</StyledHeader>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr key="loading">
              <td colSpan={Object.keys(headers).length + 1}>
                <Loading />
              </td>
            </tr>
          ) : (
            stakeholders.map((stakeholder: any) => (
              <StyledRow
                key={stakeholder._id}
                onClick={() => {
                  if (!isTextSelected) {
                    navigate(stakeholder._id);
                  }
                  setIsTextSelected(false);
                }}
              >
                {Object.entries(getColumns(stakeholder)).map(([key, value]) => (
                  <StyledCell
                    key={key + value}
                    hideonmobile={hidableHeaders?.includes(key)}
                    onMouseDown={() => setIsTextSelected(false)}
                    onMouseUp={() => {
                      if (window.getSelection()?.toString()) {
                        setIsTextSelected(true);
                      }
                    }}
                  >{`${
                    value instanceof Date ? value.toLocaleDateString() : value
                  }`}</StyledCell>
                ))}
                <StyledCell
                  key={`edit${stakeholder._id}`}
                  style={{ textAlign: "center" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <StyledButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setStakeholderId(stakeholder._id);
                    }}
                  >
                    <EditIcon />
                  </StyledButton>
                </StyledCell>
              </StyledRow>
            ))
          )}
        </tbody>
      </StyledTable>
      <Modal
        isOpen={!!stakeholderId}
        onClose={() => setStakeholderId("")}
        ContentComponent={ModalContentComponent}
        id={stakeholderId}
      />
    </>
  );
};

interface StyledHeaderProps {
  hideonmobile?: boolean;
}

interface StyledCellProps {
  hideonmobile?: boolean;
}

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  max-width: 300px;

  ${media.mobile`
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;


    input {
      width: 100%;
    }

    button {
      margin-top: 10px;
      width: 100%;
    }
  `}
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse; // This ensures the borders of each cell connect nicely.
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15); // Adding a light shadow to the table.
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

const StyledHeader = styled.th<StyledHeaderProps>`
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
    ${({ hideonmobile }) => hideonmobile && `display: none;`}
  `}
`;

const StyledRow = styled.tr`
  &:hover {
    background-color: #f5f5f5; // Slight gray background on hover for rows.
    button {
      background-color: #f5f5f5; // Slight gray background on hover for rows.
    }
  }
`;

const StyledCell = styled.td<StyledCellProps>`
  padding: 8px;
  border: 1px solid #e0e0e0; // Giving cells a light border.
  width: min-content;
  max-width: max-content;
  ${media.mobile`
    padding: 6px;  // Reduce padding for mobile
    ${({ hideonmobile }) => hideonmobile && `display: none;`}
  `}
`;
// @ts-ignore-disable
const StyledButton = styled.button`
  background: white;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

export default List;
