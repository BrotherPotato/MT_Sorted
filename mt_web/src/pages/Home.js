import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import KursData from '../data/currentMT.json'
import Kurs from '../components/Kurs.js'

function Home(){
    const [searchString, setSearchString] = useState('')
    //console.log(KursData)
    //let string = "TNd002"
    function getKurs(kursKod){
        kursKod = kursKod.toUpperCase()
        return KursData.find(kurs => kurs.Kurs === kursKod)
    }

    function procentKurs(){
        let count = 0
        let countCleared = 0
        for (let i = 0; i < KursData.length; i++) {
            if (KursData[i].Klar === "Y") {
                countCleared++
            }
            count++
        }
        return countCleared/count*100
    }

    
    
    const matchSearch = KursObj => {
        const lowerCaseKod = KursObj.Kurs.toLowerCase()
        const lowerCaseName = KursObj.KursNamn.toLowerCase()
        const lowerCaseExaminator = KursObj.Examinator.toLowerCase()
        const lowerCaseÅr = KursObj.År.toLowerCase()
        const lowerCasePeriod = KursObj.Period.toLowerCase()
        const lowerCaseStudentGrupp = KursObj.Studentgrupp.toLowerCase()
        const lowerCaseKlar = KursObj.Klar.toLowerCase()

        const lowerCaseSearch = searchString.toLowerCase()
        return (lowerCaseKod.indexOf(lowerCaseSearch) >= 0) ||
        (lowerCaseName.indexOf(lowerCaseSearch) >= 0) ||
        (lowerCaseExaminator.indexOf(lowerCaseSearch) >= 0) || 
        (lowerCaseÅr.indexOf(lowerCaseSearch) >= 0) ||
        (lowerCasePeriod.indexOf(lowerCaseSearch) >= 0) ||
        (lowerCaseStudentGrupp.indexOf(lowerCaseSearch) >= 0) ||
        (lowerCaseKlar.indexOf(lowerCaseSearch) >= 0)

    }
    const filteredKursData = KursData.filter(matchSearch)
    const inputSearchString = (e) => {
        setSearchString(e.target.value)
    }

    return(
        <div className='parent'>
            <div className='SearchBar' style={{display:'flex', paddingTop: '1em', borderTop: '3px solid #3DD2DC', justifyContent: 'space-evenly'}}>
                <input
                    autoFocus
                    id='kursInput'
                    type='text'
                    label='Sök efter kurser: '
                    placeholder='Sök'
                    onInput={inputSearchString}
                />
            </div>
            <div className='LogoTextBox'>
                <p>AAAAAAA {procentKurs()} % av alla MT kurser (icke valfria) är avklarade</p>
                {filteredKursData.map((KursObj) => (
                 <Kurs kursObj={KursObj} key={KursObj.Kurs}></Kurs>
                ))}
            </div>
           
        </div>
    )
}
   
   export default Home;