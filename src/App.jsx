
import { useState } from 'react';
import './App.css'
import { Pop } from './Pop';

function App() {
 const [board,setBoard]=useState(Array(9).fill(null));
 const [xTurn,setXTurn]=useState(true);
 const [pc,setPc]=useState(false);
 const [winner,SetWinner]=useState("");
 const [draw,setDraw]=useState(false);

 console.log("Winner:"+winner)
console.log("Draw" + draw);
 const toggle =(i)=>{
const updated=board.map((e,id)=>{
  if(i === id){
    setXTurn(!xTurn)
    return xTurn ? "X" :"O"
  }else{
    return e
  }
})
console.log(checkWinner(updated))
setBoard(updated)
 }

 const updateUser=(b)=>{
const update=board.map((e,i)=>{
  if(b === i){
    return "X"
  }else{
    return e
  }
})

setBoard(update);
checkWinner(update);
setTimeout(()=>updatePc(update),500)
 }

//  const updatePc=(b)=>{
//   let available=b.map((e,i)=> (e=== null?i:null)).filter((e)=> e!==null);
//   let pcChoice=available[Math.floor(Math.random()*available.length)];
// const updated=b.map((e,i)=>{
//   if(i === pcChoice){
//     return "O"
//   }else{
//    return  e
//   }
// })
// setBoard(updated);
//   checkWinner(updated);
//  }

const updatePc=(b)=>{
  let available=b.map((e,i)=>(e=== null?i:null)).filter((e,i)=> e!==null);
  let move=null;
  for(let [x,y,z]of winPattern){
    if((b[x] === "X" && b[y] === "X" && b[z]===null)||
    (b[x] === "X" && b[z] === "X" && b[y]===null)||
    (b[y] === "X" && b[z] === "X" && b[x]===null)
  ){
    move=[x,y,z].find((index)=> b[index]===null);
    break;
  }
  }
  let pcChoice=move !== null? move:available[Math.floor(Math.random()*available.length)];
  const updated=b.map((e,i)=>{
    if(i=== pcChoice){
      return "O"
    }else{
      return e
    }
  })
  setBoard(updated)
  checkWinner(updated);
}

 let winPattern=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

const checkWinner=(board)=>{
for(let i=0;i<winPattern.length;i++){
  let [x,y,z]=winPattern[i];

  if(board[x] && board[x] === board[y] && board[y] === board[z]){
    SetWinner(board[x]);
    return board[x]
  }
}
if(board.every((cel) => cel)){
  setDraw(true);
}
return null;
}
function restart(){
  setBoard(Array(9).fill(null));
  setDraw(false);
  SetWinner("");
}

  return (
    <>
    {winner || draw ? (<Pop restart={restart} winner={winner} draw={draw}/>):null}
    <div className='container w-full p-3 h-screen overflow-hidden'>
    <div class="relative mt-[30vh] left-[40vw] h-screen">

  <span class="text-3xl text-white">Two</span>


  <label for="toggle" class="flex items-center cursor-pointer">
    <div class="relative">
      <input type="checkbox" id="toggle" class="hidden peer" onChange={()=>setPc((prev)=> !prev)} />
     
      <div class="w-16 h-8 bg-gray-300 rounded-full peer-checked:bg-green-500"></div>
  
      <div class="absolute top-1 left-1 w-6 h-6 bg-white rounded-full peer-checked:translate-x-8 transition-all"></div>
    </div>
  </label>

  <span class="text-3xl text-white">PC</span>
</div>

     
      <div className='board'>
        
        {
          board.map((e,i)=>(
            <button className='cel  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
' key={i} disabled={e!== null || winner} onClick={pc ? ()=>updateUser(i) :()=>toggle(i)}>
              {e === "X" ?(
                 <span className="text-red-500 text-[60px] font-extrabold">X</span>) 
                :
                 e === "O" ?(<span className="text-blue-500 text-[60px] font-extrabold">O</span>):("")}</button>
          ))
        }
      </div>
      
    </div>
    </>
  )
}

export default App
