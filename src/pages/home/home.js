import React from 'react';
import './home.css';
import '../components/NewsPanel';
import NewsPanel from '../components/NewsPanel';
import UltimulMeci from '../components/UltimulMeci';
import UrmatorulMeci from '../components/UrmatorulMeci';

const Home = () => {
  return (
    <div className="HomeContainer">
      <img
        src={
          process.env.PUBLIC_URL +
          '/374772816_874937010658932_698494937274974792_n.png'
        }
        alt="Echipa CSU Suceava"
        className="TeamImage"
      />
      <div className="DescriptionBox">
        <p>
          CSU Suceava participã în prima ligă de handbal masculin a României,
          Liga Zimbrilor. De-a lungul istoriei sale, formația suceveană a avut
          performanțe remarcabile pe plan național și internațional, cum ar fi
          calificarea în finala Challenge Cup, în sezonul 2008-2009, câștigarea
          medaliei de bronz in Liga Natională, în sezonul 2010-2011, și clasarea
          pe locul III în Cupa României, în sezonul 2022-2023. În 2023, CSU
          Suceava a câștigat titlul de campioană europeană universitară pentru a
          treia oară, repetând performanța din 2017, înregistratã la Malaga
          (Spania), și pe cea din anul 2022, înregistrat la Lotz (Polonia). În
          anul 2018, jucători noștri au cucerit medalile de bronz, la finalul
          campionatului de la Coimbra (Portugalia).
        </p>
      </div>
      <div className="NewsBox">
        <NewsPanel />
      </div>
      <div className="InfoMeciuri">
        <div className="InfoMeciuriBox">
          <UltimulMeci />
        </div>
        <div className="InfoMeciuriBox">
          <UrmatorulMeci />
        </div>
      </div>
    </div>
  );
};

export default Home;
