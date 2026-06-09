import {useEffect,useState} from "react";
const API=process.env.REACT_APP_API;
export default function App(){
const [commesse,set]=useState([]);
const [codice,setC]=useState("");
const [cliente,setCl]=useState("");
const [stato,setSt]=useState("nuova");
const [preventivo,setPr]=useState("");
const [filtro,setFil]=useState("tutte");

async function load(){let r=await fetch(API+"/commesse");set(await r.json());}
useEffect(()=>{load();},[]);

async function crea(){await fetch(API+"/commesse",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({codice,cliente,stato,preventivo:Number(preventivo)})});load();}

function colore(s){if(s==="completata")return"green";if(s==="in corso")return"blue";if(s==="bloccata")return"red";return"gray"}

return(<div style={{padding:20}}><h1>ERP Commesse</h1>
<select onChange={e=>setFil(e.target.value)}>
<option value="tutte">Tutte</option><option>nuova</option><option>in corso</option><option>bloccata</option><option>completata</option></select>

<input placeholder="Codice" onChange={e=>setC(e.target.value)}/>
<input placeholder="Cliente" onChange={e=>setCl(e.target.value)}/>
<select onChange={e=>setSt(e.target.value)}><option>nuova</option><option>in corso</option><option>bloccata</option><option>completata</option></select>
<input placeholder="Preventivo" onChange={e=>setPr(e.target.value)}/>
<button onClick={crea}>Crea</button>

{commesse.filter(c=>filtro==="tutte"||c.stato===filtro).map((c,i)=>(
<div key={i} style={{background:"#fff",margin:5,padding:10}}>
<b>{c.codice}</b> - {c.cliente}
<p style={{color:colore(c.stato)}}>{c.stato}</p>
<p>€ {c.preventivo}</p>
</div>))}
</div>);
}
