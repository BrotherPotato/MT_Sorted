import React from 'react'
import { Link } from 'react-router-dom'
import KursData from '../data/currentMT.json'
import Kurs from '../components/Kurs.js'

function Home(){
    console.log(KursData)
    let string = "TNd002"
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


    return(
        <div className='parent'>
            <div className='LogoTextBox'>
                <p>AAAAAAA {procentKurs()} % av alla MT kurser (icke valfria) är avklarade</p>
                {KursData.map((KursObj) => (
                 <Kurs kursObj={KursObj} key={KursObj.Kurs}></Kurs>
                ))}
            </div>
           
        </div>
    )
}
   
   export default Home;