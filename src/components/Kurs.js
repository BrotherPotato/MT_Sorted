import React from 'react'
import { Link } from 'react-router-dom'

const Kurs = ({kursObj}) =>{
    return(
        <div className="indvKurs" style={{borderTop: '1px solid #000000', paddingLeft: "2em", paddingBottom: "1em"}}>
            <h2>{kursObj.Kurs} - {kursObj.KursNamn}</h2>
            <div style={{display: "flex", justifyContent: "start", flexDirection: "row"}}>
                <div style={{width: "45vw"}}>
                    <p>Examinator: {kursObj.Examinator}</p>
                    <p>Period: {kursObj.År} {kursObj.Period}</p>
                    <p>Studentgrupper: {kursObj.Studentgrupp}</p>
                </div>
                <div>
                    <p>Eventuella länkar: <br></br></p>
                    {kursObj.Klar != "Y" &&
                        <p>Ej avklarad</p>
                    }
                    {kursObj.GitHub != "" &&
                    <Link to={kursObj.GitHub.split(", ")[0]}>GitHub<br/></Link>
                    }
                    {kursObj.GitHub.split(", ").length == 2 &&
                    <Link to={kursObj.GitHub.split(", ")[1]}>GitHub Project<br/></Link>

                    }
                    <Link to={kursObj.StudieInfo}>StudieInfo<br/></Link>
                    {kursObj.Tenta != "" &&
                    <Link to={kursObj.Tenta}>Tenta<br/></Link>}
                </div>
            </div>
            
            
            
            {kursObj.LitteraturInfo != "" &&
            <p style={{marginBottom: "4px"}}>Litteratur Info: {kursObj.LitteraturInfo}</p>}
        </div>
    )
}

export default Kurs