import { WordWrapper, Wrapper } from "./homeStyle"
import Topic from "./topic"
import Table from "./table/table"
import { useState } from "react"

const Home = () => {
    const [selectedTopic, setSelectedTopic] = useState('all');

    const handleSelectTopic = (topic) => {
        setSelectedTopic(topic);
    };
    
    const [keyword, setKeyword] = useState('')
    const handleSearch = (event) => {
        setKeyword(event.target.value)
    }
    

    return (
        <Wrapper>
            <WordWrapper>
            <Topic onSelectTopic={handleSelectTopic} onSearch={handleSearch}/>
            <Table selectedTopic={selectedTopic} keyword={keyword} />
            </WordWrapper>
        </Wrapper>
    )
}

export default Home