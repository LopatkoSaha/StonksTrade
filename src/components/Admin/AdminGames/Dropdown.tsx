type TProps = {
    gameNames: string[],
    setGameName: (str: string) => void;
    gameName: string;
}

export const Dropdown = ({gameNames, gameName, setGameName}: TProps) => {
    const handleGameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGameName(event.target.value);
      };
    return (
        <div className="mb-3">
            <label htmlFor="buyDropdown" className="form-label">Выберите игру:</label>
            <select
                id="buyDropdown"
                className="form-select"
                value={gameName}
                onChange={handleGameChange}
            >
                <option value="" disabled>
                -- Выберите игру --
                </option>
                {gameNames.map((name) => (
                <option key={name} value={name}>
                    {name}
                </option>
                ))}
            </select>
        </div>
    )
}