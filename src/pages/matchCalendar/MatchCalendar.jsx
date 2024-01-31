import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './MatchCalendar.css';

const MatchCalendar = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://localhost:8080/match/all');
        console.log(response);
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    fetchMatches();
  }, []);

  const formatDate = (milliseconds) => {
    const date = new Date(milliseconds);
    return date.toLocaleDateString();
  };

  const currentDate = new Date();

  const pastMatches = matches.filter((match) => match.date < currentDate);
  const futureMatches = matches.filter((match) => match.date >= currentDate);

  const isWinner = (teamAScore, teamBScore) => {
    if (teamAScore > teamBScore) {
      return 'winner';
    } else if (teamAScore < teamBScore) {
      return 'loser';
    } else {
      return '';
    }
  };

  return (
    <div className="MatchCalendarContainer" style={{background: '#0b132b'}}>
      <img
        src={process.env.PUBLIC_URL + '/Poza landing page.png'}
        alt="Echipa CSU Suceava"
        className="TeamImage"
      />
      <div className="CalendarsContainer">
        <div>
          <h2 style={{color: '#fff'}}>Rezultate Meciuri</h2>
          <table className="CalendarTable PastMatches">
            <thead>
              <tr>
                <th>Data</th>
                <th>Echipa A</th>
                <th>Scor</th>
                <th>Echipa B</th>
              </tr>
            </thead>
            <tbody>
              {pastMatches.map((match, index) => (
                <tr
                  key={index}
                  className={isWinner(match.teamA_Scor, match.teamB_Scor)}
                >
                  <td style={{color: '#fff'}}>
                    {new Date(match.date).toLocaleDateString('ro-RO')}
                  </td>
                  <td style={{color: '#fff'}}>{match.teamA}</td>
                  <td className="ScoreColumn">
                    {match.teamA_Scor} - {match.teamB_Scor}
                  </td>
                  <td style={{color: '#fff'}}>{match.teamB}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 style={{color: '#fff'}}>Meciuri Viitoare</h2>
          <table className="CalendarTable FutureMatches">
            <thead>
              <tr>
                <th>Data</th>
                <th>Echipa A</th>
                <th>Scor</th>
                <th>Echipa B</th>
              </tr>
            </thead>
            <tbody>
              {futureMatches.map((match, index) => (
                <tr
                  key={index}
                  className={isWinner(match.teamA_Scor, match.teamB_Scor)}
                >
                  <td style={{color: '#fff'}}>
                    {new Date(match.date).toLocaleDateString('ro-RO')}
                  </td>
                  <td style={{color: '#fff'}}>{match.teamA}</td>
                  <td className="ScoreColumn">
                    {match.teamA_Scor} - {match.teamB_Scor}
                  </td>
                  <td style={{color: '#fff'}}>{match.teamB}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MatchCalendar;
