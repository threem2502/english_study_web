import { styled } from "styled-components";
import SearchBar from "./search";
import React, { useState } from 'react';

const TopicWrapper  = styled.div`
    width: 100%;
    margin: 0;
    display: flex;
    height: 5%;
    flex-direction: row;
    margin-top: 5%;
`
const TopicItem = styled.p`
    width: 20%;
    margin: 0;
    height: 100%;
    font-weight: ${props => props.fontWeight};
    text-align: center; 
    border: 1px solid black;
    border-bottom: ${props => props.borderBottom};
    border-top-left-radius: 25px;
    border-top-right-radius: 5px;
    color: ${props => props.color};
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    &:hover{
        background-color: #e5e7eb;
        transform: translateY(-5px);
        border-bottom: none;
        height: calc(100% + 5px);
    }
`

const Topic = ({ onSelectTopic, onSearch }) => {
    const [selectedTopic, setSelectedTopic] = useState('Tất cả');
  
    const handleTopicClick = (topic) => {
        setSelectedTopic(topic);
        onSelectTopic(topic);
    };
  
    return (
        <TopicWrapper>
            <div style={{ display: 'flex', width: '50%' }}>
            <TopicItem
                fontWeight={selectedTopic === 'Tất cả' ? '700' : '100'}
                borderBottom={selectedTopic === 'Tất cả' ? 'none' : '1px solid black'}
                color={selectedTopic === 'Tất cả' ? 'black' : 'rgb(189 189 189)'}
                onClick={() => handleTopicClick('Tất cả')}
            >
                Tất cả
            </TopicItem>
            <TopicItem
                fontWeight={selectedTopic === 'danh từ' ? '700' : '100'}
                borderBottom={selectedTopic === 'danh từ' ? 'none' : '1px solid black'}
                color={selectedTopic === 'danh từ' ? 'black' : 'rgb(189 189 189)'}
                onClick={() => handleTopicClick('danh từ')}
            >
                Danh từ
            </TopicItem>
            <TopicItem
                fontWeight={selectedTopic === 'động từ' ? '700' : '100'}
                borderBottom={selectedTopic === 'động từ' ? 'none' : '1px solid black'}
                color={selectedTopic === 'động từ' ? 'black' : 'rgb(189 189 189)'}
                onClick={() => handleTopicClick('động từ')}
            >
                Động từ
            </TopicItem>
            <TopicItem
                fontWeight={selectedTopic === 'tính từ' ? '700' : '100'}
                borderBottom={selectedTopic === 'tính từ' ? 'none' : '1px solid black'}
                color={selectedTopic === 'tính từ' ? 'black' : 'rgb(189 189 189)'}
                onClick={() => handleTopicClick('tính từ')}
            >
                Tính từ
            </TopicItem>
            <TopicItem
                fontWeight={selectedTopic === 'trạng từ' ? '700' : '100'}
                borderBottom={selectedTopic === 'trạng từ' ? 'none' : '1px solid black'}
                color={selectedTopic === 'trạng từ' ? 'black' : 'rgb(189 189 189)'}
                onClick={() => handleTopicClick('trạng từ')}
            >
                Trạng từ
            </TopicItem>
            </div>
            <SearchBar onSearch={onSearch} />
        </TopicWrapper>
    );
};
  
export default Topic;