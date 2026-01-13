// eslint-disable react-hooks/exhaustive-deps 

import { useEffect, useState } from "react";
import clsx from "clsx"
import Dialog from "./Dialog";
import { quizData } from "../data";
export default function Quiz() {

    const [numbrerQuestion, setNuberQuestion] = useState(0)
    const [currentOption, setCurrentOption] = useState("")
    const [selectedOptions, setSelectedOptions] = useState(Array.from({length: quizData.length}))
    const [result, setResult] = useState(null)
    const [indexSelectedOption, setInedexSelectedOption] = useState(Array.from({length: quizData.length}));
    const [isEnded, setIsEnded] = useState(false)

    useEffect(()=>{
        console.log(selectedOptions)
        console.log(indexSelectedOption)
    }, [selectedOptions,indexSelectedOption])

    useEffect(()=>{
        const pastAnswer = quizData[numbrerQuestion].options[indexSelectedOption[numbrerQuestion]];
            if(pastAnswer===undefined){
                setCurrentOption("")
            }
            else {
                setCurrentOption(pastAnswer)
            }
    }, [numbrerQuestion, indexSelectedOption])

    const displayResult = result!==null?
        (
            result==="correct"?
                <p className="correct-answer">câu trả lời của bạn đúng</p>:
                <p className="incorrect-answer">câu trả lời của bạn chưa đúng</p>
        ):
        null

    function handleSelect(option, index) {
        setCurrentOption(option) // set giá trị được chọn
        const newIndexAnswerArr = [...indexSelectedOption]; 
        newIndexAnswerArr[numbrerQuestion] = index
        setInedexSelectedOption(()=>newIndexAnswerArr) // set mảng index của câu trả lời
        const newSelectedAnsewers = [...selectedOptions]
        newSelectedAnsewers[numbrerQuestion] = option;
        setSelectedOptions(()=>newSelectedAnsewers)   // set mảng giá trị của câu trả lời
        if(option==quizData[numbrerQuestion].answer) {
            setResult(()=>"correct") // set kết quả của câu trả lời
        }
        else {
            setResult(()=>"incorrect")  // set kết quả của câu trả lời
        }
    }

    function handlePre() {
        if(numbrerQuestion>0){
            setNuberQuestion((pre)=>pre-1) // set câu hỏi
            setResult(null) // reset lại kết quả
        }
    }
    
    function handleNext() {
        if(numbrerQuestion<quizData.length-1){
            setNuberQuestion((pre)=>pre+1) // set câu hỏi
            setResult(null) // reset lại kết quả
        }
    }
    
    function handleEnd(){
        setIsEnded(true)
    }
 
    function restartQuiz() {
        setNuberQuestion(0)
        setCurrentOption("")
        setSelectedOptions(Array.from(()=>({length: quizData.length})))
        setResult(null)
        setInedexSelectedOption(Array.from({length: quizData.length}))
        setIsEnded(false)
    }

    function reviewAnswer() {
        setIsEnded(false)
        setNuberQuestion(0)
    }

    if(isEnded){
        return <Dialog answers={indexSelectedOption} onReset={restartQuiz} onReview={reviewAnswer}></Dialog>
    }

    return (
        <>
            <h2>Câu {numbrerQuestion+1}</h2>
            <p className="question">{quizData[numbrerQuestion].question}</p>
            {
                quizData[numbrerQuestion].options.map((option, index)=>{
                    return <button 
                            className={clsx("option", {"selected": currentOption===option})}
                            key={index}
                            onClick={()=>handleSelect(option, index)}
                            disabled={currentOption && currentOption!==option}
                            >
                                {option}
                            </button>
                })
            }
            <p>câu trả lời của bạn {currentOption}</p>
            {displayResult}
            <div className="nav-buttons">
                <button onClick={handlePre} disabled={numbrerQuestion===0}>Quay Lại</button>
                {numbrerQuestion===quizData.length-1?
                    <button onClick={handleEnd}>Hoàn thành bài test</button>:
                    <button onClick={handleNext} disabled={!currentOption}>Kế tiếp</button>
                }
            </div>
        </>
    )
}