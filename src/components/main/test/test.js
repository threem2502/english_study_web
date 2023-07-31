import { useState, useEffect } from "react";
import { Answer, AnswerWrapper, Anwser, EndButton, Question, SaveButton, Text, Top, Wrapper } from "./testStyle";
import { Timestamp, collection, onSnapshot, query, doc, updateDoc,addDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { styled } from "styled-components";
import { PointPopUp } from "../home/popup";


const Test = ({ userID}) => {
    const [vocabData, setVocabData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userID) {
            const collectionRef = collection(db, 'users', userID, 'vocab');
            const q = query(collectionRef);

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const documents = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setVocabData(documents);
                setLoading(false);
            });

            return () => unsubscribe();
        }
    }, [userID]);

    

    const getRandomQuestion = () => {
        if (vocabData && vocabData.length > 0) {
            const randomIndex = Math.floor(Math.random() * vocabData.length);
            const randomItem = vocabData[randomIndex];
            setTotalAns((prev) => prev + 1);
            return {
                question: randomItem.word,
                correctAnswer: randomItem.mean
            };
            
        }
        return { question: '', correctAnswer: '' };

    };

    const getRandomAnswer = (correctAnswer) => {
        if (vocabData && vocabData.length > 0) {
          const Answers = [correctAnswer];
          const indexes = new Set();
            
          while (Answers.length < 4 && indexes.size < vocabData.length) {
            const randomIndex = Math.floor(Math.random() * vocabData.length);
      
            if (!indexes.has(randomIndex) || vocabData[randomIndex].mean === correctAnswer) {
                indexes.add(randomIndex);
                const answer = vocabData[randomIndex].mean;
                Answers.push(answer);
            }
          }
      
          return Answers;
        }
      
        return [];
      };
      

    const [question, setQuestion] = useState({});
    const [answer, setAnswer] = useState([]);
    const [timer, setTimer] = useState(5);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [totalAns, setTotalAns] = useState(0);
    const [countCorrect, setCountCorrect] = useState(0);

    useEffect(() => {
        if (vocabData && vocabData.length > 0) {
            const newQuestion = getRandomQuestion();
            const newAnswer = getRandomAnswer(newQuestion.correctAnswer);
            setQuestion(newQuestion);
            setAnswer(newAnswer);
            setTotalAns(0);
            setCountCorrect(0);
        }
    }, [vocabData]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 1) {
                    setIsTimeUp(true);
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsTimeUp(false);
                        setTimer(5);
                    }, 1000);

                    const newQuestion = getRandomQuestion();
                    const newAnswer = getRandomAnswer(newQuestion.correctAnswer);

                    setQuestion(newQuestion);
                    setAnswer(newAnswer);
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);


    const getNextQuestion = () => {
        const newQuestion = getRandomQuestion();
        const newAnswer = getRandomAnswer(newQuestion.correctAnswer);
      
        setQuestion(newQuestion);
        setAnswer(newAnswer);
      };
      

    const [answerState, setAnswerState] = useState('');
    const [wordGood, setWordGood] = useState([])
    const [wordBad, setWordBad] = useState([])
    const handleAnswerClick = (selectedAnswer) => {
        if (selectedAnswer === question.correctAnswer) {
                setCountCorrect((prev) => prev + 1);
                setAnswerState('correct');
                const findWord = wordGood.find((vocab) => vocab.word === question.question);
                if(findWord) {
                    const updatedWord = {...findWord, count: findWord.count + 1}
                    const updatedWordGood = wordGood.map((vocab) => 
                        vocab.word === question.question ? updatedWord : vocab
                    )
                    setWordGood(updatedWordGood);
                } else {
                    const newVocab = { word: question.question, count: 1 };
                    setWordGood((prevVocab) => [...prevVocab, newVocab]);
                }
        } else {
                const findWord = wordBad.find((vocab) => vocab.word === question.question);
                if(findWord) {
                    const updatedWord = {...findWord, count: findWord.count + 1}
                    const updatedWordBad = wordBad.map((vocab) => 
                        vocab.word === question.question ? updatedWord : vocab
                    )
                    setWordBad(updatedWordBad);
                } else {
                    const newVocab = { word: question.question, count: 1 };
                    setWordBad((prevVocab) => [...prevVocab, newVocab]);
                }
            setAnswerState('incorrect');
        }
      
        setTimer(5);
        getNextQuestion();
      };
    
    const getMostFrequentWord = (words) => {
        const sortedWords = words.sort((a, b) => b.count - a.count);
        if (sortedWords.length > 0) {
            return sortedWords[0];
        }
        return null;
    };
    
    const saveTestData = async (testData) => {
        try {
            const testCollectionRef = collection(db, "users", userID, "test");

            await addDoc(testCollectionRef, testData);

        console.log('Lưu testData thành công');
    } catch (error) {
        console.error('Lỗi khi lưu testData:', error);
    }
  };

  const saveMostWord = async (wordGood, wordBad) => {
    try {
        const userRef = doc(db, 'users', userID);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
    
        const currentWordGoodCount = userData?.wordGood?.count || 0;
        const currentWordBadCount = userData?.wordBad?.count || 0;
    
        let mostFrequentWordGood = getMostFrequentWord(wordGood);
        let mostFrequentWordBad = getMostFrequentWord(wordBad);
    
        if (!mostFrequentWordGood || mostFrequentWordGood.count <= currentWordGoodCount) {
            mostFrequentWordGood = {
            word: userData?.wordGood?.word || '',
            count: currentWordGoodCount,
            };
        }
    
        if (!mostFrequentWordBad || mostFrequentWordBad.count <= currentWordBadCount) {
            mostFrequentWordBad = {
            word: userData?.wordBad?.word || '',
            count: currentWordBadCount,
            };
        }
    
        await updateDoc(userRef, {
            wordGood: {
            word: mostFrequentWordGood.word,
            count: mostFrequentWordGood.count,
            },
            wordBad: {
            word: mostFrequentWordBad.word,
            count: mostFrequentWordBad.count,
            },
        });
    
        console.log('Lưu wordGood và wordBad có count lớn nhất thành công');
        } catch (error) {
        console.error('Lỗi khi lưu wordGood và wordBad:', error);
        }
    };
  
        const [pointPopUp, setPointPopUp] = useState(false)
        useEffect(() => {
            if(!pointPopUp) {
                setTimer(5)
                setCountCorrect(0)
                setTotalAns(0)
            }
        },[pointPopUp])
        const handleEndButtonClick = () => {
            setPointPopUp(true)
            const testData = {
                correctAns: countCorrect,
                totalAns: totalAns,
                testPoint: (countCorrect/totalAns).toFixed(2),
                time: serverTimestamp()
            }
            saveTestData(testData)
            saveMostWord(wordGood,wordBad)
        }

        if (loading) {
            return (
                <Wrapper>
                    <img src='loading.gif'></img>
                    <h1>Loading....</h1>
                </Wrapper>
            )
        }else {
            return ( 
            <Wrapper>
                <Top>
                    <Text>Số câu đúng: {countCorrect}/{totalAns}</Text>
                    <Text style={{ color: isTimeUp ? 'red' : 'black' }}>00:{timer < 10 ? `0${timer}` : timer}</Text>
                    <EndButton onClick={handleEndButtonClick}>Kết thúc</EndButton>
                </Top>
                <Question>{question.question}</Question>
                <AnswerWrapper>
                    {answer.map((ans, index) => (
                        <Answer
                            key={index}
                            onClick={() => handleAnswerClick(ans)}
                            isCorrect={answerState === 'correct'}
                            isIncorrect={answerState === 'incorrect'}
                        >
                            {ans}
                        </Answer>
                    ))}
                </AnswerWrapper>
                <PointPopUp
                    showPointPopUp={pointPopUp}
                    onClose={() => setPointPopUp(false)}
                    point={{
                        count: countCorrect,
                        total: totalAns
                    }}
                />
            </Wrapper>
            );
        }
        
        
    };

    export default Test;
