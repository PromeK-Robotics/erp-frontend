
import React from "react";

const API = process.env.REACT_APP_API || "http://localhost:8000";

export default function App(){

  async function generaOrdine(){
    await fetch(API+"/genera-ordine",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        cliente:"ABC SRL",
        commessa:"C-001",
        righe:[{articolo:"PLC",descrizione:"PLC Siemens",quantita:1,prezzo:1500}]
      })
    });

    alert("Ordine creato ✅");
  }

  return (
    <div style={{padding:20,fontFamily:"Arial"}}>
      <h1>ERP Azienda</h1>
      <p>Sistema commesse + ordini automatici</p>

      <button
        onClick={generaOrdine}
        style={{padding:10, background:"blue", color:"white", border:"none", cursor:"pointer"}}
      >
        Genera Ordine ProgestNOW
      </button>
    </div>
  );
}
