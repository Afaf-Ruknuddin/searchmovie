import React, { useRef, useState } from 'react'
import Keyboard from 'react-simple-keyboard';
import Searchresults from './searchresults';
import "react-simple-keyboard/build/css/index.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";


const Search = () => {
    const [input, setInput] = useState("");
    const [showresult, setshowresult] = useState(false)
  const [layout, setLayout] = useState("default");
  const [recentsearch, setrecentsearch] = useState([])
  const [Mdata, setMdata] = useState([])
  const keyboard = useRef();

  const Mapi = async (e)=>{
    //   e.preventDefault()
      setshowresult(true)
    const reqData = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=fa90dee4b371c97ef7dcade13648c0d0&query=${input}`,{
        method:"GET"
    })
    const res = await reqData.json()
    setMdata(res.results)
    recentItems()
  }

  const recentItems = () =>{
      if(!input){

      }else{
        setrecentsearch([...recentsearch,input])
        setInput('')
      }
  }

  const researchRecent =(id)=>{
    const recent = recentsearch.filter((elem,ind)=>{
        return ind === id
    })
    setInput(recent)
  }

  const deleteRecent = (id)=>{
    const updatedItems = recentsearch.filter((elem,ind)=>{
        return ind !== id
    })
    setrecentsearch(updatedItems)
  }

  const onChange = input => {
    setInput(input);
    console.log("Input changed", input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = button => {
    console.log("Button pressed", button);
    if(button === "{enter}" ){
        setshowresult(true)
        Mapi()
        recentItems()
    }

    

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };


  const onChangeInput = event => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  

    return (
        <>
    <div className='container-fluid'>
        <div className="Se1">
            <button className='back-arrow-key rounded-circle' onClick={()=>setshowresult(false)}><FaArrowLeft/></button>
            <button className='wrong-key rounded-circle' onClick={()=>setshowresult(false)}><FaTimes/></button>
        </div>
        {
            !showresult ? <>
        <div className='Se2'>
        <form onSubmit={Mapi}>
        <input className='input-search'
        value={input}
        placeholder={" 🔍 search"}
        onChange={onChangeInput}
        />
        </form>
        </div>
        <div className='Se3'>
            <div className='recent_search'>
                <h2 className='recentSearchTitle'>recent search items </h2>
                {
                    recentsearch.map((elem,ind)=>{
                        return(
                            <div className="recent-item" key={ind}>
                            <i className='research-recent' onClick={()=>researchRecent(ind)}><FaRedoAlt/></i>
                            <h3 className='recent-elem'>{elem}</h3>
                            <i className='delete-recent' onClick={()=>deleteRecent(ind)}><FaTrashAlt/></i>
                            </div>
                        )
                    })
                }
            </div>
            <div className="App simple-keybord">
      <Keyboard 
        keyboardRef={r => (keyboard.current = r)}
        layoutName={layout}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>
        </div>
            </>:
             <>
             <div className="search-result">
                search result
            </div>
            <div className="card-container">
             {
                 Mdata && Mdata.map((val)=>{
                     return(
                <Searchresults val={val}/> 
                     )
                 })
             }
            </div>
             </>   
        }
        
        </div>
    </>
    )
}

export default Search
