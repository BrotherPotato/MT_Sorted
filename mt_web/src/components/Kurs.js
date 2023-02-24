import React from 'react'
import { Link } from 'react-router-dom'

const Kurs = ({kursObj}) =>{
    return(
        <div style={{borderBottom: '1px solid #39bde3'}}>
            <h2>{kursObj.Kurs} - {kursObj.KursNamn}</h2>
            <p>Examinator: {kursObj.Examinator}</p>
            <p>{kursObj.År} {kursObj.Period}</p>
            <p>{kursObj.Studentgrupp}</p>
            {kursObj.Klar != "Y" &&
                <h2>Ej avklarad</h2>
            }
            {kursObj.GitHub != "" &&
             <Link to={kursObj.GitHub}>GitHub<br/></Link>
            }
            <Link to={kursObj.StudieInfo}>StudieInfo<br/></Link>
            {kursObj.Tenta != "" &&
             <Link to={kursObj.Tenta}>Tenta<br/></Link>}
        </div>
    )
}

export default Kurs