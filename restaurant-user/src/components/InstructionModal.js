import "../css/instruction.css"

export default function InstructionModal({close,save,setText,text}){

return(

<div className="instructionOverlay">

<div className="instructionBox">

<h2>Add Cooking instructions</h2>

<textarea
value={text}
onChange={e=>setText(e.target.value)}
/>

<p className="note">

The restaurant will try its best to follow your request.

</p>

<div className="instructionButtons">

<button onClick={close}>Cancel</button>

<button onClick={save}>Next</button>

</div>

</div>

</div>

)

}