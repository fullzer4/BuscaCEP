import { useState } from "preact/hooks"
import "./scss/tela.scss"

export function App() {
  
  const [cep, setCep] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [district, setDistrict] = useState("")
  const [state, setState] = useState("")

  const buscarCep = async () => {
    let validCep = `${cep.substr(0,5)}-${cep.substr(5)}.json`
    let url = `https://cdn.apicep.com/file/apicep/${validCep}`

    await fetch(url, {mode: 'cors'})
      .then(response => response.json())
      .then(data => {console.log(data)
        setAddress(data.address)
        setCity(data.city)
        setDistrict(data.district)
        setState(data.state)
      })
      .catch(err => {return err})
  }

  const onInput: any = (e:any) => {
    const { value } = e.target;
    setCep( value )
  }

  return (
    <>
      <h1>Buscador CEP</h1>
      <div>
        <input type="number" placeholder="cep" onChange={(e:any) => onInput(e)}/>
        <button onClick={() => buscarCep()}>Buscar</button>
      </div>
      <p>{address}</p>
      <p>{city}</p>
      <p>{district}</p>
      <p>{state}</p>
    </>
  )
}
