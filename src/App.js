import React, { useState, useEffect } from 'react';
import './App.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {
  textFilter,
  selectFilter,
} from 'react-bootstrap-table2-filter';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlayers = async () => {
    const res = await fetch(`https://nba-players.herokuapp.com/players-stats`);
    const data = await res.json();
    setPlayers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const columns = [
    {
      dataField: 'name',
      text: 'Player name',
      filter: textFilter(),
    },
    {
      dataField: 'team_name',
      text: 'Team',
      filter: textFilter(),
    },
    {
      dataField: 'points_per_game',
      text: 'Points per game',
    },
    {
      dataField: 'games_played',
      text: 'Games played',
    },
  ];

  return (
    <div className='App container mt-4'>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <BootstrapTable
          keyField='name'
          data={players}
          columns={columns}
          pagination={paginationFactory()}
          filter={filterFactory()}
        />
      )}
    </div>
  );
};

export default App;
