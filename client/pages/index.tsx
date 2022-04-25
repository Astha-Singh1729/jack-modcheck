import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { button1, div1, div2, divUltra, input1 } from "../annoying_stuff";
import { Message } from "../components/Message";
import styles from '../annoying_stuff/index.module.css'
import axios from "axios";
import { Date as DiffDate } from "../components/Date"
const Home = () => {
  const [input, setInput] = useState("");
  const [div, setDiv] = useState([<Message value="" key="1" color_='white' />]);
  const [kuchAlag, setKuchAlag] = useState("");
  const [loading, setLoading] = useState(false);
  const [curPage, setCurPage] = useState(0);
  const [curDate, setDate] = useState('');
  const DATE = new Date();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }
  type Panchayat = { post: string, response: string, date: string }
  const handleScroll = (e: React.UIEvent<HTMLElement>) => {

    if (e.currentTarget.scrollHeight === e.currentTarget.offsetHeight - e.currentTarget.scrollTop) {
      setCurPage(curPage + 1)
      axios.post('https://based-ai.herokuapp.com/stupidserver/', {
        "cur": curPage
      }).then((res) => {
        if (res.data === '') {
          return;
        }
        let pepega: JSX.Element[] = [];
        res.data.map(({ post, response, date }: Panchayat) => {

          let newDate = date
          if (curDate != '' && newDate != curDate) {
            pepega = [<Message value={response} key={Math.random() * 10000000} color_={'white'} />, <Message value={post} key={Math.random() * 10000000} color_={'#06FF00'} />, <DiffDate date={newDate} />, ...pepega]
          }
          else {
            pepega = [<Message value={response} key={Math.random() * 10000000} color_={'white'} />, <Message value={post} key={Math.random() * 10000000} color_={'#06FF00'} />, ...pepega]
          }
          setDate(date)
        })
        setDiv([...div, ...pepega])
      })
    }
  }

  useEffect(() => {
    if (kuchAlag == "") return;
    setLoading(true);
    axios.post('https://based-ai.herokuapp.com/', {
      "prompt": kuchAlag
    }).then((res) => {

      setDiv([<Message value={res.data} key={Math.random() * 10000000} color_={'white'} />, ...div])
      setLoading(false);
      setKuchAlag("");
    }).catch(err => console.log(err))
  }, [kuchAlag])

  //kabhi mat bhoolna
  useEffect(() => {
    setCurPage(curPage + 1);
    axios.post('https://based-ai.herokuapp.com/stupidserver/', {
      "cur": curPage
    }).then((res) => {
      if (res.data === '') {
        return;
      }
      let pepega: JSX.Element[] = [];
      res.data.map(({ post, response, date }: Panchayat) => {
        let newDate = date
        if (curDate != '' && newDate != curDate) {
          pepega = [<Message value={response} key={Math.random() * 10000000} color_={'white'} />, <Message value={post} key={Math.random() * 10000000} color_={'#06FF00'} />, <DiffDate date={newDate} />, ...pepega]
        }
        else {
          pepega = [<Message value={response} key={Math.random() * 10000000} color_={'white'} />, <Message value={post} key={Math.random() * 10000000} color_={'#06FF00'} />, ...pepega]
        }
        setDate(date)
      })
      setDiv(pepega)
    })
  }, [])

  const buttonTrigger = (_: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    let newDate = DATE.getDate().toString() + '.' + (DATE.getMonth() + 1).toString() + '.' + DATE.getFullYear().toString();
    if (input === "") return;
    if (loading) return;
    setKuchAlag(input)
    if (curDate != '' && newDate !== curDate) {
      setDiv([<Message value={input} key={Math.random() * 10000000} color_={'#06FF00'} />, <DiffDate date={newDate} />, ...div]);
    }
    else {
      setDiv([<Message value={input} key={Math.random() * 10000000} color_={'#06FF00'} />, ...div]);
    }
    setInput("")
    setDate(newDate);
  }

  const keyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    let newDate = DATE.getDate().toString() + '.' + (DATE.getMonth() + 1).toString() + '.' + DATE.getFullYear().toString();
    if (input === "") return;
    if (loading) return;
    if (event.key == 'Enter') {
      setKuchAlag(input);
      if (curDate != '' && newDate !== curDate) {
        setDiv([<Message value={input} key={Math.random() * 10000000} color_={'#06FF00'} />, <DiffDate date={newDate} />, ...div]);
      }
      else {
        setDiv([<Message value={input} key={Math.random() * 10000000} color_={'#06FF00'} />, ...div]);
      }
      setInput("")
      setDate(newDate);
    }
  }
  return (
    <div style={divUltra} >
      <div style={div1} onScroll={handleScroll} >
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