import React, { useState } from 'react';
import './App.scss';
import axios from 'axios';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-ejs";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/ext-language_tools";

function App() {
   
   const session : string = new Date().getTime() + 'ejs_viewer';
   const [ejsContent, setEjsContent] : any = useState('');
   const [contextContent, setContextContent] :any = useState('');
   const [htmlRender, setHtmlRender] : any= useState('');


   const getHtmlRender = async () => {
      if (ejsContent !== ''){
         
         const html = (await axios.post('http://localhost:8080/render-ejs-to-html', 
            {
               context : contextContent,
               template : ejsContent,
               fileName : session
            }
         )).data;
         setHtmlRender(html);
      } else {
         alert('Check the template or the json')
      }
   }


   return (
    <>
      <div className="main" style={{padding: '10px'}}>
         <div className='w-50 f-left'>
            <h2 style={{marginBlockStart : '0px'}}>ejs editor</h2>
            <hr></hr>
            <h4>Template Engine - (ejs)</h4>
            <AceEditor
               placeholder="Write html + ejs here"
               mode="ejs"
               theme='monokai'
               fontSize={14}
               onChange={(value) => setEjsContent(value)}
               name="html_container"
               editorProps={{ $blockScrolling: true }}
               showGutter={true}
               setOptions={{
                  tabSize : 3,
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  showLineNumbers: true
               }}

               className='w-100'
            />
            <br />
            
            <h4>Context - JSON</h4>
            <AceEditor
               placeholder="Write JSON here"
               mode="json"
               theme='monokai'
               fontSize={14}
               onChange={(value) => setContextContent(value.replace(/(\r\n|\n|\r)/gm, ""))}
               name="context_container"
               editorProps={{ $blockScrolling: true }}
               showGutter={true}
               setOptions={{
                  tabSize : 3,
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  showLineNumbers: true
               }}

               className='w-100'
            />

         </div>

         <div className='w-50 f-left' >
               <button type='button' onClick={() => getHtmlRender()} style={{position : 'fixed'}}>
                     Render
               </button>
               <div className='mail-container' dangerouslySetInnerHTML={{__html : htmlRender}}></div>
         </div>
      </div>
    </>
  );
}

export default App;
