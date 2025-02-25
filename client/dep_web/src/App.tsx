import React from 'react';
import './App.css';
import {CodeModule} from './CodeModule';
import {OutputModule} from './OutputModule';

function App() {
  const [codeText, setCodeText] = React.useState("console.log('hello world!');");
    const onCodeTextChange = React.useCallback((val: React.SetStateAction<string>) => {
        setCodeText(val);
    }, []);

  const [output, setOutput] = React.useState("");

  const sendCode = () => {
    if (codeText) {
      fetchData(codeText).then(data => setOutput((data.message + '\n' + data.received) || data.error));
    }
  }

  return (
    <>
      <Header></Header>
      <div className="main-content">
        <div className="left-side">
          {/* <h1>Enter your text here</h1> */}
          <CodeModule 
            value={codeText} 
            onChange={onCodeTextChange}
          />
        </div>

        <div className="right-side">
          <OutputModule sendCode={sendCode} outputText={output}/>
        </div>
      </div>
    </>
  )
}

function Header() {
  return (
    <div className='header'>
      <h1 className='title'>Dipsy</h1>
    </div>
  )
}

async function fetchData(text: string) {
  try {
    const options: RequestInit = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(text) };
    return fetch('http://localhost:5000/', options).then(response => response.json());
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}

export default App
