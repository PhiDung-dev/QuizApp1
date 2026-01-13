import { quizData } from "../data"

export default function Dialog({answers, onReset, onReview}) {

    function countCorectAnswer(){
        return answers.reduce((count, ans, i)=>{
            if(quizData[i].options[ans]===quizData[i].answer) {
                return count+1
            }
            else 
                return count
        }, 0)
    }

    console.log(answers)

    return (
        <>
            <h2>Kết quả</h2>
            <p className="result">Bạn trả lời đúng {countCorectAnswer()}/{answers.length} câu</p>
            <div className="resultButtonsContainer">
                <button className="result-button" onClick={onReview}>Xem lại</button>
                <button className="result-button" onClick={onReset}>Làm lại</button>
            </div>
        </>
    )
}