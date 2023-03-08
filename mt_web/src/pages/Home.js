import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import KursData from '../data/currentMT.json'
import Kurs from '../components/Kurs.js'

function Home(){
    const [searchString, setSearchString] = useState('')
    const [checGithub, setChecGithub] = useState(false)
    const [checGithubProj, setChecGithubProj] = useState(false)
    const [dropdownProg, setDropdownprog] = useState('Alla')
    const [dropdownYear, setDropdownYear] = useState('Alla')

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

    // we seatch for the string in KursData
    const matchSearch = KursObj => {
        const lowerCaseKod = KursObj.Kurs.toLowerCase()
        const lowerCaseName = KursObj.KursNamn.toLowerCase()
        const lowerCaseExaminator = KursObj.Examinator.toLowerCase()
        const lowerCaseÅr = KursObj.År.toLowerCase()
        const lowerCasePeriod = KursObj.Period.toLowerCase()
        const lowerCaseKlar = KursObj.Klar.toLowerCase()

        const lowerCaseSearch = searchString.toLowerCase()
        return (lowerCaseKod.indexOf(lowerCaseSearch) >= 0) ||
        (lowerCaseName.indexOf(lowerCaseSearch) >= 0) ||
        (lowerCaseExaminator.indexOf(lowerCaseSearch) >= 0) || 
        (lowerCaseÅr.indexOf(lowerCaseSearch) >= 0) ||
        (lowerCasePeriod.indexOf(lowerCaseSearch) >= 0) ||
        (lowerCaseKlar.indexOf(lowerCaseSearch) >= 0)

    }

    const filteredKursData = KursData.filter(matchSearch)
    const inputSearchString = (e) => {
        setSearchString(e.target.value)
    }

    const matchDropdown = KursObj => {
        let searchTerm = ''
        if(dropdownYear != 'Alla' && dropdownProg != 'Alla'){
            searchTerm = dropdownProg + dropdownYear
        } else if(dropdownYear != 'Alla'){ // && dropdownProg === 'Alla'
            searchTerm = dropdownYear
        } else if(dropdownProg != 'Alla'){ // && dropdownYear === 'Alla'
            searchTerm = dropdownProg
        } else {    
            return 1
        }
        return (KursObj.Studentgrupp.indexOf(searchTerm) >= 0)
    }

    const matchGitHubCheckbox = KursObj => {
        const GitHubExist = (KursObj.GitHub != "")
        if(checGithub){
            return GitHubExist
        } else {
            return 1
        }
    }

    const matchGitHubProjCheckbox = KursObj => {    
        const GitHubProjExist = (KursObj.GitHub.split(", ").length == 2)
        if(checGithubProj){
            return GitHubProjExist
        } else {
            return 1
        }
    }
    
    // filter everything
    const filteredKursDataCheckboxGithub = filteredKursData.filter(matchGitHubCheckbox)
    const filteredKursDataCheckboxGithubProj = filteredKursDataCheckboxGithub.filter(matchGitHubProjCheckbox)
    const filteredKursDataDropdown = filteredKursDataCheckboxGithubProj.filter(matchDropdown)

    // we flip the state
    const uppdateChecGithub = (e) => {
        if(checGithub){
            setChecGithub(false)
        } else {
            setChecGithub(true)
        }
        
    }
    // we flip the state
    const uppdateChecGithubProj = (e) => {
        if(checGithubProj){
            setChecGithubProj(false)
        } else {
            setChecGithubProj(true)
        }
    }

    const uppdateDropdownProg = (e) => {
        setDropdownprog(e.target.value)
    }
    const uppdateDropdownYear = (e) => {
        setDropdownYear(e.target.value)
    }
    //console.log(checGithub)
    //console.log(checGithubProj)
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

                <input type="checkbox" id="Github" name="github" value="Github" defaultChecked={checGithub} onChange={uppdateChecGithub}/>
                <label for="github"> Github</label>

                <input type="checkbox" id="Github Project" name="githubProj" value="GithubProj" defaultChecked={checGithubProj} onChange={uppdateChecGithubProj}/>
                <label for="githubProj"> Github Project</label>

                <input type='dropdown' label='Filtrera kurser: ' placeholder='Filtrera'/>
                <select name="GruppDropdown" id="Grupp" placeholder='Filtrera' onInput={uppdateDropdownProg}>
                    <option value="Alla">Alla</option>
                    <option value="MT">MT</option>
                    <option value="ED">ED</option>
                    <option value="KTS">KTS</option>
                </select>
                <select name="YearDropdown" id="Year" placeholder='Filtrera' onInput={uppdateDropdownYear}>
                    <option value="Alla">Alla</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <div className='LogoTextBox'>
                <p>AAAAAAA {procentKurs()} % av alla MT kurser (icke valfria) är avklarade</p>
                {filteredKursDataDropdown.map((KursObj) => (
                 <Kurs kursObj={KursObj} key={KursObj.Kurs}></Kurs>
                ))}
            </div>
           
        </div>
    )
}
   
   export default Home;