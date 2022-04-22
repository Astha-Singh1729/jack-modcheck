import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { button1, div1, div2, divUltra, input1 } from "../annoying_stuff";
import { Message } from "../components/Message";
import styles from '../annoying_stuff/index.module.css'
import axios from "axios";

const Home = () => {
  const [input, setInput] = useState("");
  const [div, setDiv] = useState([<Message value="" key="1" color_='white' />]);
  const [kuchAlag, setKuchAlag] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }
  useEffect(() => {
    if (kuchAlag == "") return;
    setLoading(true);
    axios.post('http://localhost:6969/', {
      "prompt": `${kuchAlag}`
    }).then((res) => {
      console.log(res)
      setDiv([<Message value={res.data} key={Math.random() * 10000000} color_={'white'} />, ...div])
      setLoading(false);
      setKuchAlag("");
    }).catch(err => console.log(err))
  }, [kuchAlag])

  const buttonTrigger = (_: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (input === "") return;
    if (loading) return;
    setKuchAlag(input)
    setDiv([<Message value={input} key={Math.random() * 10000000} color_={'#06FF00'} />, ...div])
    setInput("")
  }

  const keyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (input === "") return;
    if (loading) return;
    if (event.key == 'Enter')
      setKuchAlag(input),
        setDiv([<Message value={input} key={Math.random() * 10000000} color_={'#06FF00'} />, ...div])
        , setInput("")
  }

  return (
    <div style={divUltra}>
      <div style={div1} >
        {div}
      </div>
      <div style={div2}>
        <input type="text" name="" placeholder="katti jack" onChange={handleChange} value={input} style={input1} className={styles.inputClass} onKeyDown={keyPress} />
        <button type="submit" onClick={buttonTrigger} style={button1} className={styles.buttonClass}>SEND</button>
      </div>
    </div>
  )
}

export default Home;