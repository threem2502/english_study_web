import { styled } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import { collection, query, onSnapshot, doc, getDoc } from "firebase/firestore"
import { auth, db } from "../../../firebase"
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



const Wrapper = styled.div`
    margin: 0;
    width: 90%;
    height: 90%;
    display: flex;
    justify-content: center; 
    flex-direction: row;
    align-items: center;
`
const Left = styled.div`
    width: 40%;
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center; 
    flex-direction: column;
    align-items: center;
`
const Avatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 999px;
    background: #e5e7eb;
`
const Text = styled.p`
    color: ${props => props.color};
    font-size: ${props => props.fontSize};
    font-weight: ${props => props.fontWeight};
    margin: 15px 0;
    
`
const TextUnder = styled.p`
    color: rgb(33 33 33);
    font-size: 24px;
    font-weight: 400;
    border-bottom: 1px solid #e5e7eb;
    padding: 5px 0;
    margin: 0;
    margin-top: 10px;
`
const Icon = styled(FontAwesomeIcon)`
    font-size: 25px;
    margin-left: 10px;
`
const Button = styled.button`
    font-weight: 600;
    border: none;
    margin-top: 15px;
    font-size: 24px;
    background: white;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    border: 1px solid gray;
    padding: 10px 5px;
    border-radius: 10px;
    &:hover{
        transform: translateX(5px);
    }
`
const ChartContainer = styled.div`
    width: 90%;
    display: flex;
    flex: 1;
`;
const Right = styled.div`
    width: 60%;
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; 
`
const TextContent = styled.span`
    color: ${props => props.color};
    float: right;
    font-size: 24px;
`

const Profile = ({userID}) => {
    console.log(userID);
    if (!userID) {
        window.location.href = '/login';
    }
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [vocabData, setVocabData] = useState(null);
    
  
    useEffect(() => {
        let unsubscribe = null;
    
        const fetchUserData = async () => {
            try {
            const docRef = doc(db, "users", userID);
            unsubscribe = onSnapshot(docRef, (docSnapshot) => {
                console.log(docSnapshot.data());
                setUserData(docSnapshot.data())
                setLoading(false);
            });
            } catch (error) {
            console.log("Lỗi khi lấy dữ liệu từ Firestore:", error);
            setLoading(true);
            }
        };
    
        fetchUserData();
  
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [userID]);
    
    useEffect(() => {
        if (userID) {
            const collectionRef = collection(db, 'users', userID,'vocab');
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
    
    const [testData, setTestData] = useState(null);
    useEffect(() => {
        if (userID) {
            const collectionRef = collection(db, 'users', userID,'test');
            const q = query(collectionRef);

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const documents = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTestData(documents);
                setLoading(false);
            });

            return () => unsubscribe();
        }
    }, [userID]);
    const handleLogoutButtonClick = () => {
        auth.signOut().then(function() {
            window.location.href = '/login';
        }).catch(function(error) {
            // Xảy ra lỗi
            console.log("Lỗi đăng xuất: " + error);
        })
    }
    const [pointMax, setPointMax] = useState(0);
    useEffect(() => {
        if (testData) {
          let maxPoint = 0;
      
          for (let test of testData) {
            if (test.testPoint >= maxPoint) {
              maxPoint = test.testPoint * 100;
            }
          }
      
          setPointMax(maxPoint);
        }
      }, [testData]);
    //vẽ biểu đồ
    const [chartData, setChartData] = useState(null);
    useEffect(() => {
        if (testData) {
            const sortedTestData = testData.sort((a, b) => a.time - b.time).slice(-3);
            const chartLabels = sortedTestData.map((test) =>
                new Date(test.time.toDate()).toLocaleDateString()
            );
            console.log(chartLabels);
            const chartDataPoints = sortedTestData.map((test) => test.testPoint * 100);
        
            const data = {
                labels: chartLabels,
                datasets: [
                    {
                        label: "Số điểm",
                        data: chartDataPoints,
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            };
      
          setChartData(data);
        }
      }, [testData]);
      

    if (loading) {
        return (
            <Wrapper>
                <img src='loading.gif'></img>
                <h1>Loading....</h1>
            </Wrapper>
        )
    }

    const BarChart = () => {
        if (!chartData || !chartData.labels) {
            return <div>Loading chart...</div>;
        }
          
        return (
            <Bar
            data={chartData}
            options={{
                maintainAspectRatio: false,
                responsive: true, 
                plugins: {
                legend: {
                    display: false, 
                },
                },
            }}
            />
        )
        }
    return (
        <Wrapper>
            <Left>
                <Avatar src='userImage.png'></Avatar>
                <Text color='rgb(105 105 105)' fontSize='24px' fontWeight='500'>Email: {userData.email ? userData.email : 'Chưa đăng nhập'} </Text>
                <Button onClick={handleLogoutButtonClick}>Đăng xuất <Icon icon={faArrowRightFromBracket}></Icon></Button>
            </Left>
            <Right>
                <Text color="rgb(156 156 156)" fontSize="30px" fontWeight="600">Tiến độ học</Text>
                <TextUnder>Tổng từ đã học <TextContent color="#FDD835">{vocabData.length? vocabData.length : 0} từ</TextContent></TextUnder>
                <TextUnder >Điểm cao nhất <TextContent color="green">{pointMax? pointMax : 0}</TextContent></TextUnder>
                <TextUnder >Từ học tốt <TextContent color="#4385f3">{userData.wordGood.word? userData.wordGood.word + ' - ': 'Chưa làm test'} {userData.wordGood.count? userData.wordGood.count + ' lần' : ''} </TextContent></TextUnder>
                <TextUnder >Từ sai nhiều <TextContent color="#EF5350">{userData.wordBad.word? userData.wordBad.word+ ' - ': 'Chưa làm test'}  {userData.wordBad.count? userData.wordBad.count + ' lần' : ''}</TextContent></TextUnder>
                <Text color="rgb(156 156 156)" fontSize="30px" fontWeight="600">3 bài kiểm tra gần nhất</Text>
                <ChartContainer>
                    <BarChart/>
                </ChartContainer>
            </Right>
        </Wrapper>
    )
}
export default Profile